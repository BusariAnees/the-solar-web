const db = require("../data/database.js");
const validationsession = require("../util/validation-session");
const userDetialsAreValid = require("../util/validation.js");
const authUtil = require("../util/authentication.js");
const Auth = require("../models/auth");

function get401(req, res) {
  res.status(401).render("401");
}

function getSignup(req, res) {
 let sessionErrorData = validationsession.sessionErrorData(req, {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmedpassword: "",
  });

  res.render("customer/auth/signup", {
    inputData: sessionErrorData,
  });
}

function getLogin(req, res) {
  let sessionErrorData = validationsession.sessionErrorData(req, {
    email: "",
    password: "",
    confirmedpassword: "",
  });

  res.render("customer/auth/login", {
    inputData: sessionErrorData,
  });
}

async function signup(req, res, next) {
  const userData = req.body;
  const firstname = userData.firstname;
  const lastname = userData.lastname;
  const enteredemail = userData.email;
  const enteredpassword = userData.password;
  const confirmedpassword = userData.Confirmpassword;

  if (
    !userDetialsAreValid(
      firstname,
      lastname,
      enteredemail,
      enteredpassword,
      confirmedpassword
    )
  ) {
    validationsession.flashErrorsToSession(
      req,
      {
        message: "Invalid input - please check your data.",
        firstname: firstname,
        lastname: lastname,
        email: enteredemail,
        password: enteredpassword,
        confirmedpassword: confirmedpassword,
      },
      function () {
        res.redirect("/signup");
      }
    );
    return;
  }

  const newUser = new Auth(enteredemail, enteredpassword, firstname, lastname);
  
  
  try {
    const existsAlready =  await newUser.existsAlready ();

    if(existsAlready){
    validationsession.flashErrorsToSession(
      req,
      {
        message: "User Already exist",
        firstname: firstname,
        lastname: lastname,
        email: enteredemail,
        password: enteredpassword,
        confirmedpassword: confirmedpassword,
      },
      function () {
        res.redirect("/signup");
      }
    );
    return;
  }
    
    await newUser.signup();
  } catch (error) {
    return next(error);
  }

  res.redirect("/login");
}

async function login(req, res, next) {
  const userData = req.body;
  const enteredemail = userData.email;
  const enteredpassword = userData.password;

  const newUser = new Auth(enteredemail, enteredpassword);
  let userAuth;
  try {
    userAuth = await newUser.fetchEmail();
  } catch (error) {
    return next(error);
  }

  if (!userAuth) {
    res.redirect("/login");
    return;
  }

  const userPassword = await newUser.hasMatchingPassword(userAuth.password);

  if (!userPassword) {
    res.redirect("/login");
    return;
  }

  authUtil.createUserSession(req, userAuth, function () {
    res.redirect("/");
  });
}

function logout(req, res) {
  req.session.isAdmin = false;
  req.session.uid = null;
  res.redirect("/");
}

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
  get401: get401,
  login: login,
  logout: logout,
};
