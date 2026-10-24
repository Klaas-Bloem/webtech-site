/*  
db.js contains all database logic 
- defines functions to 
- - create and delete players
- - create, find and change users
- - get all teams and team data
- - get all players and player data
- - get players, upcoming and played games of a team
- - update upcoming and played game scores
*/

// all imports
const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const path = require("path"); 
const bcrypt = require('bcrypt');

// get file paths
const DB_FILE = path.join(__dirname, 'test.db');
const SCHEMA_FILE = path.join(__dirname, "schema.sql");

// function to get the current database or create a new one if it doesnt exist
function getDb() {
  return new sqlite3.Database(DB_FILE);
}

// function to initialize the database and create tables and pre-made users
// uses schema.sql to create all tables and insert necessary data
// creates 1 admin and 3 users
async function init() {
  const hashedPassword1 = await bcrypt.hash(process.env.USER1_PASSWORD, 12);
  const hashedPassword2 = await bcrypt.hash(process.env.USER2_PASSWORD, 12);
  const hashedPassword3 = await bcrypt.hash(process.env.USER3_PASSWORD, 12);
  const hashedPassword4 = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);

  const db = getDb();
  const schemaSql = fs.readFileSync(SCHEMA_FILE, "utf8");
  const statements = schemaSql
    .split(";")
    .map(s => s.trim())
    .filter(s => s.length);

  db.serialize(() => {
    statements.forEach(stmt => db.run(stmt));
    // create some users
    db.run(`INSERT OR IGNORE INTO users 
      (firstname, lastname, email, team, isAdmin, hashedPassword) 
      VALUES (?, ?, ?, ?, ?, ?)`, 
      ["user", "1", "user1@example.com", "ChinGalan", false, hashedPassword1]
    );
    
    db.run(`INSERT OR IGNORE INTO users 
      (firstname, lastname, email, team, isAdmin, hashedPassword) 
      VALUES (?, ?, ?, ?, ?, ?)`, 
      ["user", "2", "user2@example.com", "TapiaCoello", false, hashedPassword2]
    );

    db.run(`INSERT OR IGNORE INTO users 
      (firstname, lastname, email, team, isAdmin, hashedPassword) 
      VALUES (?, ?, ?, ?, ?, ?)`, 
      ["user", "3", "user3@example.com", "ChinGalan", false, hashedPassword3]
    );

    db.run(`INSERT OR IGNORE INTO users 
      (firstname, lastname, email, team, isAdmin, hashedPassword) 
      VALUES (?, ?, ?, ?, ?, ?)`, 
      ["admin", "1", "admin@example.com", "TapiaCoello", true, hashedPassword4]
    );
  });
  db.close();
}

// function that returns a promise to insert new users into the database
function createUser ({ firstname, lastname, email, team, hashedPassword }) {
  return new Promise((resolve, reject) => {
    const db = getDb();
    const sql = `
        INSERT INTO users (firstname, lastname, email, team, hashedPassword)
        VALUES (?, ?, ?, ?, ?)
    `;
    const params = [firstname, lastname, email, team, hashedPassword];
    
    db.run(sql, params, function (err) {
      if (err) {
        db.close();
        return reject(err);
      }
      const newUser = {
        id: this.lastID,
        firstname,
        lastname,
        email,
        team,
        hashedPassword
      };
      db.close();
      resolve(newUser);
    });
  });
}

// function that returns a promise to find a user by their email
// resolves the users info if no error occures
function findUserByEmail(email) {
  return new Promise((resolve, reject) => {
    const db = getDb();
    
    const sql = `SELECT * FROM users WHERE email = ?`;

    db.get(sql, [email], (err, row) => {
      if (err) {
        db.close();
        return reject(err);
      }
      db.close();
      resolve(row);
    });
  });
}

