
import {ElementFinder, by, element} from "protractor";
export class HeaderPO {

  heading: ElementFinder;

  constructor() {
    this.heading = element(by.id("header-link"));
  }

  getHeaderText() {
    return this.heading.getText();
  }

}
