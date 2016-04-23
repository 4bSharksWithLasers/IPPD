'use strict';

// Protractor configuration
var config = {
  specs: ['modules/*/tests/e2e/*.js'],
  jasmineNodeOpts: {defaultTimeoutInterval: 100000}
};

if (process.env.TRAVIS) {
  config.capabilities = {
    browserName: 'firefox'
  };
}

exports.config = config;
