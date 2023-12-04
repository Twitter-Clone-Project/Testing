/// <reference types="cypress"/>
const baseUrl = "http://127.0.0.1:5173/";
beforeEach(() => {
  cy.fixture("credentials_profile").as("credentials");
  cy.fixture("selectors_profile").as("selectors");
  cy.visit(`${baseUrl}`);
  cy.get("@credentials").then((cred) => {
    cy.get("@selectors").then((sel) => {
      cy.get(sel.startScreenLoginBtn).click({ force: true });
      cy.get(sel.loginEmailInput).type(cred.email1);
      cy.get(sel.loginPassInput).type(cred.password);
      cy.get(sel.loginBtn).click();
      cy.url().should("contain", "/home");
    });
  });
});
describe("follow", () => {
  it("unfollow-->following updated correctly", () => {
    cy.get("p").eq("Profile").click();
  });
});
