import {browser, ElementFinder} from "protractor";
import {UserEditPage} from "./userEdit.po";
import {UserSearchPage} from "./userSearch.po";
import {DatabaseUtils} from "../util/database.utils";

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

describe("user edit page", function () {

  before(() => {
    browser.waitForAngular();
    DatabaseUtils.connect();
    DatabaseUtils.removeAllUsers();
    DatabaseUtils.disconnect();
  });

  it("should create and find new user", function () {

    browser.get("user/new");

    let editPO = new UserEditPage();

    expect(browser.getCurrentUrl()).to.eventually.match(/\/user\/new/);

    editPO.createNewUser();

    editPO.submitBtn.click();

    browser.waitForAngular();

    let searchPO = new UserSearchPage();
    let testUserTd: ElementFinder = searchPO.findColumnByEmail();

    browser.wait(function () {
      return testUserTd.isPresent();
    }, 10000);

    expect(testUserTd.isDisplayed()).to.eventually.equal(true);

  });

  it("should edit user", function () {

    browser.get("user");

    let searchPO = new UserSearchPage();
    let testUserTd: ElementFinder = searchPO.findColumnByEmail();

    browser.wait(function () {
      return testUserTd.isPresent();
    }, 10000);

    testUserTd.click();

    expect(browser.getCurrentUrl()).to.eventually.match(/\/user\/edit\/[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}/);

    let newEmail = "abc@def.com";
    let editPO = new UserEditPage();
    editPO.emailInput.clear();
    editPO.emailInput.sendKeys(newEmail);

    editPO.submitBtn.click();

    browser.waitForAngular();

    expect(browser.getCurrentUrl()).to.eventually.match(/\/user/);

    let editedUserTd: ElementFinder = searchPO.findColumnByEmail(newEmail);

    browser.wait(function () {
      return editedUserTd.isPresent();
    }, 10000);

    expect(editedUserTd.isDisplayed()).to.eventually.equal(true);

  });

});
