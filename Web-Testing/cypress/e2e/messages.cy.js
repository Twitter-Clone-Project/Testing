/// <reference types="cypress"/>

const baseUrl = "https://twitter-clone.onthewifi.com/";
beforeEach(() => {
  cy.fixture("credentials_profile").as("credentials");
  cy.fixture("selectors_messages").as("selectors");
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

describe("message input constraints", () => {
  it("msg shouldn't be empty", () => {
    cy.get("@selectors").then((sel) => {
      cy.get(sel.sideBarMsgs).click();
      cy.get(sel.msgsSearchBar).type("rawantest");
      cy.get(sel.msgsSearchrawantest1).click();
      cy.get(sel.sendBtn).should("not.have.class", " hover:bg-blue-light");
    });
  });
  it("msg shouldn't contain spaces only", () => {
    cy.get("@selectors").then((sel) => {
      cy.get(sel.sideBarMsgs).click();
      cy.get(sel.msgsSearchBar).type("rawantest");
      cy.get(sel.msgsSearchrawantest1).click();
      cy.get(sel.msgsInput).type("        ");
      cy.get(sel.sendBtn).should("not.have.class", " hover:bg-blue-light");
    });
  });
});

describe("send message successfully", () => {
  it("send msg--> showing in user chat", () => {
    cy.get("@selectors").then((sel) => {
      cy.get(sel.sideBarMsgs).click();
      cy.get(sel.msgsSearchBar).type("rawantest");
      cy.get(sel.msgsSearchrawantest1).click();
      cy.get(sel.msgsInput).type("new msg");
      cy.get(sel.sendBtn).click();

      cy.get('[data-testid*="message-card-inside"]')
        .last() // Using *= to match partial attribute value
        .should("have.text", "new msg")
        .should("be.visible");
    });
  });
  it("send msg--> showing in the other user chat", () => {
    cy.get("@selectors").then((sel) => {
      cy.get(sel.sideBarMsgs).click();
      cy.get(sel.msgsSearchBar).type("rawantest");
      cy.get(sel.msgsSearchrawantest1).click();
      cy.get(sel.msgsInput).type("new msg");
      cy.get(sel.sendBtn).click();
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
      });
      cy.get(sel.sideBarMsgs).click();
      cy.get(sel.convHistory)
        .children()
        .first()
        .should("have.attr", "href", "/app/messages/rawann");
    });
  });
  it("send msg--> msgs counter increased in other user chat", () => {
    cy.get("@selectors").then((sel) => {
      cy.get(sel.sideBarMsgs).click();
      cy.get(sel.msgsSearchBar).type("rawantest");
      cy.get(sel.msgsSearchrawantest1).click();
      cy.get(sel.msgsInput).type("new msg");
      cy.get(sel.sendBtn).click();
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
      });
      cy.wait(2000);
      cy.get(sel.sideBarMsgs).click();
      cy.get(sel.msgsCount).should("have.text", "1");
    });
  });
});
