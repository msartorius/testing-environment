import {UserSchema} from "./user.schema";
var mongoose = require('mongoose');
var uuid = require('mongo-uuid');
const db = mongoose.connection;

export class DatabaseUtils {

  connect(uri: string = "mongodb://database/testing_environment") {
    mongoose.connect(uri);
    db.on('error', console.error.bind(console, 'connection error:'));
  }

  disconnect() {
    mongoose.disconnect();
  }

  createAndSaveUser(id: string = "dcc090ea-a65b-4ea4-9d91-22310bdad8af",
                    firstname: string = "Test",
                    familyname: string = "User",
                    email: string = "test_user@mail.com",
                    timestamp: string = "2017-02-10T12:00:00.000Z") {
     UserSchema.createNewUser(id, firstname, familyname, email, timestamp);
  }

  removeAllUsers() {
    UserSchema.removeAllUsers();
  }

}
