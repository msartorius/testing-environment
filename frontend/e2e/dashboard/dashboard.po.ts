import {ElementFinder, by, element, $$, ElementArrayFinder} from "protractor";

export class DashboardPage {

  datepicker: ElementFinder;


  constructor() {
    this.datepicker = element(by.id("datepicker"));
    let dates:ElementArrayFinder = $$("[id^=datepicker]");
  }

}
