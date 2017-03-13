import {UserSchema} from "./user.schema";
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

export class DatabaseUtils {

  static connect(uri = "mongodb://database/testing-environment") {
    mongoose.connect(uri)
      .then(() => console.log("Fixture: Connected to DB"))
      .catch((err) => console.log("Fixture: Error while connecting to DB", err));
  }

  static disconnect() {
    mongoose.disconnect()
      .then(() => console.log("Fixture: Disconnected from DB"))
      .catch((err) => console.log("Fixture: Error while disconnecting from DB", err));
  }

  static createAndSaveUser(id = "dcc090ea-a65b-4ea4-9d91-22310bdad8af",
                    firstname = "Test",
                    familyname = "User",
                    email = "test_user@mail.com",
                    timestamp = "2017-03-05T12:00:00.000Z") {
     UserSchema.createNewUser(id, firstname, familyname, email, timestamp);
  }

  static removeAllUsers() {
    UserSchema.removeAllUsers();
  }

}
