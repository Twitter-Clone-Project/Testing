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

// read the API Key from environment variable (see the API Key section of README)
// cypress/support/commands.js

import MailSlurp from "mailslurp-client";

const apiKey =
  "4733deadf031edf026ec0cbf1b3cacbab0faa0b7e7707ec6b27e54a0ab17ff73";

if (!apiKey) {
  throw new Error("MAILSLURP_API_KEY not found in environment variables.");
}

const mailslurp = new MailSlurp({ apiKey });

Cypress.Commands.add("mailslurp", () => {
  return cy.wrap(mailslurp);
});
