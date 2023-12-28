/// <reference types="cypress"/>

const baseUrl = "https://twitter-clone.onthewifi.com/";
beforeEach(() => {
  cy.fixture("credentials_profile").as("credentials");
  cy.fixture("selectors_notifications").as("selectors");
  cy.fixture("selectors").as("selectors_");
  cy.visit(`${baseUrl}`);
  cy.get("@credentials").then((cred) => {
    cy.get("@selectors_").then((sel) => {
      cy.get(sel.startScreenLoginBtn).click({ force: true });
      cy.get(sel.loginEmailInput).type(cred.email1);
      cy.get(sel.loginPassInput).type(cred.password123);
      cy.get(sel.loginBtn).click();
    });
  });
  cy.viewport("macbook-16");
});
describe("follow notifications", () => {
  it("unfollow user--> show in other user notification", () => {
    cy.get("@selectors").then((sel) => {
      cy.get(sel.searchBar).type("rawantest1");
      cy.get(sel.gotorawantest1).click();
      cy.get(sel.unfollow).click();
      //logout
      cy.get(sel.userBtn).click();
      cy.get(sel.logOutBtn).click();
      cy.get(sel.logOutStep2).click();
      //login to the other user
      cy.get("@credentials").then((cred) => {
        cy.get(sel.startScreenLoginBtn).click({ force: true });
        cy.get(sel.loginEmailInput).type(cred.email2);
        cy.get(sel.loginPassInput).type(cred.password123);
        cy.get(sel.loginBtn).click();
        cy.get(sel.sideBarNotif).click();
        cy.get(sel.notifList)
          .children()
          .first()
          .should("have.attr", "href", "/app/rawann/posts");
      });
    });
  });
});
