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
// describe("should login with google", () => {
//   it.only("correct email", () => {
//     cy.fixture("credentials.json").then((cred) => {
//       cy.get(
//         '[data-testid="loginButton"] > .r-1awozwy > .css-1hf3ou5 > .css-901oao'
//       ).click();
//       cy.get("span").contains("تسجيل الدخول باستخدام Google").click();
//       cy.pause();
//     });

//   });
// });
describe("should be able to forget password (correct)", () => {
  it("forget password", () => {
    cy.fixture("credentials.json").then((cred) => {
      cy.get(
        '[data-testid="loginButton"] > .r-1awozwy > .css-1hf3ou5 > .css-901oao'
      ).click();
      cy.get(
        ".css-18t94o4.r-1niwhzg > .r-1awozwy > .css-1hf3ou5 > .css-901oao"
      ).click();
      cy.get('[data-testid="ocfEnterTextTextInput"]').type(cred.email3);
      cy.get('[data-testid="ocfEnterTextNextButton"] > .r-1awozwy').click();
      // cy.get('[data-testid="ocfEnterTextTextInput"]').type(cred.username);
      cy.get('[data-testid="ChoiceSelectionNextButton"] > .r-1awozwy').click();
      cy.pause();
      cy.get("span").contains("Next").click();
      cy.get('[name="password"]').first().type(cred.password3);
      cy.get('[name="password"]').last().type(cred.password3);
      cy.get("span").contains("Change password").click();
      cy.get("span").contains("Change password").click();
      cy.get(":nth-child(1) > .r-6uxfom > input").check();
      cy.get('[data-testid="ChoiceSelectionNextButton"] > .r-1awozwy').click();
      cy.get("#modal-header > :nth-child(1) > .css-901oao").should(
        "be.visible"
      );
    });
  });
  it("wrong email", () => {
    cy.fixture("credentials.json").then((cred) => {
      cy.get(
        '[data-testid="loginButton"] > .r-1awozwy > .css-1hf3ou5 > .css-901oao'
      ).click();
      cy.get(
        ".css-18t94o4.r-1niwhzg > .r-1awozwy > .css-1hf3ou5 > .css-901oao"
      ).click();
      cy.get('[data-testid="ocfEnterTextTextInput"]').type(cred.wrongEmail);
      cy.get("span").contains("Next").click();
    });
  });
  it.only("passwords doesn't match", () => {
    cy.fixture("credentials.json").then((cred) => {
      cy.get(
        '[data-testid="loginButton"] > .r-1awozwy > .css-1hf3ou5 > .css-901oao'
      ).click();
      cy.get(
        ".css-18t94o4.r-1niwhzg > .r-1awozwy > .css-1hf3ou5 > .css-901oao"
      ).click();
      cy.get('[data-testid="ocfEnterTextTextInput"]').type(cred.email3);
      cy.get('[data-testid="ocfEnterTextNextButton"] > .r-1awozwy').click();
      // cy.get('[data-testid="ocfEnterTextTextInput"]').type(cred.username);
      cy.get('[data-testid="ChoiceSelectionNextButton"] > .r-1awozwy').click();
      cy.pause();
      cy.get("span").contains("Next").click();
      cy.get('[name="password"]').first().type(cred.password3);
      cy.get('[name="password"]').last().type(cred.wrongPassword);
      cy.get("span").contains("Change password").click();
    });
  });
});
