const db = require("../data/database.js");
const validationsession = require("../util/validation-session");
const validation = require("../util/validation.js");
const Auth = require("../models/auth");

function getSignup(req, res) {
  res.render("customer/auth/signup");
}

function getLogin(req, res) {
  res.render('customer/auth/login')
}

async function signup(req, res) {
  const userData = req.body;
  const firstname = userData.firstname;
  const lastname = userData.lastname;
  const enteredemail = userData.email;
  const enteredpassword = userData.password;
  const confirmedpassword = userData.Confirmpassword;

  const newUser = new Auth(firstname, lastname, enteredemail, enteredpassword);

  const signedUp = await newUser.signup();

  res.redirect('/login');
}

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
};
