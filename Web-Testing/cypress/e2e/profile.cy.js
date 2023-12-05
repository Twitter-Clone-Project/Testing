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
      cy.wait(5000);
    });
  });
  cy.viewport("macbook-16");
});
describe("posts", () => {
  it("add new tweet--> added in profile", () => {
    cy.get("@selectors").then((sel) => {
      cy.get(sel.postInputField).type("NEW TWEET");
      cy.get(sel.postButton).click();
      cy.get(sel.sideBarProfile).click();
      cy.wait(20000);
      cy.get(sel.lastestTweetContent)
        .invoke("text")
        .then((text) => {
          expect(text).to.equal(" NEW TWEET ");
        });
    });
  });
  it("add 2 new tweet--> added in profile in right order", () => {
    cy.get("@selectors").then((sel) => {
      cy.get(sel.postInputField).type("FIRST NEW TWEET");
      cy.get(sel.postButton).click();
      cy.get(sel.postInputField).type("SECOND NEW TWEET");
      cy.get(sel.postButton).click();
      cy.get(sel.sideBarProfile).click();
      cy.get(sel.lastestTweetContent, { timeout: 40000 })
        .invoke("text")
        .then((text) => {
          expect(text).to.equal(" SECOND NEW TWEET ");
        });
      cy.get(sel.beforeLastestTweetContent, { timeout: 40000 })
        .invoke("text")
        .then((text) => {
          expect(text).to.equal(" FIRST NEW TWEET ");
        });
    });
  });
});
describe("like", () => {
  it("like some tweet from my posts --> added to likes", () => {
    cy.get("@selectors").then((sel) => {
      cy.get(sel.sideBarProfile).click();
      cy.get(sel.latestTweetLike, { timeout: 40000 }).then(() => {
        cy.get(sel.latestTweetLike).click();
        cy.get(sel.likesBtn, { timeout: 40000 })
          .click()
          .then(() => {
            cy.get(sel.latestTweetContentLikes, { timeout: 40000 })
              .invoke("text")
              .then((text) => {
                expect(text).to.contain("SECOND NEW TWEET");
              });
          });
      });
    });
  });
  it.only("unlike some tweet from my likes --> removed likes", () => {
    cy.get("@selectors").then((sel) => {
      cy.get(sel.sideBarProfile).click();
      cy.get(sel.likesBtn).click();
      cy.get(sel.latestTweetLike, { timeout: 40000 }).then(() => {
        cy.get(sel.latestTweetLike).click();
        cy.wait(10000);
        cy.get(".fill-T#F918801").should("not.be.visible");
      });
    });
  });
});
