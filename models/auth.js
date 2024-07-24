const bcrypt = require("bcryptjs");
const db = require("../data/database.js");
const mongodb = require("mongodb");

class Auth {
  constructor( email, password,firstname, lastname,) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
  }

  async fetchEmail() {
    const existingUser = await db.getDb()
      .collection("users")
      .findOne({ email: this.email });
    return existingUser;
  }





  async signup() {
    try{
      const harshedpassword = await bcrypt.hash(this.password, 12)
       const user = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: harshedpassword,
    };


      const result = await db.getDb().collection("users").insertOne(user);
         return result;
    }
      catch(error){
   console.log(error)
    }
  }

  async hasMatchingPassword (harshedpassword){
    return bcrypt.compare(this.password, harshedpassword)
  }
}


module.exports = Auth;
