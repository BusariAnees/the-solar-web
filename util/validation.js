function userCredentialsAreValid(
    firstname,
    lastname,
    email,
  password,
  confirmpassword
) { 
  return (
  firstname &&
  firstname.trim() !== '' &&
  lastname &&
  lastname.trim() !== '' &&
  email &&
  password &&
  confirmpassword &&
  password.trim().length >= 6 &&
  password == confirmpassword &&
  email.includes("@")
);

   
}

module.exports =  userCredentialsAreValid;