// function that returns a promise to get the data of all teams in descending order of points
function getTeams() {
  return new Promise((resolve, reject) => {
    const db = getDb();
    db.all(`SELECT * FROM teams ORDER BY points DESC`, [], (err, rows) => {
      if (err) {
        db.close();
        return reject(err);
      }
      db.close();
      resolve(rows); 
    });
  });
}

// function that returns a promise to get the data of one specific team
function getTeamData(title) {
  return new Promise((resolve, reject) => {
    const db = getDb();
    db.get(`SELECT * FROM teams WHERE title = ?`, [title], (err, row) => {
      db.close();
      if (err) reject(err);
      else resolve(row);
    });
  });
}

// function that returns a promise to get all wins and losses of all teams in order of points descending
function getLossesWins() {
  return new Promise((resolve, reject) => {
    const db = getDb();
    const sql = `
      SELECT 
        t.title, t.country, t.city, t.points,
        COUNT(CASE 
          WHEN (g.team1 = t.title AND g.team1Score > g.team2Score)
            OR (g.team2 = t.title AND g.team2Score > g.team1Score)
          THEN 1 END) AS wins,
        COUNT(CASE 
          WHEN (g.team1 = t.title AND g.team1Score < g.team2Score)
            OR (g.team2 = t.title AND g.team2Score < g.team1Score)
          THEN 1 END) AS losses
      FROM teams t
      LEFT JOIN games g 
        ON (g.team1 = t.title OR g.team2 = t.title)
        AND g.played = 1
      GROUP BY t.title
      ORDER BY t.points DESC
    `;
    db.all(sql, [], (err, rows) => {
        db.close();
        if (err) reject(err);
        else resolve(rows);
    });
  });
}

// function that returns a promise to get all players fom the db
function getPlayers() {
  return new Promise((resolve, reject) => {
    const db = getDb();
    db.all(`SELECT * FROM players ORDER BY points DESC`, [], (err,rows) => {
      db.close();
      if (err) reject(err);
      else resolve(rows);
    })
  })
}

