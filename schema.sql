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
    gameDate TEXT,              -- ISO 'YYYY-MM-DD' of DATETIME
    team1 TEXT,
    team2 TEXT,
    team1Score INTEGER,
    team2Score INTEGER,
    played INTEGER NOT NULL DEFAULT 0, -- 0 = upcoming, 1 = played
    FOREIGN KEY (team1) REFERENCES teams(title),
    FOREIGN KEY (team2) REFERENCES teams(title),
    UNIQUE (tournamentTitle, gameDate, team1, team2) -- to make sure no double games
);


-- GAMES during CANCUN
INSERT OR IGNORE INTO games (
    tournamentTitle,
    gameDate,
    team1,
    team2,
    team1Score,
    team2Score,
    played
)
VALUES
    ('Madrid FIP Platinum 2025', '2025-01-08', 'TapiaCoello', 'CeperoAyats', 6, 2, 1),
    ('Madrid FIP Platinum 2025', '2025-01-08', 'ChingottoGalan', 'LijoSimo', 6, 3, 1),
    ('Madrid FIP Platinum 2025', '2025-01-08', 'LebronAugsburger', 'RuizRubio', 6, 4, 1),
    ('Madrid FIP Platinum 2025', '2025-01-08', 'StupaYanguas', 'CasasCastillo', 7, 5, 1),
    ('Madrid FIP Platinum 2025', '2025-01-09', 'NavarroGuerrero', 'RuizCapra', 6, 3, 1),
    ('Madrid FIP Platinum 2025', '2025-01-09', 'NietoSanz', 'LosadaAlvarez', 6, 4, 1),
    ('Madrid FIP Platinum 2025', '2025-01-09', 'NennoGonzalez', 'SanchezRodrigo', 6, 2, 1),
    ('Madrid FIP Platinum 2025', '2025-01-09', 'GarridoBergamini', 'DiestroAlbornoz', 6, 4, 1),
    ('Madrid FIP Platinum 2025', '2025-01-10', 'LealCardona', 'JofreSalguero', 6, 4, 1),
    ('Madrid FIP Platinum 2025', '2025-01-10', 'AlonsoTello', 'ChozasLibaak', 7, 6, 1),
    ('Madrid FIP Platinum 2025', '2025-01-10', 'ArroyoAguirre', 'GutierrezAlfonso', 6, 4, 1),
    ('Madrid FIP Platinum 2025', '2025-01-10', 'RuizEsbri', 'CampagnoloBautista', 6, 3, 1),
    ('Madrid FIP Platinum 2025', '2025-01-12', 'TapiaCoello', 'LealCardona', 6, 3, 1),
    ('Madrid FIP Platinum 2025', '2025-01-12', 'ChingottoGalan', 'GarridoBergamini', 6, 4, 1),
    ('Madrid FIP Platinum 2025', '2025-01-12', 'LebronAugsburger', 'NennoGonzalez', 7, 5, 1),
    ('Madrid FIP Platinum 2025', '2025-01-12', 'StupaYanguas', 'NietoSanz', 5, 7, 1),
    ('Madrid FIP Platinum 2025', '2025-01-13', 'TapiaCoello', 'ChingottoGalan', 7, 6, 1),
    ('Madrid FIP Platinum 2025', '2025-01-13', 'LebronAugsburger', 'NietoSanz', 6, 4, 1),
    ('Madrid FIP Platinum 2025', '2025-01-14', 'TapiaCoello', 'LebronAugsburger', 6, 4, 1),

    ('Seville Major 2025', '2025-02-03', 'TapiaCoello', 'RuizCapra', 6, 2, 1),
    ('Seville Major 2025', '2025-02-03', 'ChingottoGalan', 'CasasCastillo', 6, 3, 1),
    ('Seville Major 2025', '2025-02-03', 'LebronAugsburger', 'LijoSimo', 6, 4, 1),
    ('Seville Major 2025', '2025-02-03', 'StupaYanguas', 'CeperoAyats', 6, 2, 1),
    ('Seville Major 2025', '2025-02-04', 'NavarroGuerrero', 'RuizRubio', 6, 4, 1),
    ('Seville Major 2025', '2025-02-04', 'NietoSanz', 'DiestroAlbornoz', 6, 3, 1),
    ('Seville Major 2025', '2025-02-04', 'NennoGonzalez', 'JofreSalguero', 6, 3, 1),
    ('Seville Major 2025', '2025-02-04', 'GarridoBergamini', 'LosadaAlvarez', 7, 5, 1),
    ('Seville Major 2025', '2025-02-05', 'LealCardona', 'CampagnoloBautista', 6, 4, 1),
    ('Seville Major 2025', '2025-02-05', 'AlonsoTello', 'GutierrezAlfonso', 6, 4, 1),
    ('Seville Major 2025', '2025-02-05', 'ArroyoAguirre', 'ChozasLibaak', 6, 4, 1),
    ('Seville Major 2025', '2025-02-05', 'RuizEsbri', 'GarciaBarahona', 6, 4, 1),
    ('Seville Major 2025', '2025-02-07', 'TapiaCoello', 'RuizEsbri', 6, 4, 1),
    ('Seville Major 2025', '2025-02-07', 'ChingottoGalan', 'AlonsoTello', 6, 4, 1),
    ('Seville Major 2025', '2025-02-07', 'LebronAugsburger', 'GarridoBergamini', 7, 5, 1),
    ('Seville Major 2025', '2025-02-07', 'StupaYanguas', 'LealCardona', 6, 4, 1),
    ('Seville Major 2025', '2025-02-08', 'TapiaCoello', 'ChingottoGalan', 6, 7, 1),
    ('Seville Major 2025', '2025-02-08', 'LebronAugsburger', 'StupaYanguas', 6, 3, 1),
    ('Seville Major 2025', '2025-02-09', 'ChingottoGalan', 'LebronAugsburger', 6, 4, 1),

    ('Lisbon P2 2025', '2025-03-04', 'TapiaCoello', 'JofreSalguero', 6, 2, 1),
    ('Lisbon P2 2025', '2025-03-04', 'ChingottoGalan', 'DiestroAlbornoz', 6, 4, 1),
    ('Lisbon P2 2025', '2025-03-04', 'LebronAugsburger', 'SanchezRodrigo', 6, 3, 1),
    ('Lisbon P2 2025', '2025-03-04', 'StupaYanguas', 'LosadaAlvarez', 6, 4, 1),
    ('Lisbon P2 2025', '2025-03-05', 'NavarroGuerrero', 'RuizRubio', 7, 5, 1),
    ('Lisbon P2 2025', '2025-03-05', 'NietoSanz', 'LijoSimo', 6, 4, 1),
    ('Lisbon P2 2025', '2025-03-05', 'NennoGonzalez', 'CeperoAyats', 6, 2, 1),
    ('Lisbon P2 2025', '2025-03-05', 'GarridoBergamini', 'CasasCastillo', 6, 3, 1),
    ('Lisbon P2 2025', '2025-03-06', 'LealCardona', 'RuizCapra', 6, 4, 1),
    ('Lisbon P2 2025', '2025-03-06', 'AlonsoTello', 'CampagnoloBautista', 6, 4, 1),
    ('Lisbon P2 2025', '2025-03-06', 'ArroyoAguirre', 'GutierrezAlfonso', 6, 4, 1),
    ('Lisbon P2 2025', '2025-03-06', 'RuizEsbri', 'ChozasLibaak', 6, 4, 1),
    ('Lisbon P2 2025', '2025-03-08', 'TapiaCoello', 'LealCardona', 6, 3, 1),
    ('Lisbon P2 2025', '2025-03-08', 'ChingottoGalan', 'AlonsoTello', 6, 4, 1),
    ('Lisbon P2 2025', '2025-03-08', 'LebronAugsburger', 'ArroyoAguirre', 6, 3, 1),
    ('Lisbon P2 2025', '2025-03-08', 'StupaYanguas', 'RuizEsbri', 7, 5, 1),
    ('Lisbon P2 2025', '2025-03-09', 'TapiaCoello', 'ChingottoGalan', 6, 7, 1),
    ('Lisbon P2 2025', '2025-03-09', 'LebronAugsburger', 'StupaYanguas', 7, 5, 1),
    ('Lisbon P2 2025', '2025-03-10', 'ChingottoGalan', 'LebronAugsburger', 6, 4, 1),

    ('Amsterdam Major 2026', '2026-01-10', 'TapiaCoello', 'ChingottoGalan', 6, 4, 1),
    ('Amsterdam Major 2026', '2026-01-10', 'LebronAugsburger', 'StupaYanguas', 7, 5, 1),
    ('Amsterdam Major 2026', '2026-01-11', 'NavarroGuerrero', 'NietoSanz', 6, 3, 1),
    ('Amsterdam Major 2026', '2026-01-11', 'NennoGonzalez', 'GarridoBergamini', 6, 4, 1),
    ('Amsterdam Major 2026', '2026-01-12', 'LealCardona', 'AlonsoTello', 5, 7, 1),
    ('Amsterdam Major 2026', '2026-01-12', 'ArroyoAguirre', 'RuizEsbri', 4, 6, 1),
    ('Amsterdam Major 2026', '2026-01-13', 'GarciaBarahona', 'CampagnoloBautista', 6, 2, 1),
    ('Amsterdam Major 2026', '2026-01-13', 'GutierrezAlfonso', 'ChozasLibaak', 3, 6, 1),
    ('Amsterdam Major 2026', '2026-01-14', 'JofreSalguero', 'DiestroAlbornoz', 6, 4, 1),
    ('Amsterdam Major 2026', '2026-01-14', 'SanchezRodrigo', 'LosadaAlvarez', 5, 7, 1),
    ('Amsterdam Major 2026', '2026-01-15', 'RuizCapra', 'CasasCastillo', 6, 3, 1),
    ('Amsterdam Major 2026', '2026-01-15', 'RuizRubio', 'LijoSimo', 7, 6, 1),
    ('Amsterdam Major 2026', '2026-01-16', 'CeperoAyats', 'TapiaCoello', 2, 6, 1),

    -- quarter finals (2026-03-01)
    ('Cancun P1 2026', '2026-03-01', 'TapiaCoello', 'NennoGonzalez', 6, 3, 1),
    ('Cancun P1 2026', '2026-03-01', 'ChingottoGalan', 'NietoSanz', 7, 5, 1),
    ('Cancun P1 2026', '2026-03-01', 'LebronAugsburger', 'NavarroGuerrero',6, 4, 1),
    ('Cancun P1 2026', '2026-03-01', 'StupaYanguas', 'TapiaCoello', 5, 7, 1),

    -- semi finals (2026-03-02)
    ('Cancun P1 2026', '2026-03-02', 'TapiaCoello', 'LebronAugsburger', 6, 4, 1),
    ('Cancun P1 2026', '2026-03-02', 'ChingottoGalan', 'StupaYanguas', 6, 3, 1),

    -- final (2026-03-03)
    ('Cancun P1 2026', '2026-03-03', 'TapiaCoello', 'ChingottoGalan', 7, 6, 1),

    -- group phase
    ('Valencia Major 2026', '2026-02-01', 'LebronAugsburger', 'StupaYanguas', 6, 4, 1),
    ('Valencia Major 2026', '2026-02-01', 'NavarroGuerrero', 'NietoSanz', 3, 6, 1),
    ('Valencia Major 2026', '2026-02-02', 'NennoGonzalez', 'GarridoBergamini', 6, 2, 1),
    ('Valencia Major 2026', '2026-02-02', 'LealCardona', 'LebronAugsburger', 4, 6, 1),
    ('Valencia Major 2026', '2026-02-03', 'StupaYanguas', 'NavarroGuerrero', 7, 5, 1),
    ('Valencia Major 2026', '2026-02-03', 'NietoSanz', 'NennoGonzalez', 6, 7, 1),
    ('Valencia Major 2026', '2026-02-04', 'GarridoBergamini', 'LealCardona', 5, 7, 1),

    -- semi finals
    ('Valencia Major 2026', '2026-02-05', 'LebronAugsburger', 'StupaYanguas', 6, 3, 1),
    ('Valencia Major 2026', '2026-02-05', 'NennoGonzalez', 'LealCardona', 6, 4, 1),

    -- finals
    ('Valencia Major 2026', '2026-02-06', 'LebronAugsburger', 'NennoGonzalez', 7, 5, 1),

    ('Bilbao Major 2026', '2026-03-10', 'NavarroGuerrero', 'LebronAugsburger', 4, 6, 1),
    ('Bilbao Major 2026', '2026-03-10', 'NennoGonzalez', 'StupaYanguas', 6, 2, 1),
    ('Bilbao Major 2026', '2026-03-11', 'NietoSanz', 'GarridoBergamini', 6, 3, 1),
    ('Bilbao Major 2026', '2026-03-11', 'LealCardona', 'NavarroGuerrero', 3, 6, 1),
    ('Bilbao Major 2026', '2026-03-12', 'StupaYanguas', 'NietoSanz', 5, 7, 1),
    ('Bilbao Major 2026', '2026-03-12', 'GarridoBergamini', 'NennoGonzalez', 4, 6, 1),
    ('Bilbao Major 2026', '2026-03-13', 'LealCardona', 'StupaYanguas', 6, 4, 1),

    -- semi finales
    ('Bilbao Major 2026', '2026-03-14', 'LebronAugsburger', 'NennoGonzalez', 6, 4, 1),
    ('Bilbao Major 2026', '2026-03-14', 'NietoSanz', 'NavarroGuerrero', 6, 3, 1),

    -- final
    ('Bilbao Major 2026', '2026-03-15', 'LebronAugsburger', 'NietoSanz', 6, 2, 1),

    ('Malaga FIP Gold 2026', '2026-04-01', 'GarridoBergamini', 'LealCardona', 6, 4, 1),
    ('Malaga FIP Gold 2026', '2026-04-01', 'StupaYanguas', 'NavarroGuerrero', 7, 6, 1),
    ('Malaga FIP Gold 2026', '2026-04-02', 'LebronAugsburger', 'NietoSanz', 6, 3, 1),
    ('Malaga FIP Gold 2026', '2026-04-02', 'NennoGonzalez', 'GarridoBergamini', 6, 2, 1),

    -- future quarter finals
    ('Malaga FIP Gold 2026', '2026-04-15', 'LealCardona', 'NavarroGuerrero', NULL, NULL, 0),
    ('Malaga FIP Gold 2026', '2026-04-15', 'StupaYanguas', 'NennoGonzalez', NULL, NULL, 0),
    ('Malaga FIP Gold 2026', '2026-04-16', 'LebronAugsburger', 'GarridoBergamini', NULL, NULL, 0),
    ('Malaga FIP Gold 2026', '2026-04-16', 'NietoSanz', 'LealCardona', NULL, NULL, 0),

    -- future semi finals
    ('Malaga FIP Gold 2026', '2026-04-18', 'LebronAugsburger', 'NavarroGuerrero', NULL, NULL, 0),
    ('Malaga FIP Gold 2026', '2026-04-18', 'NietoSanz', 'StupaYanguas', NULL, NULL, 0),

    -- future final
    ('Malaga FIP Gold 2026', '2026-04-20', 'LebronAugsburger', 'StupaYanguas', NULL, NULL, 0),

    -- quarter finals future tournament (2026-05-10)
    ('Brussels Major', '2026-05-10', 'TapiaCoello',      'NennoGonzalez',   NULL, NULL, 0),
    ('Brussels Major', '2026-05-10', 'ChingottoGalan',   'NietoSanz',       NULL, NULL, 0),
    ('Brussels Major', '2026-05-10', 'LebronAugsburger', 'NavarroGuerrero', NULL, NULL, 0),
    ('Brussels Major', '2026-05-10', 'StupaYanguas',     'TapiaCoello',     NULL, NULL, 0),

    ('Utrecht FIP Silver 2026', '2026-05-05', 'LebronAugsburger', 'NennoGonzalez', NULL, NULL, 0),
    ('Utrecht FIP Silver 2026', '2026-05-05', 'StupaYanguas', 'NietoSanz', NULL, NULL, 0),
    ('Utrecht FIP Silver 2026', '2026-05-06', 'NavarroGuerrero', 'GarridoBergamini', NULL, NULL, 0),
    ('Utrecht FIP Silver 2026', '2026-05-06', 'LealCardona', 'LebronAugsburger', NULL, NULL, 0),

    ('Utrecht FIP Silver 2026', '2026-05-08', 'LebronAugsburger', 'NietoSanz', NULL, NULL, 0),
    ('Utrecht FIP Silver 2026', '2026-05-08', 'LealCardona', 'GarridoBergamini', NULL, NULL, 0),

    ('Utrecht FIP Silver 2026', '2026-05-10', 'LebronAugsburger', 'LealCardona', NULL, NULL, 0);


