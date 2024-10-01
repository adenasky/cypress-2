const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    projectId: "rp33gh",
    baseUrl: "http://qamid.tmweb.ru/admin/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});