describe("Time Line", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("http://localhost:5173/");
    cy.fixture("timeLineSelectors").as("selectors");
    cy.fixture("userData").as("userData");
    cy.fixture("timeLineData").as("timeLineData");
    cy.get("@selectors").then((selectors) => {
      cy.get(selectors.signInButton).click({ force: true });
      cy.get(selectors.emailInputField).type("menamohamed0207@gmail.com");
      cy.get(selectors.passwordInputField).type("12345678");
      cy.get(selectors.logInButton).click();
    });
  });

  it("Reload Page", () => {
    cy.reload();
    cy.url().should("contains", "/home");
  });
  it("Add tweet", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@timeLineData").then((Data) => {
        cy.get(selectors.postInputField).type(Data.postText);
        cy.get(selectors.postButton).click();
        cy.contains(Data.postText).should("be.visible");
      });
    });
  });

  it("Post Button should be enabled", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get(selectors.postButtonTimeLine).click();
    });
  });

  it("Validation of post input field", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@timeLineData").then((Data) => {
        cy.get(selectors.postInputField).click();
        cy.get(selectors.postInputField).type("{enter}");
        cy.get(selectors.postButton).should("be.disabled");
      });
    });
  });
});
