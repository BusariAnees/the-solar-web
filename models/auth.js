const bcrypt = require("bcryptjs");
const db = require("../data/database.js");
const mongodb = require("mongodb");

class Auth {
  constructor(email, password, firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
  }

  static async findById(userId) {
    const uid = new mongodb.ObjectId(userId);
   return  await db.getDb().collection("users").findOne({ _id: uid }, { projection: {password: 0 }}); // the 0 will exclude a data from being fetched
  }

  async fetchEmail() {
    const existingUser = await db
      .getDb()
      .collection("users")
      .findOne({ email: this.email });
    return existingUser;
  }

  async existsAlready() {
    const existingUser = await this.fetchEmail();
    if (existingUser) {
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

  async hasMatchingPassword(harshedpassword) {
    return bcrypt.compare(this.password, harshedpassword);
  }
}

module.exports = Auth;
