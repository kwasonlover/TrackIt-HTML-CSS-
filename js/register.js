const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const letter = document.getElementById("letter");
const capital = document.getElementById("capital");
const number = document.getElementById("number");
const length = document.getElementById("length");

passwordInput.addEventListener("keyup", validatePassword);
passwordInput.onfocus = () => (document.getElementById("message").style.display = "block");
passwordInput.onblur = () => (document.getElementById("message").style.display = "none");

const validatePassword = () => {
  const password = passwordInput.value;
  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const isValidLength = password.length >= 8;

  updateUI(letter, hasLowerCase);
  updateUI(capital, hasUpperCase);
  updateUI(number, hasNumber);
  updateUI(length, isValidLength);
}

const updateUI = (element, isValid) => {
  if (isValid) {
    element.classList.remove("invalid");
    element.classList.add("valid");
  } else {
    element.classList.remove("valid");
    element.classList.add("invalid");
  }
}

const validation = (event) => {
  event.preventDefault();

  const username = usernameInput.value;
  const password = passwordInput.value;

  if (isValidForm(username, password)) {
    const user = { username, password };
    saveUser(user);
    alert("Registration successful!");
    window.location.href = "/html/index.html";
  }
}

const isValidForm = (username, password) => {
  return (
    username.trim() !== "" &&
    password.trim() !== "" &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    password.length >= 8
  );
}

const saveUser = (user) => {
  let users = localStorage.getItem("users");
  if (!users) {
    users = [];
  } else {
    users = JSON.parse(users);
  }

  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
}

const registerForm = document.forms["registerForm"];
registerForm.addEventListener("submit", validation);
