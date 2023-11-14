const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // defaultCommandTimeout: 20000,
  pageLoadTimeout:60000,
  projectId:"9r1qh5",
  defaultCommandTimeout: 30000,
  requestTimeout: 30000,
  viewportHeight: 800,
  viewportWidth: 800,
  videoCompression: false,
  e2e: {
    experimentalStudio:true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
