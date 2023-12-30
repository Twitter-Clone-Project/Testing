const { defineConfig } = require('cypress')


module.exports = defineConfig({
  // setupNodeEvents can be defined in either
  // the e2e or component configuration
  e2e: {
    pageLoadTimeout:100000,
    experimentalStudio:true,
    execTimeout:6000,
    defaultCommandTimeout:10000,
    
    
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config)

      // include any other plugin code...

      // It's IMPORTANT to return the config object
      // with any changed environment variables
      return config
    },
  },
})

