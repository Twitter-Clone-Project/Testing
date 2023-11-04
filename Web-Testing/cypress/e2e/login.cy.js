const baseUrl = "https://twitter.com";
beforeEach(() => {
  cy.fixture("credentials.json").as("cred");
  cy.visit(`${baseUrl}/`);
});
describe("Should be able to login correctly", () => {
  it("correct email, password", () => {
    cy.fixture("credentials.json").then((cred) => {
      cy.get(
        '[data-testid="loginButton"] > .r-1awozwy > .css-1hf3ou5 > .css-901oao'
      ).click();
      cy.get(".r-1roi411 > :nth-child(1) > .r-16y2uox").type(cred.email);
      cy.get("span").contains("Next").click();
      cy.pause();
      cy.get('[name="password"]').type(cred.password);
      cy.get("span").contains("Log in").click();
      cy.url().should("contain", "/home");
    });
  });
});
describe("should not login", () => {
  it("correct email,wrong passowrd", () => {
    cy.fixture("credentials.json").then((cred) => {
      cy.get(
        '[data-testid="loginButton"] > .r-1awozwy > .css-1hf3ou5 > .css-901oao'
      ).click();
      cy.get(".r-1roi411 > :nth-child(1) > .r-16y2uox").type(cred.email);
      cy.get("span").contains("Next").click();
      cy.pause();
      cy.get('[name="password"]').type(cred.wrongPassword);
      cy.get("span").contains("Log in").click();
      cy.url().should("contain", "/login");
      cy.get("span").contains("Wrong password!").should("be.visible");
    });
  });
  it("wrong email", () => {
    cy.fixture("credentials.json").then((cred) => {
      cy.get(
        '[data-testid="loginButton"] > .r-1awozwy > .css-1hf3ou5 > .css-901oao'
      ).click();
      cy.get(".r-1roi411 > :nth-child(1) > .r-16y2uox").type(cred.wrongEmail);
      cy.get("span").contains("Next").click();
      cy.url().should("contain", "/login");
      cy.get("span")
        .contains("Sorry, we could not find your account.")
        .should("be.visible");
    });
  });
});
describe("should login with google", () => {
  it.only("correct email", () => {
    cy.fixture("credentials.json").then((cred) => {
      cy.get(
        '[data-testid="loginButton"] > .r-1awozwy > .css-1hf3ou5 > .css-901oao'
      ).click();
      cy.get("span").contains("تسجيل الدخول باستخدام Google").click();
      cy.pause();
    });

  });
});