INSERT OR IGNORE INTO teams (title, country, city, points)
VALUES 
    ('TapiaCoello', 'ARG', 'Buenos Aeres', 20400*2),
    ('ChingottoGalan', 'ESP', 'Madrid', 17320*2),
    ('LebronAugsburger', 'ESP', 'Valencia', 6855+5425),
    ('StupaYanguas', 'ARG', 'Salta', 6555+6030),
    ('NavarroGuerrero', 'ESP', 'Bilbao', 4890+6250),
    ('NietoSanz', 'ARG', 'Mendoza', 5804+5080),
    ('NennoGonzalez', 'ESP', 'Bilbao', 4930+4260),
    ('GarridoBergamini', 'ESP', 'Malaga', 4640+2605),
    ('LealCardona', 'ESP', 'Valencia', 3695+1805),
    ('AlonsoTello', 'ESP', 'Madrid', 3050+3015),
    ('ArroyoAguirre', 'ESP', 'Castellón de la Plana', 2250+2045),
    ('RuizEsbri', 'ESP', 'Malaga', 2545+2480),
    ('GarciaBarahona', 'ESP', 'Madrid', 2505+2480),
    ('CampagnoloBautista', 'BRA', 'Brasilia', 2370+2252),
    ('GutierrezAlfonso', 'ARG', 'Buenos Aires', 2194+1909),
    ('ChozasLibaak', 'ARG', 'Rosario', 2193+1154),
    ('JofreSalguero', 'ESP', 'Barcelona', 992+2057),
    ('DiestroAlbornoz', 'ESP', 'Madrid', 1890+1154),
    ('SanchezRodrigo', 'ESP', 'Madrid', 1675+1827),
    ('LosadaAlvarez', 'ESP', 'Valencia', 1675*2),
    ('RuizCapra', 'ARG', 'Quilmes', 1672+687),
    ('CasasCastillo', 'ESP', 'Malaga', 1625+1109),
    ('RuizRubio', 'ESP', 'Madrid', 1496+1464),
    ('LijoSimo', 'ARG', 'Rosario', 1400+1252),
    ('CeperoAyats', 'ESP', 'Barcelona', 1302+563);


