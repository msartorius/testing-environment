import {browser} from "protractor";
import {HeaderPO} from "../header/header.po";

describe("dashboard page", function () {

  beforeAll(() => {
    browser.get("dashboard");
  });

  it("should change date", function () {

    let headerPage = new HeaderPO();

    expect(browser.getCurrentUrl()).toMatch(/\/dashboard$/);
    expect(headerPage.getHeaderText()).toEqual('Testing Environment');
  });

});
