const { defineConfig } = require(`cypress`)

module.exports = defineConfig({
  e2e: {
    baseUrl: `http://localhost:9000`,
    failOnStatusCode: false,
    video: false,
    specPattern: `cypress/integration/**/*.js`
  }
})
