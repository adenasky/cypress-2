const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    projectId: "rp33gh",
    baseUrl: "https://qamid.tmweb.ru",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});