// function that returns a promise to get all players a specific team from the db
function getPlayersByTeam(teamTitle) {
  return new Promise((resolve, reject) => {
    const db = getDb();
    db.all(
      `SELECT firstName, lastName, birthDate, nationality,
        position, playerNumber AS number, photo, teamTitle AS team
       FROM players
       WHERE teamTitle = ?`,
      [teamTitle],
      (err, rows) => {
        db.close();
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
}

// function to get all games from db
function getPlayedGames(limit, offset) {
    return new Promise((resolve, reject) => {
        const db = getDb();
        db.all(`SELECT * FROM games WHERE played = 1 ORDER BY gameDate DESC, id DESC LIMIT ? OFFSET ?`, [limit, offset], (err, rows) => {
            db.close();
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

// function that returns a promise to get upcoming games data from db
function getComingGames(limit, offset) {
  return new Promise((resolve, reject) => {
    const db = getDb();
    db.all(`SELECT * FROM games WHERE played = 0 ORDER BY gameDate ASC, id DESC LIMIT ? OFFSET ?`, [limit, offset], (err, rows) => {
      db.close();
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

// function that returns a promise to get all games from a specific team fom the db
function getGamesByTeam(teamTitle) {
  return new Promise((resolve, reject) => {
    const db = getDb();
    const sql = `SELECT * FROM games WHERE (team1 = ? OR team2 = ?) ORDER BY gameDate DESC, id DESC`;
    db.all(sql, [teamTitle, teamTitle], (err, rows) => {
      db.close();
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

// function that returns a promise to get the data of one specific player
function getPlayerData(firstName, lastName) {
  return new Promise((resolve, reject) => {
    const db = getDb();
    db.get(`SELECT * FROM players WHERE firstName = ? AND lastName = ?`, [firstName, lastName], (err, row) => {
      db.close();
      if (err) reject(err);
      else resolve(row);
    });
  });
}

// function that returns a promise to replace user data with new data when a user changes its profile
async function updateUser(id, userData) {
  const query = `
    UPDATE users 
    SET firstName = ?, lastName = ?, email = ?, team = ?, hashedPassword = ? 
    WHERE id = ?
  `;
  
  const params = [
    userData.firstname,
    userData.lastname, 
    userData.email,
    userData.team,
    userData.hashedPassword,
    id
  ];
  
  return new Promise((resolve, reject) => {
    const db = getDb();

    db.run(query, params, function(err) {
      if (err) reject(err);
      else resolve("Succesfully changed profile data")});
    });
}

// function that returns a promise to update scores when an admin fills in the form
function updateGameScores(scores) {
  const db = getDb();
  const stmt = db.prepare("UPDATE games SET team1Score = ?, team2Score = ? WHERE id = ?");

  for (const [gameIdStr, score] of Object.entries(scores)) {
    // id string removed becuase without the added string "id",
    // the userid would be interpreted as the index instead of game id
    const gameId = parseInt(gameIdStr.replace('id', '')); 

    stmt.run([score.team1Score, score.team2Score, gameId]);
  }

  stmt.finalize(() => {
    db.close();
  });
}

// function to update scores for upcoming games when an admin fills in the form
// proceeds to move the match from upcoming games to scores
function updateUpcomingGames(scores) {
  const db = getDb();
  const stmt = db.prepare("UPDATE games SET team1Score = ?, team2Score = ?, played = 1 WHERE id = ?");


  for (const [gameIdStr, score] of Object.entries(scores)) {
    // id string removed becuase without the added string "id",
    // the userid would be interpreted as the index instead of game id
    const gameId = parseInt(gameIdStr.replace('id', ''), 10);
    const team1Score = parseInt(score.team1Score, 10);
    const team2Score = parseInt(score.team2Score, 10);

    // skip the game if it has scores that are not numbers
    if (isNaN(team1Score) || isNaN(team2Score)) {
      console.warn(`Skipping game ${gameId}: invalid scores`);
      continue;
    }

    stmt.run([team1Score, team2Score, gameId], async function(err) {
      if (err) {
          console.error("Games error:", err);
          db.close();
          return reject(err);
        }
    }); 
  }

  stmt.finalize(() => {
    db.close();
  });
}

// function that returns a promise to delete a player from the db
// its photo also gets deleted from the public/media dir
function deletePlayer(fullName) {
  const db = getDb();

  const [firstName, lastName] = fullName.split(" ");
  const fileName = `${firstName.toLowerCase()}_${lastName.toLowerCase()}.png`;
  const filePath = `public/media/${fileName}`;
  console.log(`Deleting file at: ${filePath}`);

  return new Promise((resolve, reject) => {
    db.run(
      // both first and lastname must match
      'DELETE FROM players WHERE firstName || " " || lastName = ?',
      [fullName],
      async function (err) {
        if (err) return reject(err);

        // remove the file
        try {
          await fs.promises.rm(filePath, { force: true });
        } catch (fileErr) {
          db.close();
          return reject(fileErr);
        }
        
        db.close();
        resolve();
      }
    );
  });
}


// function that returns a promise to create a player and move it to the db
function createPlayer( {firstName, lastName, birthDate, points, nationality, position, playerNumber, photo, teamTitle} ) {
  return new Promise((resolve, reject) => {
    const db = getDb();

    db.run(
      `INSERT INTO players (firstName, lastName, birthDate, points, nationality, position, playerNumber, photo, teamTitle)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [firstName, lastName, birthDate, points, nationality, position, playerNumber, photo, teamTitle],
      function(err) {
        if (err) {
          console.error('Insert error:', err);
          db.close();
          return reject(err);
        }
        db.close();
        resolve();
      }
    );
  });    
}

// initialize the database
init();

// export all functions
module.exports = { createUser, findUserByEmail, getTeams, updateUser, getTeamData, getPlayers, 
  getPlayersByTeam, getPlayerData, getPlayedGames , getGamesByTeam, getComingGames, updateGameScores, 
  updateUpcomingGames, deletePlayer, createPlayer, getLossesWins};