const db = require('..data/database.js')
const validationsession = require('..util/validation-session')
const validation = require('..util/validation')

function getSignup(req, res) {

  
 res.render('signup');
}



function getLogin(req,res) {

}

 async function signup (req, res) {
   const userData = req.body;
   const firstname = userData.firstname;
   const lastname = userData.lastname;
   const enteredemail = userData.email;
   const enteredpassword = userData.enteredpassword;
   const confirmedpassword = userData.Confirmpassword;
 
   if(!validationsession.userCredentialsAreValid(
     firstname,
     lastname,
     enteredemail,
     enteredpassword,
     confirmedpassword,
   )
   ) {
     validationsession.flashErrorsToSession(
        req,
        {
            message:'Invalid input - please check your data.',
            email: enteredemail,
            confirmpassword: confirmedpassword,
            password: enteredpassword,
        },
       function () {
        res.redirect('/signup');
       }
     );
     return;
   }

}

module.exports = {
    getSignup: getSignup,
    getLogin: getLogin,
    signup: signup,
}