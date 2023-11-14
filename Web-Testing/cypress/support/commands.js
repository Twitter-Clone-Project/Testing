// ***********************************************
// This example commands.js shows you how to
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

import MailSlurp from "mailslurp-client";

const apiKey =
  "a6857723b2990d0f5b10018b4e2c5f392a98ab889b1521b23e73a6b0fdf7b848";

if (!apiKey) {
  throw new Error("MAILSLURP_API_KEY not found in environment variables.");
}

const mailslurp = new MailSlurp({ apiKey });

Cypress.Commands.add("mailslurp", () => {
  return cy.wrap(mailslurp);
});