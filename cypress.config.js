const { defineConfig } = require('cypress')
require('dotenv').config()

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      standardUser: process.env.STANDARD_USER,
      problemUser: process.env.PROBLEM_USER,
      lockedUser: process.env.LOCKED_USER,
      errorUser: process.env.ERROR_USER,
      loginPassword: process.env.PASSWORD
    }
  }
})
