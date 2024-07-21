function userCredentialsAreValid(
    firstname,
    lastname,
    email,
  password,
  confirmpassword
) {

    firstname &&
    lastname &&
    email &&
    password &&
    confirmpassword &&
    password.trim().length < 6 &&
    password !== confirmpassword &&
    !email.includes("@");
}

module.exports = {
  userCredentialsAreValid: userCredentialsAreValid,
};
