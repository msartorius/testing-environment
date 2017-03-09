import {UserSchema} from "./user.schema";
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var uuid = require('mongo-uuid');
const db = mongoose.connection;

export class DatabaseUtils {

  static connect(uri: string = "mongodb://database/testing-environment") {
    mongoose.connect(uri)
      .then(() => console.log("Fixture: Connected to DB"))
      .catch((err) => console.log("Fixture: Error while connecting to DB", err));
  }

  static disconnect() {
    mongoose.disconnect()
      .then(() => console.log("Fixture: Disconnected from DB"))
      .catch((err) => console.log("Fixture: Error while disconnecting from DB", err));
  }

  static createAndSaveUser(id: string = "dcc090ea-a65b-4ea4-9d91-22310bdad8af",
                    firstname: string = "Test",
                    familyname: string = "User",
                    email: string = "test_user@mail.com",
                    timestamp: string = "2017-03-05T12:00:00.000Z") {
     UserSchema.createNewUser(id, firstname, familyname, email, timestamp);
  }

  static removeAllUsers() {
    UserSchema.removeAllUsers();
  }

}
