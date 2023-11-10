import { defineConfig } from "cypress";
export default defineConfig({
  projectId: "wsmo45",
  chromeWebSecurity: false,
  viewportWidth: 1920,
  viewportHeight: 1080,
  responseTimeout: 30000,
  experimentalStudio: true,
  includeShadowDom: true,
  pageLoadTimeout: 30000,
  defaultCommandTimeout: 30000,
  video: true,
  trashAssetsBeforeRuns: true,
  downloadsFolder: "cypress/testdownloads",
  experimentalWebKitSupport: true,
  e2e: {
    setupNodeEvents(on, config) {
      return require("./cypress/plugins/index.ts")(on, config);
    },
    specPattern: "**/*.spec.ts",
    baseUrl: "https://www.saucedemo.com/v1/",
  },
});
