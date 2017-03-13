var defaultTimeout = 60000;

let tags = require("./e2e/protractor-mocha-tags")();
let yaml = require("js-yaml");
let fs   = require("fs");

function readArguments() {
  try {
    var doc = yaml.safeLoad(fs.readFileSync("./e2e/protractor.arguments.yml", "utf8"));
    console.log(doc);
  } catch (e) {
    console.log(e);
  }
}

readArguments();

module.exports = {
  config: {
    capabilities: {
      "browserName": "chrome",
      "chromeOptions": {
        "args": ["no-sandbox"]
      }
    },
    directConnect: true,
    framework: "mocha",
    specs: ["e2e/**/*.e2e.ts"],
    baseUrl: "http://localhost:8080",
    getPageTimeout: defaultTimeout,
    allScriptsTimeout: defaultTimeout,
    defaultTimeoutInterval: defaultTimeout,
    useAllAngular2AppRoots: true,
    mochaOpts: {
      grep: tags,
      reporter: "mocha-multi-reporters",
      reporterOptions: {
        reporterEnabled: "mochawesome-screenshots, mocha-junit-reporter",
        mochawesomeScreenshotsReporterOptions: {
          reportDir: "test_reports",
          reportName: "testing-environment",
          reportTitle: "testing-environment",
          reportPageTitle: "testing-environment",
          takePassedScreenshot: true,
          clearOldScreenshots: true,
          jsonReport: false,
          multiReport: false
        },
        mochaJunitReporterReporterOptions: {
          mochaFile : "test_reports/junitReport.xml"
        }
      },
      timeout: 600000
    },
    onPrepare: () => {
      browser.ignoreSynchronization = true;
      require("ts-node/register");
    }
  }
};

