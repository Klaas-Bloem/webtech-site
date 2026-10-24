/* 
Router to 
- display all standard pages and give the necessary data to the page
*/


// necesary import
const express = require("express");

// create router
const router = express.Router();

// root dir depending on local vs server
const ROOT_DIR = process.env.ROOT_DIR;

// import database functions used
const { getTeams, getTeamData, getPlayers, getPlayersByTeam, 
  getPlayerData, getPlayedGames , getGamesByTeam, getComingGames, getLossesWins} = require('../db'); 


// get to render starting/leaderboard page  
router.get(['/', `/leaderboard`], async (req, res) => {  
  const teams = await getLossesWins();

  res.render('leaderboard', { 
      metaDescription: 'Overview of all the teams and their ranking.',
      user: req.session?.user || null,
      teams
    });
});

// get to render the player page
router.get('/players', async (req, res) => {
    const user = req.session?.user || null;
    const players = await getPlayers();
    // if it is an admin it needs team info
    const teams = user?.isAdmin ? await getTeams() : null; 
    
    res.render('players', {
      metaDescription: 'Overview of all the players and their information.',
      user,
      players,
      teams
  }); 
});


// get to give the next 10 games to either games or scores pug 
// also tell whether there are more games left
router.get('/api/gameScores', async (req, res) => {
  const { type, offset = 0, limit = 10 } = req.query;

  let games;
  

  if (type == "upcoming") {
    games = await getComingGames(limit, offset);
  }

  else if (type == "scores") {
    games = await getPlayedGames(limit, offset);
  }
  
  res.json({ games, hasMore: games.length == limit });
});


// get to render the games page 
router.get('/games', async (req, res) => {
  const teams = await getTeams();
  const games = await getComingGames(10, 0); // first 10 displayed

  res.render('games', {
    metaDescription: 'Overview of all the coming games in Padel.',
    user: req.session?.user || null,
    games,
    teams,
    hasMorePlayed: true
  });
});


// get to render the teams page
router.get('/teams', async (req, res) => {
  const teams = await getTeams();

  res.render('teams', {
    metaDescription: 'Overview of all the teams.',
    user: req.session?.user || null,
    teams
  });
});


// get to render the scores page
router.get('/scores', async (req, res) => {
  const teams = await getTeams();
  const games = await getPlayedGames(10, 0);

  res.render('scores', {
    metaDescription: 'Overview of all the scores from the last games.',
    user: req.session?.user || null,
    games,
    teams
  });
});

// get to render the league info page
router.get('/league', (req, res) => {
  res.render('league', {
    metaDescription: 'All the league information about Padel on one page.',
    user: req.session?.user || null
  });
});


// get to render the profile info page
router.get("/profile", (req, res)=> {

  res.render('profile', {
    metaDescription: 'All the information about your own profile for the best padel page!',
    user: req.session?.user || null     
    });
});


// get to render team page for players
router.get('/team/:title/players', async (req, res) => {
  const user = req.session?.user || null;
  const team = await getTeamData(req.params.title);
  const players = await getPlayersByTeam(req.params.title); 
  const teams = user?.isAdmin ? await getTeams() : null;

  res.render('team-players', {
    metaDescription: `Page of the team ${team.title} and the players in this team.`,
    user,
    team,
    playersJSON: JSON.stringify(players),
    players,
    teams
  });
});

// get to render team page for games
router.get('/team/:title/games', async (req, res) => {
  const team = await getTeamData(req.params.title);
  const games = await getGamesByTeam(req.params.title);

  res.render('team-games', {
    metaDescription: `Overview of all the games of the team ${team.title}.`,
    user: req.session?.user || null,
    team,
    games
  });
});

// tget to render team page for info
router.get(`/team/:title/info`, async (req, res) => {
  const team = await getTeamData(req.params.title);
  res.render('team-info', { 
    metaDescription: `All the information about the team ${team.title}`,
    team ,
    user: req.session?.user || null
  });
});

// default team page is info
router.get(`/team/:title`, async (req, res) => {
  res.redirect(`${ROOT_DIR}/team/${req.params.title}/players`); 
});

// get to render the player-card page when a player has been clicked
router.get('/players/:firstName/:lastName', async (req, res) => {

  const playerData = await getPlayerData(req.params.firstName, req.params.lastName);

  // array because our functions loop over each player
  const playerJSON = [{
    firstName: playerData.firstName,
    lastName: playerData.lastName,
    birthDate: playerData.birthDate,
    nationality: playerData.nationality,
    position: playerData.position,
    number: playerData.playerNumber,
    photo: playerData.photo,
    team: playerData.teamTitle
  }];

  res.render('player-card', { 
    metaDescription: `Page about the padel player: ${playerData.firstName}.`,
    user: req.session?.user || null,
    playerJSON, 
    playerData });
});

// export the router
module.exports = router;