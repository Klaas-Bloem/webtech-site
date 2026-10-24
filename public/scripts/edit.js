/* 
Script to 
- Implement listeners for forms and buttons and apply checks
- Changes the appearence of forms depending on the click of a button
- Check if passwords match when a user registers or changes its profile
- Check if the input file for pictures is within the limit
*/


// get the button to edit a users profile
const profileEditButton = document.querySelector(".main__edit-button")
// show or hide ethe profile dit form at each click
if (profileEditButton) {
  profileEditButton.addEventListener("click", changeEditForm);
}

// get the button to add players
const addPlayersButton = document.querySelector(".main__add-players-button");
// show or hide the add players form at each click
if (addPlayersButton) {
  addPlayersButton.addEventListener("click", changeAddForm);
}

// get the profile edit form
const profileEditForm = document.querySelector(".main__edit-form");
// on submit check if the passwords match
if (profileEditForm) {
  profileEditForm.addEventListener("submit", (event) => checkPassword(event, profileEditForm));
};

// get the register form
const registerForm = document.getElementById('registerForm');
// on submit check if the passwords match
if (registerForm) {
  registerForm.addEventListener("submit", (event) => checkPassword(event, registerForm));
};

// get the add players form
const addPlayersForm = document.querySelector(".main__add-players-form");
// check the input file size when an admin adds a player 
if (addPlayersForm) {
  addPlayersForm.addEventListener("submit", (event) => checkFileSize(event));
}

// function to check the file size of an input image
function checkFileSize(e) {
  const input = document.getElementsByClassName("form__input-photo")[0];

  const file = input.files[0];

  if (file.size > 1024 * 1024) { // file size max 1mb
    e.preventDefault();
    alert('File is larger than 1MB. Please upload again');
    input.value = "";  // empty value so the user can select a new file
  }
}

// function to check if passwords match when registering and changing user profile
function checkPassword(e, element) {
  let password;
  let password2;

  if (element === profileEditForm) {
    password = document.getElementById('editPassword');
    password2 = document.getElementById('editPassword2');
  }

  if (element === registerForm) {
    password = document.getElementById('password');
    password2 = document.getElementById('password2');
  }

  if (password.value !== password2.value) {
    e.preventDefault();
    alert('Passwords do not match. Please try again');
  }
}


// function show or hide the hidden edit form based on current state
function changeEditForm() {
  const editForm = document.querySelector(".main__edit-form");

  if (editForm.style.display == "block") {
    editForm.style.display = "none";
  }
  else {
    editForm.style.display = "block";
  }
}

// function show or hide the hidden add players form based on current state
function changeAddForm() {
  const editForm = document.querySelector(".main__add-players-form");

  if (editForm.style.display == "block") {
    editForm.style.display = "none";
  }
  else {
    editForm.style.display = "block";
  }
}

