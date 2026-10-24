/* 
Script to 
- Define all classes that we need for our players and teams
- Create all player cards and apply listeners to them
*/


// local:  ""
// server: "/group15"
const ROOT_DIR = "";


// function to check if an input is a string
function checkInputString(input) {
  if (typeof input !== 'string') {
    throw new Error('Input must be in string format');
  }
}

// define Person class
class Person {
  #firstName;
  #lastName;
  #birthDate;
  #nationality;

  constructor(firstName, lastName, birthDate, nationality) {
    this.#firstName = firstName;
    this.#lastName = lastName;
    this.#birthDate = birthDate;
    this.#nationality = nationality;
  }

  get fullName() {
    // Making sure that the full name of the player is displayed with correct upper and lower case letters
    return this.#firstName.charAt(0).toUpperCase() +
      this.#firstName.slice(1).toLowerCase() +
      " " +
      this.#lastName.charAt(0).toUpperCase() +
      this.#lastName.slice(1).toLowerCase();
  }

  get firstName() {
    // Making sure that the first name is displayed with correct upper and lower case
    return this.#firstName.charAt(0).toUpperCase() +
      this.#firstName.slice(1).toLowerCase();
  }

  set firstName(value) {
    // Check with function if the set first name is a string
    checkInputString(value);
    this.#firstName = value;
  }

  get lastName() {
    // Making sure that the last name is displayed with correct upper and lower case
    return this.#lastName.charAt(0).toUpperCase() +
      this.#lastName.slice(1).toLowerCase();
  }

  set lastName(value) {
    // Check with function if the set first name is a string
    checkInputString(value);
    this.#lastName = value;
  }

  get birthDate() {
    // Return birthdate in the format day-month-year
    var dateYear = this.#birthDate.getFullYear().toString();
    var dateMonth = (this.#birthDate.getMonth() + 1).toString();
    var dateDay = this.#birthDate.getDate().toString();
    return `${dateDay}-${dateMonth}-${dateYear}`;
  }

  set birthDate(value) {
    // Check if date is given with type Date, and if the value is valid
    if (!(value instanceof Date && isNaN(value))) {
      throw new Error('Birth date must be a Date object');
    }
    this.#birthDate = value;
  }

  get nationality() {
    return this.#nationality;
  }

  set nationality(value) {
    checkInputString(value);
    this.#nationality = value;
  }

  get information() {
    // Returns a string with some of the information of the player
    return 'Hi I\'am ' + this.fullName + '\n' +
      'Birth date: ' + this.birthDate + '\n' +
      'Nationality: ' + this.nationality;
  }
}

// define the player class 
class Player extends Person {
  #position;
  #number;
  #photo;
  #team;

  constructor(firstName, lastName, birthDate, nationality, position, number, photo, team) {
    super(firstName, lastName, birthDate, nationality);
    this.#position = position;
    this.#number = number;
    this.#photo = ROOT_DIR + photo;
    this.#team = team;
    // this.#formerTeams = formerTeams;
  }

  get position() {
    return this.#position.toLowerCase();
  }

  set position(value) {
    // Checking wether the position is on the right or left side of the field
    if (value.toLowerCase() !== 'left' && value.toLowerCase() !== 'right') {
      throw new Error('Position must be left or right');
    }
    this.#position = value.toLowerCase();
  }

  get number() {
    return this.#number;
  }

  set number(value) {
    if (!Number.isInteger(value)) {
      throw new Error('number must be an integer');
    }
    this.#number = value;
  }

  get photo() {
    return this.#photo;
  }

  set photo(img) {
    // Get the part after last dot to determine whether the filepath is referring to an image
    const filepathEnd = img.split('.').pop().toLowerCase();
    const imageExt = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
    // Raise error if filepathEnd is not in the format options given
    if (!imageExt.includes(filepathEnd)) {
      throw new Error('filepath must refer to an image');
    }
    this.#photo = img;
  }

  get team() {
    return this.#team;
  }

  set team(value) {
    checkInputString(value);
    this.#team = value;
  }

  get playerInformation() {
    return 'Hi I\'am ' + this.fullName + '. ' +
      `I was born on ${this.birthDate}, and I am born in ${this.nationality}.` +
      ` Below you can find some more information about me: `;
  }
}

// define Team class
class Team {
  #title;
  #country;
  #city;

  constructor(title, country, city, teamMembers) {
    this.#title = title;
    this.#country = country;
    this.#city = city;
  }

  get title() {
    return this.#title;
  }

  set title(value) {
    checkInputString(value);
    this.#title = value;
  }

  get country() {
    return this.#country;
  }

  set country(value) {
    checkInputString(value);
    this.#country = value;
  }

  get city() {
    return this.#city;
  }

