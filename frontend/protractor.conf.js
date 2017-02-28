var defaultTimeout = 60000;

module.exports = {
  config: {
    capabilities: {
      'browserName': 'chrome',
      'chromeOptions': {
        'args': ['no-sandbox']
      }
    },
    directConnect: true,
    framework: 'mocha',
    specs: ['e2e/**/*.e2e.ts'],
    baseUrl: 'http://localhost:8080',
    getPageTimeout: defaultTimeout,
    allScriptsTimeout: defaultTimeout,
    defaultTimeoutInterval: defaultTimeout,
    useAllAngular2AppRoots: true,
    mochaOpts: {
      reporter: 'mochawesome-screenshots',
      reporterOptions: {
        reportDir: 'test_reports',
        reportName: 'testing-environment',
        reportTitle: 'testing-environment',
        reportPageTitle: 'testing-environment',
        takePassedScreenshot: true,
        clearOldScreenshots: true,
        jsonReport: false,
        multiReport: false
      },
      timeout: 600000
    },
    onPrepare: () => {
      browser.ignoreSynchronization = true;
      require('ts-node/register');
    }
  }
};

