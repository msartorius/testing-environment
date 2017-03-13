const mongoose = require("mongoose");
const uuid = require("mongo-uuid");
let userModel = mongoose.model("user", mongoose.Schema({
  id: {},
  firstname: String,
  familyname: String,
  emaily: String,
  timestamp: Date}, { versionKey: false }), "user");

export class UserSchema {

  static createNewUser(id: string,
                       firstname: string,
                       familyname: string,
                       email: string,
                       timestamp: string) {
    userModel({
      id: uuid.parse(id),
      firstname: firstname,
      familyname: familyname,
      email: email,
      timestamp: new Date(timestamp)
    }).save()
      .then((usr) => console.log("Fixture: Saved User: ", usr))
      .catch((err) => console.log("Fixture: Error while saving user: ", err));
  }

  static removeAllUsers() {
    userModel.find({}).remove().exec()
      .then((usrs) => console.log("Fixture: Deleted all users.."))
      .catch((err) => console.log("Fixture: Error while deleting all users: ", err));
  }

}
