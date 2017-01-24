let SpecReporter = require('jasmine-spec-reporter').SpecReporter;

exports.config = {
  framework: 'jasmine2',
  onPrepare: function () {
    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: true
      }
    }));
  },
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['./test/*spec.js'],
  baseUrl: 'https://energy.comparethemarket.com/',
  capabilities: {
    browserName: 'chrome'
  }
};