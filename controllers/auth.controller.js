const db = require("../data/database.js");
const validationsession = require("../util/validation-session");
const validation = require("../util/validation.js");
const authUtil = require("../util/authentication.js");
const Auth = require("../models/auth");


function get401(req,res){
  res.status(401).render('401');
}

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

  const newUser = new Auth( enteredemail, enteredpassword,firstname, lastname,);
 await newUser.signup();

  res.redirect('/login');
}

async function login(req, res){
const userData = req.body;
const enteredemail = userData.email;
const enteredpassword = userData.password;

const newUser = new Auth(enteredemail,enteredpassword);
const userAuth = await newUser.fetchEmail();




 if(!userAuth){
  res.redirect('/login');
  return;
 } 

 const userPassword = await newUser.hasMatchingPassword(userAuth.password);

 if(!userPassword){
  res.redirect('/login');
  return;
 } 

authUtil.createUserSession(req, userAuth, function() {
  res.redirect('/');
})

}

function logout(req, res){
req.session.isAdmin = false;
req.session.uid = null;
res.redirect('/');
}

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
  get401:get401,
  login:login,
  logout:logout,
};
