const { defineConfig } = require("cypress");
require('dotenv').config()

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.saucedemo.com",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      loginStandard: process.env.STANDARD_USER,
      loginPassword: process.env.PASSWORD,
    },
  },
});
