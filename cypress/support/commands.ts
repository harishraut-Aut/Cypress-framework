/// <reference types="cypress" />

import { loginPage } from "../integration/page-objects/loginPage";
import { clearAndType, click } from "../utils";

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

function highlightSubject(subject: JQuery<HTMLElement>) {
  subject.attr("style", "background: yellow; border: 2px solid red;");
  var millisecondsToWait = 250;
  setTimeout(function () {
    subject.removeAttr("style");
  }, millisecondsToWait);
  subject.css({
    border: "3px solid red",
  });
}

Cypress.Commands.add(`highLight`, { prevSubject: true }, function (subject) {
  highlightSubject(subject);
  return cy.wrap(subject);
});

Cypress.Commands.overwrite("log", (subject, message) =>
  cy.task("log", message),
);

const { userNameField, passwordField, loginBtn } = loginPage;

Cypress.Commands.add("login", ({ username, password }) => {
  clearAndType(userNameField, username);
  clearAndType(passwordField, password);
  click(loginBtn);
}
);