const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // defaultCommandTimeout: 20000,
  pageLoadTimeout:60000,
  projectId:"9r1qh5",
  e2e: {
    experimentalStudio:true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
