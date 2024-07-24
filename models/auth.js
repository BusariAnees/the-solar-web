const bcrypt = require("bcryptjs");
const db = require("../data/database.js");
const mongodb = require("mongodb");

class Auth {
  constructor(firstname, lastname, email, password) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
  }

  async fetchEmail() {
    const existingUser = db.getDb
      .collection("users")
      .findOne({ email: this.email });
    return existingUser;
  }

  async existsAlready (){
    const existingUser = await this.fetchEmail();
    if(existingUser){
        return true;
    } else {
        return false;
    }
  }

  async signup() {
    const harshedpassword = await bcrypt.hash(this.password, 12);

    const user = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: harshedpassword,
    };
    const result = await db.getDb().collection("users").insertOne(user);
    return result;
  }
}

module.exports = Auth;