  set city(value) {
    checkInputString(value);
    this.#city = value;
  }
}

// function to create new player objects and apply the DOM manipulation
function createPage(playersJSON) {
  // creating a list of js player objects from JSON objects
  const players = playersJSON.map(p =>
    new Player(
      p.firstName,
      p.lastName,
      new Date(p.birthDate),
      p.nationality,
      p.position,
      p.number,
      p.photo,
      p.team
    )
  );

  // run all functions creating the DOM
  createPlayerDiv(players);
}




// creates a player card (article) consisting of a header, image and a section (cointaining paragraphs)
function createPlayerCard(p) {
  const playerArticle = document.createElement("article");
  playerArticle.className = "players__card";

  const playerH2 = document.createElement("h2");
  playerH2.className = "card__title";
  const playerTitle = document.createTextNode(p.fullName);

  const playerImg = document.createElement("img");
  playerImg.className = "card__img";
  playerImg.src = p.photo;
  playerImg.alt = `picture of ${p.fullName}`;

  const playerSection = document.createElement("section");
  playerSection.className = "card__section";

  const playerInfoHeader = document.createElement("h3");
  playerInfoHeader.className = "card-section__title";
  const infoTitle = document.createTextNode(p.playerInformation);

  const playerBirthdateP = createPropertyP(`Birthday: ${p.birthDate}`);
  const playerNationalityP = createPropertyP(`Nationality: ${p.nationality}`);
  const playerPositionP = createPropertyP(`Position: ${p.position}`);
  const playerNumberP = createPropertyP(`Number: ${p.number}`);
  const playerTeamP = document.createElement("p");

  // added the link to the team to the card
  playerTeamP.className = "card__par";
  const teamLink = document.createElement("a");
  teamLink.href = `${ROOT_DIR}/team/${encodeURIComponent(p.team)}`;  // to team page
  teamLink.textContent = `Team: ${p.team}`;
  playerTeamP.appendChild(teamLink);

  playerH2.appendChild(playerTitle);
  playerInfoHeader.appendChild(infoTitle);

  sectionChildren = [playerInfoHeader, playerBirthdateP, playerNationalityP,
    playerPositionP, playerNumberP, playerTeamP];

  // append all paragraphs to the section
  for (var element of sectionChildren) {
    playerSection.appendChild(element);
  }

  articleChildren = [playerH2, playerImg, playerSection];

  // append header, image and section to the article
  for (var element of articleChildren) {
    playerArticle.appendChild(element);
  }

  return playerArticle;
}

// creates paragraph structured like 'property name: property value'
function createPropertyP(text) {
  const propertyP = document.createElement("p");
  propertyP.className = "card__par";
  const propertyText = document.createTextNode(text);
  propertyP.appendChild(propertyText);
  return propertyP;
}

// creates flex container from all player cards
function createPlayerDiv(players) {

  const playerDiv = document.createElement("div");
  playerDiv.className = "players";

  players.forEach(p => { playerDiv.appendChild(createPlayerCard(p)); });

  document.querySelector("main").appendChild(playerDiv);
}


// function to implement all player card listeners and accounts for mobile vs large screens.
function implementListeners() {
  // hovering over the section paragraphs makes them bold
  document.querySelectorAll("p.card__par").forEach(par => {
    // add listeners on paragraphs at touchstart and touchend only if the user is on mobile
    par.addEventListener("touchstart", () => { if (isMobile(window)) { return setBold(par, reset = false) } else return; }, true);
    par.addEventListener("touchend", () => { if (isMobile(window)) { return setBold(par, reset = true) } else return; }, false);

    // add listeners on paragraphs at mouseover and mouseleave only if the user is on large screens
    par.addEventListener("mouseover", () => { if (!isMobile(window)) { return setBold(par, reset = false) } else return; }, true);
    par.addEventListener("mouseleave", () => { if (!isMobile(window)) { return setBold(par, reset = true) } else return; }, false);
  });

  // Eventpropagation for making the player cards bigger when hovering over them
  // Changes to clicking for mobile instead of hovering (standard)
  document.querySelectorAll(".players__card").forEach(card => {

    // add listeners to cards at touchstart and touchend only if the user is on mobile
    // capturing phase: sets and removes scale 
    // bublling phase: sets and removes box shadow
    card.addEventListener("touchstart", () => { if (isMobile(window)) { return setScale(card, reset = false) } else return; }, true);
    card.addEventListener("touchstart", () => { if (isMobile(window)) { return setShadow(card, reset = false) } else return; }, false);
    card.addEventListener("touchend", () => { if (isMobile(window)) { return setScale(card, reset = true) } else return; }, true);
    card.addEventListener("touchend", () => { if (isMobile(window)) { return setShadow(card, reset = true) } else return; }, false);

    // add listeners to cards at mouseover and mouseleave if the user is using a large screens
    // capturing phase: sets and removes scale 
    // bublling phase: sets and removes box shadow
    card.addEventListener("mouseover", () => { if (!isMobile(window)) { return setScale(card, reset = false) } else return; }, true);
    card.addEventListener("mouseover", () => { if (!isMobile(window)) { return setShadow(card, reset = false) } else return; }, false);
    card.addEventListener("mouseleave", () => { if (!isMobile(window)) { return setScale(card, reset = true) } else return; }, true);
    card.addEventListener("mouseleave", () => { if (!isMobile(window)) { return setShadow(card, reset = true) } else return; }, false);
  });
}

// check whether user is using mobile
function isMobile(window) {
  if (window.innerWidth >= 768) {
    return false;
  }
  else {
    return true;
  }
}

// sets scale or removes scale
function setScale(item, reset) {
  if (reset == true) {
    item.style.transform = "";
  }
  else {
    item.style.transform = 'scale(1.05)';
  }
}

// sets shadow or removes shadow
function setShadow(item, reset) {
  if (reset == true) {
    item.style.boxShadow = "";
  }
  else {
    item.style.boxShadow = "0 4px 8px rgba(0,0,0,0.3)";
  }
}

// sets bold or removes bold
function setBold(item, reset) {
  if (reset == true) {
    item.style.fontWeight = "";
  }
  else {
    item.style.fontWeight = "bold";
  }
}

// get the player data from the div containing the palyer cards in the pug file
const playerDataDiv = document.getElementById('player-data');
// parse the JSON data
const playerJSON = JSON.parse(playerDataDiv.dataset.json);

// display all player cards on the page
createPage(playerJSON);
// activate all listeners
implementListeners();