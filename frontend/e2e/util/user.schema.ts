var mongoose = require('mongoose');
var uuid = require('mongo-uuid');
var Schema = mongoose.Schema;
var userModel = mongoose.model('user', new Schema({
  id: {},
  firstname: String,
  familyname: String,
  emaily: String,
  timestamp: Date}));

export class UserSchema {

  static createNewUser(id: string, firstname: string, familyname: string, email: string, timestamp: string) {
    userModel({
      id: uuid.parse(id),
      firstname: firstname,
      familyname: familyname,
      email: email,
      timestamp: new Date(timestamp)
    }).save();
  }

  static removeAllUsers() {
    let uid = uuid.parse('dcc090ea-a65b-4ea4-9d91-22310bdad8af');
    userModel.find({}, function (err, users) {
      if(err) throw err;
      for (let user of users) {
        console.log("USER: ", user);
      }
    });

  }

}
