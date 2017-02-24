var defaultTimeout = 60000;
var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

module.exports = {
  config: {
    capabilities: {
      'browserName': 'chrome',
      'chromeOptions': {
        'args': ['no-sandbox']
      }
    },
    directConnect: true,
    framework: 'jasmine2',
    specs: ['e2e/**/*.e2e.ts'],
    baseUrl: 'http://localhost:8080',
    getPageTimeout: defaultTimeout,
    allScriptsTimeout: defaultTimeout,
    defaultTimeoutInterval: defaultTimeout,
    jasmineNodeOpts: {
      showColors: true
    },
    useAllAngular2AppRoots: true,
    onPrepare: () => {
      browser.ignoreSynchronization = true;
      require('ts-node/register');
      jasmine.getEnv().addReporter(
        new Jasmine2HtmlReporter({
          savePath: 'test_reports/screenshots'
        })
      );
    }
  }
};