INSERT OR IGNORE INTO players (firstName, lastName, birthDate, points, nationality, position, playerNumber, photo, teamTitle)
VALUES 
('Federico', 'Chingotto', '1997-04-13', 17340, 'Argentina', 'right', 2, '/media/federico_chingotto.png', 'ChingottoGalan'),
( 'Alejandro', 'Galán', '1996-05-15', 17340, 'Spain', 'left', 1, '/media/alejandro_galan.png', 'ChingottoGalan'),
( 'Agustin', 'Tapia', '1999-07-24', 20400, 'Argentina', 'left', 1, '/media/agustin_tapia.png', 'TapiaCoello'),
( 'Arturo', 'Coello', '1999-02-21', 20400, 'Spain', 'right', 2, '/media/arturo_coello.png', 'TapiaCoello'),
( 'Juan', 'Lebron', '1996-03-29', 6855, 'Spain', 'right', 2, '/media/juan_lebron.png', 'LebronAugsburger'),
( 'Franco', 'Stupaczuk', '1997-11-02', 6555, 'Argentina', 'left', 1, '/media/franco_stupaczuk.png', 'StupaYanguas'),
( 'Francisco', 'Navarro', '1989-02-10', 6250, 'Spain', 'left', 1, '/media/francisco_navarro.png', 'NavarroGuerrero'),
( 'Miguel', 'Yanguas', '2002-03-18', 6030, 'Spain', 'right', 2, '/media/miguel_yanguas.png', 'StupaYanguas'),
( 'Jorge', 'Nieto', '2001-02-20', 5804, 'Argentina', 'left', 1, '/media/jorge_nieto.png', 'NietoSanz'),
( 'Leandro', 'Augsburger', '2004-08-11', 5425, 'Argentina', 'left', 1, '/media/leandro_augsburger.png', 'LebronAugsburger'),
( 'Jon', 'Sanz', '2000-09-25', 5080, 'Spain', 'right', 2, '/media/jon_sanz.png', 'NietoSanz'),
( 'Martin', 'Nenno', '1997-03-18', 4930, 'Spain', 'right', 2, '/media/martin_nenno.png', 'NennoGonzalez'),
( 'Francisco', 'Guerrero', '2003-07-13', 4890, 'Spain', 'right', 2, '/media/francisco_guerrero.png', 'NavarroGuerrero'),
( 'Jeronimo', 'Gonzalez', '1997-02-21', 4260, 'Spain', 'left', 2, '/media/jeronimo_gonzalez.png', 'NennoGonzalez'),
( 'Lucas', 'Bergamini', '1997-08-18', 4640, 'Brazil', 'right', 2, '/media/lucas_bergamini.png', 'GarridoBergamini'),
( 'Javier', 'Garrido', '2000-10-26', 2605, 'Spain', 'left', 1, '/media/javier_garrido.png', 'GarridoBergamini'),
( 'Javier', 'Leal', '2003-07-28', 3695, 'Spain', 'left', 1, '/media/javier_leal.png', 'LealCardona'),
( 'Pablo', 'Cardona', '2004-11-03', 1805, 'Spain', 'right', 2, '/media/pablo_cardona.png', 'LealCardona'),
( 'Eduardo', 'Alonso', '2001-01-08', 3050, 'Spain', 'right', 2, '/media/eduardo_alonso.png', 'AlonsoTello'),
( 'Juan', 'Tello', '1995-02-01', 3015, 'Argentina', 'left', 1, '/media/juan_tello.png', 'AlonsoTello'),
( 'Alejandro', 'Arroyo', '2001-10-25', 2250, 'Spain', 'left', 1, '/media/alejandro_arroyo.png', 'ArroyoAguirre'),
( 'Leonel', 'Aguirre', '1997-12-23', 2045, 'Agentina', 'right', 2, '/media/leonel_aguirre.png', 'ArroyoAguirre'),
( 'Alejandro', 'Ruiz', '1994-06-12', 2545, 'Spain', 'right', 2, '/media/alejandro_ruiz.png', 'RuizEsbri'),
( 'Juanlu', 'Esbri', '2001-01-22', 2480, 'Spain', 'left', 2, '/media/juanlu_esbri.png', 'RuizEsbri'),
( 'Javier', 'Garcia', '2000-12-09', 2505, 'Spain', 'left', 1, '/media/javier_garcia.png', 'GarciaBarahona'),
( 'Javier', 'Barahona', '1998-09-17', 2480, 'Spain', 'right', 2, '/media/javier_barahona.png', 'GarciaBarahona'),
( 'Lucas', 'Campagnolo', '1995-06-13', 2370, 'Brazil', 'right', 2, '/media/lucas_campagnolo.png', 'CampagnoloBautista'),
( 'Jairo', 'Bautista', '2001-07-11', 2252, 'Spain', 'left', 1, '/media/jairo_bautista.png', 'CampagnoloBautista'),
( 'Carlos', 'Gutierrez', '1984-06-15', 2194, 'Argentina', 'right', 2, '/media/carlos_gutierrez.png', 'GutierrezAlfonso'),
( 'Gonzalo', 'Alfonso', '1996-03-30', 1909, 'Argentina', 'left', 1, '/media/gonzalo_alfonso.png', 'GutierrezAlfonso'),
( 'Alex', 'Chozas', '2003-04-12', 2193, 'Argentina', 'left', 1, '/media/alex_chozas.png', 'ChozasLibaak'),
( 'Valentino', 'Libaak', '2005-08-09', 1154, 'Argentina', 'right', 2, '/media/valentino_libaak.png', 'ChozasLibaak'),
( 'Inigo', 'Jofre', '2000-01-03', 2057, 'United Arab Emirates', 'right', 2, '/media/inigo_jofre.png', 'JofreSalguero'),
( 'Manuel', 'Salguero', '2008-06-13', 992, 'Spain', 'left', 1, '/media/manuel_salguero.png', 'JofreSalguero'),
( 'Jose', 'Diestro', '1992-02-15', 1890, 'Spain', 'right', 2, '/media/jose_diestro.png', 'DiestroAlbornoz'),
( 'Ignacio', 'Albornoz', '2003-11-19', 1154, 'Spain', 'left', 1, '/media/ignacio_albornoz.png', 'DiestroAlbornoz'),
( 'David', 'Sanchez', '2006-01-21', 1827, 'Spain', 'left', 1, '/media/david_sanchez.png', 'SanchezRodrigo'),
( 'Pablo', 'Rodrigo', '2002-11-12', 1675, 'Spain', 'right', 2, '/media/pablo_rodrigo.png', 'SanchezRodrigo'),
( 'Guillermo', 'Losada', '2005-05-05', 1695, 'Spain', 'left', 1, '/media/guillermo_losada.png', 'LosadaAlvarez'),
( 'Hernandez', 'Alvarez', '2004-02-09', 1695, 'Spain', 'right', 2, '/media/hernandez_alvarez.png', 'LosadaAlvarez'),
( 'Victor', 'Ruiz', '1989-07-09', 1672, 'Spain', 'left', 1, '/media/victor_ruiz.png', 'RuizCapra'),
( 'Luciano', 'Capra', '1993-10-19', 687, 'Argentina', 'right', 2, '/media/luciano_capra.png', 'RuizCapra'),
( 'Jose', 'Casas', '2004-11-09', 1625, 'Spain', 'right', 2, '/media/jose_casas.png', 'CasasCastillo'),
( 'Mario', 'Castillo', '2001-12-13', 1109, 'Spain', 'left', 1, '/media/mario_castillo.png', 'CasasCastillo'),
( 'Javier', 'Ruiz', '1994-02-12', 1496, 'Spain', 'left', 1, '/media/javier_ruiz.png', 'RuizRubio'),
( 'Gonzalo', 'Rubio', '1992-12-12', 1464, 'Spain', 'right', 2, '/media/gonzalo_rubio.png', 'RuizRubio'),
( 'Pablo', 'Lijo', '1993-04-11', 1400, 'Spain', 'right', 2, '/media/pablo_lijo.png', 'LijoSimo'),
( 'Maximiliano', 'Simo', '2003-09-14', 1252, 'Argentina', 'left', 1, '/media/maximiliano_simo.png', 'LijoSimo'),
( 'Alvaro', 'Cepero', '1994-02-13', 1302, 'Spain', 'right', 2, '/media/alvaro_cepero.png', 'CeperoAyats'),
( 'Arnau', 'Ayats', '2001-08-23', 563, 'United Arab Emirates', 'left', 1, '/media/arnau_ayats.png', 'CeperoAyats');