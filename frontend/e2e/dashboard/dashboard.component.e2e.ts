import {browser} from "protractor";
import {HeaderPO} from "../header/header.po";
import {DatabaseUtils} from "../util/database.utils";

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

describe("dashboard page", function () {

  before(() => {
    browser.get("dashboard");
    DatabaseUtils.connect();
    DatabaseUtils.removeAllUsers();
    DatabaseUtils.createAndSaveUser();
    DatabaseUtils.disconnect();
  });

  it("should go to dashboard @dashboard", function () {
    let headerPage = new HeaderPO();

    expect(browser.getCurrentUrl()).to.eventually.match(/\/dashboard$/);
    expect(headerPage.getHeaderText()).to.eventually.equal('Testing Environment');
  });

});
