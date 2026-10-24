/* 
Router to 
- let admin add and delete players on the players page and via their team page
- let admin change latest scores and upcoming games scores 
  (if upcoming games score is changed it will go to latest scores)
*/


// necessary imports
const express = require("express");
const fileUpload = require('express-fileupload');
const path = require('path');
const sharp = require('sharp');

// create router
const router = express.Router();

// let the router use it
router.use(fileUpload());

// root dir depending on local vs server
const ROOT_DIR = process.env.ROOT_DIR;

// import database functions used
const { updateGameScores, updateUpcomingGames, deletePlayer, createPlayer} = require('../db'); 

// post when an admin adds players trough the player form
// stores new player data in the database
// resizes the image and stores it in the media dir
router.post('/addPlayersForm', async (req, res) => {
  if (!req.session.user || !req.session.user.isAdmin) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const firstname = req.body.firstname?.toLowerCase();
    const lastname = req.body.lastname?.toLowerCase();
    const filename = `${firstname}_${lastname}.png`;

    const photoFile = req.files.photo;

    const uploadPath = path.join(__dirname, '../public/media', filename);

    // resize images to fit the player cards and convert into png
    await sharp(photoFile.data)
      .resize(622, 800, { fit: 'cover' })
      .png()
      .toFile(uploadPath);

    const photoPath = `/media/${filename}`;

    // add player to database
    await createPlayer({
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      birthDate: req.body.birthDate,
      points: req.body.points,
      nationality: req.body.nationality,
      position: req.body.position,
      playerNumber: req.body.number,
      photo: photoPath,
      teamTitle: req.body.team
    });

    res.redirect(`${ROOT_DIR}/players`);
  } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
  }
});



// post to let admin add players to a team when on the team-players page
// stores new player data in the database
// resizes the image and stores it in the media dir
router.post('/addPlayersToTeamForm', async (req, res) => {
  if (!req.session.user || !req.session.user.isAdmin) {
    return res.status(401).send('Unauthorized');
  }

  try { 
    const firstname = req.body.firstname?.toLowerCase();
    const lastname  = req.body.lastname?.toLowerCase();
    const filename  = `${firstname}_${lastname}.png`; // always save as .png


    const photoFile = req.files.photo;
    const uploadPath   = path.join(__dirname, '../public/media', filename);

    // resize images to fit the player cards and convert into png
    await sharp(photoFile.data)
      .resize(622, 800, { fit: 'cover' })
      .png()
      .toFile(uploadPath);

    const photoPath = `/media/${filename}`;

    // add player to database
    await createPlayer({ 
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      birthDate: req.body.birthDate,
      points: req.body.points,
      nationality: req.body.nationality,
      position: req.body.position,
      playerNumber: req.body.number,
      photo: photoPath,
      teamTitle: req.body.team 
    });

    res.redirect(`${ROOT_DIR}/team/${req.body.team}/players`);
  } 
  catch (err) {
    console.error(err);
    if (err.message.includes('SQLITE_CONSTRAINT')) {
    return res.status(400).send('Email already exists');
    }
    res.status(500).send('Server error');
  }

});


// post to let admin adjust the latest scores 
router.post('/scores', async (req, res) => { 
  if (!req.session.user || !req.session.user.isAdmin) {
    return res.status(401).send('Unauthorized');
  }

  const updates = req.body.score;  
  updateGameScores(updates);
  
  res.redirect(`${ROOT_DIR}/scores`);
});

// post to let admin adjust the upcoming games
router.post('/games', async (req, res) => {
  if (!req.session.user || !req.session.user.isAdmin) {
    return res.status(401).send('Unauthorized');
  }

  const updates = req.body.score;  
  updateUpcomingGames(updates);
  
  res.redirect(`${ROOT_DIR}/scores`);
});

// post to let admin delete a player via their team page
router.post('/team/:title/players', async (req, res) => {  
  if (!req.session.user || !req.session.user.isAdmin) {
    return res.status(401).send('Unauthorized');
  }

  const fullName = req.body.player; 
  const title = req.params.title;

  await deletePlayer(fullName);

  res.redirect(`${ROOT_DIR}/team/${title}/players`);
});

// post to let admin delete a player via the players page
router.post('/delete/player', async (req, res) => {  
  if (!req.session.user || !req.session.user.isAdmin) {
    return res.status(401).send('Unauthorized');
  }

  const fullName = req.body.player; 

  await deletePlayer(fullName);

  res.redirect(`${ROOT_DIR}/players`);
});

// export the router
module.exports = router;