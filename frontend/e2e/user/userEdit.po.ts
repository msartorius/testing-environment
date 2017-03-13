import {ElementFinder, by, element} from "protractor";

export class UserEditPage {

  firstNameInput: ElementFinder;
  familyNameInput: ElementFinder;
  emailInput: ElementFinder;
  submitBtn: ElementFinder;


  constructor() {
    this.firstNameInput = element(by.id("first-name"));
    this.familyNameInput = element(by.id("family-name"));
    this.emailInput = element(by.id("email"));
    this.submitBtn = element(by.id("submit-button"));
  }

  createNewUser(firstName = "Test",
                familyName = "User",
                email = "test_user@mail.com") {
    this.firstNameInput.sendKeys(firstName);
    this.familyNameInput.sendKeys(familyName);
    this.emailInput.sendKeys(email);
  }

}
