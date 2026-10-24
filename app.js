/*  
app.js loads the full express application
- configures all meddleware, sessions, views, and static files
- mounts all routers
*/


// all imports
require('dotenv').config();
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');

// import all routers
const usersRouter = require("./routes/users");
const pagesRouter = require("./routes/pages");
const adminsRouter = require("./routes/admins");

// create app
const app = express();

// root dir depending on local vs server
const port = process.env.PORT;

// if ROOT_DIR is empty it gives empty string (local)
const ROOT_DIR = process.env.ROOT_DIR || '';

// save globally for the pug files
app.locals.ROOT_DIR = ROOT_DIR;

// set the view engine
app.set('view engine', 'pug');
// set the views 
app.set('views', path.join(__dirname, "views"));

// define our sessions
const options = ({
  secret: process.env.SESSION_SECRET,
  cookie: {
    path: '/',
    httpOnly: true,
    secure: false,
    maxAge: 60*60*24*1000 // one day
  },
  resave: false, 
  saveUninitialized: false 
})

// use a logger
app.use(morgan('tiny'));

// use urlencoding
app.use(express.urlencoded({ extended: true })); 

// use sessions
app.use(session(options));

// get all the static files
app.use(express.static(path.join(__dirname, 'public')));

// use all routers
app.use(usersRouter);
app.use(pagesRouter);
app.use('/admin', adminsRouter);

// when no route intercepts the http request
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// global error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).send('Something failed!');
});

// listen on port 8015
app.listen(port);