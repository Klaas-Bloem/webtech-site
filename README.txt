# Assigment 3

# Group 15
Wouter Baghuis (0808970), Klaas Bloem (9994254)

# Link
http://webtech.science.uu.nl/group15/

# Website Explanation
This web application is about the sport Padel. You can browse 
the website to find information about the teams, players, scores, 
upcoming games, league information and much more. Users can create 
accounts and choose their favorite team. Admins can add and delete 
players, change existing and add new scores.

The front-end uses pug files to display the pages, styled by css, and 
Javascript is added for application logic.
The back-end uses the express framework for server logic and communicates 
with SQLite for the database logic.

The main file is 'app.js' in which all middleware is mounted as follows:
- logging (Morgan)
- Url Encoding
- Session handling (authentication purposes)
- Static Files 
- Routes 
- Error handling

When switching between localhost and the server change the ROOT_DIR var to
(local: ROOT_DIR = "", and on the server: ROOT_DIR = "/group15")
- .env
- public/scripts/players.js (top of file)
- public/scripts/games.js (top of file)

# Website Structure
root
|-- app.js
|-- db.js
|-- schema.sql
|-- .env
|-- package-lock.json
|-- package.json
|-- README.md (this file)
|-- public
|   |-- media
|   |   |-- padel_logo.png
|   |   |-- profile_button.png
|   |   `-- all player pngs (50 .png photos)
|   |-- scripts
|   |   |-- edit.js
|   |   |-- games.js
|   |   `-- players.js
|   `-- stylesheets
|       `-- styles.css
|-- views
|   |-- games.pug
|   |-- layout.pug
|   |-- leaderboard.pug
|   |-- league.pug
|   |-- login.pug
|   |-- player_card.pug
|   |-- players.pug
|   |-- profile.pug
|   |-- register.pug
|   |-- scores.pug
|   |-- team-games.pug
|   |-- team-info.pug
|   |-- team-players.pug
|   `-- teams.pug
`-- routes
    |-- admins.js
    |-- pages.js
    `-- users.js
    
# Database
We used SQLite as our RDBMS.
We used the following tables:
- users 
- players
- teams
- games 

The user table includes both normal users and admins (boolean isAdmin)
The games table includes both played and upcoming games 
(played = 0 (upcoming) or played = 1 (played))

All statements are pre-made in the file 'schema.sql' and executed at the 
initialization of 'db.js'. The creation of dummy users is executed after 
the initialization of the db to enable encryption.


# User credentials

The emails and passwords of the test accounts (3 users, 1 admin) are
stored in .env (see .env.example for the required variables).

# SQL definition

CREATE TABLE IF NOT EXISTS users (
id INTEGER PRIMARY KEY AUTOINCREMENT,
firstname TEXT,
lastname TEXT,
email TEXT UNIQUE,
team TEXT,
isAdmin BOOLEAN,
hashedPassword TEXT
);

CREATE TABLE IF NOT EXISTS players (
firstName TEXT,
lastName TEXT,
birthDate TEXT,
points INTEGER,
nationality TEXT,
position TEXT,
playerNumber INTEGER,
photo TEXT,
teamTitle TEXT,
UNIQUE (firstName, lastName)
);

CREATE TABLE IF NOT EXISTS teams (
title TEXT UNIQUE,
country TEXT,
city TEXT,
points INTEGER
);

CREATE TABLE IF NOT EXISTS games (
id INTEGER PRIMARY KEY AUTOINCREMENT,
tournamentTitle TEXT,
gameDate TEXT, -- ISO 'YYYY-MM-DD' of DATETIME
team1 TEXT,
team2 TEXT,
team1Score INTEGER,
team2Score INTEGER,
played INTEGER NOT NULL DEFAULT 0, -- 0 = upcoming, 1 = played
FOREIGN KEY (team1) REFERENCES teams(title),
FOREIGN KEY (team2) REFERENCES teams(title),
UNIQUE (tournamentTitle, gameDate, team1, team2) -- to make sure no double games
);
