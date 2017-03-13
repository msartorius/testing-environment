import {ElementFinder, by, element} from "protractor";

export class DashboardPage {

  datepicker: ElementFinder;

  constructor() {
    this.datepicker = element(by.id("datepicker"));
  }

}
