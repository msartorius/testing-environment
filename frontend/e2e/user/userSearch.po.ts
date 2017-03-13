import {ElementFinder, by, element, ElementArrayFinder} from "protractor";

export class UserSearchPage {

  userTableCells: ElementArrayFinder;

  constructor() {
    this.userTableCells = element(by.id("user-search-table")).all(by.tagName("td"));
  }

  findColumnByEmail(email = "test_user@mail.com"): ElementFinder {
    return this.userTableCells.filter((elem: ElementFinder) =>
      elem.getText().then((text: string) => text === email)).first();
  }

}
