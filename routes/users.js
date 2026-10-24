/* 
Router to 
- handle all normal user pages and logic
- processes login, register, and edit profile forms 
*/


// necessary imports
const express = require("express");
const bcrypt = require('bcrypt');  

// create router
const router = express.Router();

// import database functions used
const { createUser, findUserByEmail, updateUser, getTeams } = require('../db');

// root dir depending on local vs server
const ROOT_DIR = process.env.ROOT_DIR;

// clean input strings helpfunction, whitelisting the input on the basis of length
function cleanString(input){
  if (typeof input !== 'string') return null;
  const cleanString = input.trim();
  if (!cleanString || cleanString.length > 100) return null;
  return cleanString;
}


// get to render register page
router.get('/register', async (req, res) => {
  const teams = await getTeams(); // needed for favorite team selection

  res.render('register', {
  metaDescription: `Register page for the best padel site there is.`,
  user: req.session?.user,
  teams
  });
});

// get to render login page
router.get('/login', (req, res) => {

  res.render('login', {
      metaDescription: `Login page for the best padel site there is.`,
      user: req.session?.user
  });
});

// when user logs out the session gets destroyed 
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
        return res.status(500).send('Could not log out.');
    } 
    else {
        res.clearCookie('connect.sid'); // Name of cookie used by express-session
        console.log('logged out succesfully');
        res.redirect(`${ROOT_DIR}/`);
      }
  });
});

// post to check if user used valid credentials and initiate session for login
router.post('/loginForm', async function(req, res){
  try {
    const email = cleanString(req.body.email);
    const user = await findUserByEmail(email);

    if (user && await bcrypt.compare(req.body.password, user.hashedPassword)) {
      req.session.user = {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        team: user.team,
        isAdmin: user.isAdmin
      }
      return res.redirect(`${ROOT_DIR}/leaderboard`);

    } else {
      // use console.warn to warn about fails of authentication
      console.error('AUTHENTICATION_FAIL', {
        email,
        ip: req.ip,
        route: req.originalUrl,
        method: req.method,
        time: new Date().toDateString()
      });
      return res.status(401).send("Invalid credentials");
    }
  } catch (err) {
      console.error(err);
      return res.status(500).send("Server error");
  }
});


// post to create a new user once the register form has been filled in 
// and redirect to login in order to create a new session
router.post('/processRegisterForm', async function(req, res){
  try {
    const firstName = cleanString(req.body.firstname);
    const lastName = cleanString(req.body.lastname);
    const email = cleanString(req.body.email);
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    await createUser({ 
      firstname: firstName,
      lastname: lastName,
      email: email,
      team: req.body.team,
      hashedPassword
    });
    res.redirect(`${ROOT_DIR}/login`);
    
  } catch (err) {
      console.error(err);
      if (err.message.includes('SQLITE_CONSTRAINT')) {
        return res.status(400).send('Email already exists');
      }
      res.status(500).send('Server error');
  }
});


// post to process the edit profile form
// overwrites user data with new data if there are no errors
// redirect to profile once the edit is done
router.post('/processEditProfileForm', async function(req, res){
  try {
    const userId = req.session.user?.id;    
    const userFromDb = await findUserByEmail(req.session.user.email);
    const oldPassword = req.body.oldPassword;

    // compare the filled in password with the password from the database.
    const passwordCheck = await bcrypt.compare(oldPassword, userFromDb.hashedPassword); 

    // if the old password does not match with the db render the profile page and give the error
    // it will give an alert to the user in profile.pug
    if (!passwordCheck) {
      return res.status(400).render('profile', {
        user: req.session.user,
        error: "Your old password wasn't correct"
      });
    }
    
    // hash the new password and create new user data 
    const hashedPassword = await bcrypt.hash(req.body.editPassword, 12);

    const newUserData = { 
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      team: req.body.team,
      hashedPassword
    };

    let message = await updateUser(userId, newUserData);
    console.log(message);

    // update the session of the user
    req.session.user = {
      id: req.session.user.id,
      firstname: newUserData.firstname,
      lastname: newUserData.lastname,
      email: newUserData.email,
      team: newUserData.team
    };

    res.redirect('profile');

  } catch (err) {
      console.error(err);
      if (err.message.includes('SQLITE_CONSTRAINT')) {
      return res.status(400).send('Email already exists');
      }
      res.status(500).send(`Server error: ${err.message}`);
  }

});

// export the router
module.exports = router;