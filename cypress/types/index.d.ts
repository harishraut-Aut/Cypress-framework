/// <reference types="cypress" />

// typings for custom commands
declare namespace Cypress {
  interface Chainable {
    highLight(): Chainable;
    log(message: string): void;
    login({ username, password }): void;
  }
}
