const baseUrl = "http://18.212.103.71:5173/";
beforeEach(() => {
  cy.fixture("credentials.json").as("cred");
  cy.visit(`${baseUrl}`);
});
describe("Should be able to login correctly", () => {
  it("correct email, password", () => {
    cy.fixture("credentials.json").then((cred) => {
      cy.get('[href="/login"]').click({ force: true });
      cy.get('[data-testid="Email"]').type(cred.email);
      cy.get('[data-testid="Password"]').type(cred.password);
      cy.get('[data-testid="Log in"]').click();
      cy.url().should("contain", "/home");
    });
  });
});
describe("should not login", () => {
  it("correct email,wrong passowrd", () => {
    cy.fixture("credentials.json").then((cred) => {
      cy.get('[href="/login"]').click({ force: true });
      cy.get('[data-testid="Email"]').type(cred.email);
      cy.get('[data-testid="Password"]').type(cred.wrongPassword);
      cy.get('[data-testid="Log in"]').click();
      cy.url().should("not.contain", "/home");
    });
  });
  it("wrong email", () => {
    cy.fixture("credentials.json").then((cred) => {
      cy.get('[href="/login"]').click({ force: true });
      cy.get('[data-testid="Email"]').type(cred.wrongEmail);
      cy.get('[data-testid="Password"]').type(cred.password);
      cy.get('[data-testid="Log in"]').click();
      cy.url().should("not.contain", "/home");
    });
  });
});
/////////////////////////BUGGGGGG-not finished///////////////////////
// describe("should login with google", () => {
//   it("correct email", () => {
//     cy.fixture("credentials.json").then((cred) => {
//       cy.get('[href="/login"]').click({ force: true });
//       cy.get(
//         ":nth-child(2) > :nth-child(1) > .relative > .cursor-pointer"
//       ).click({ force: true });
//       cy.pause();
//     });
//   });
// });
describe("should be able to forget password", () => {
  it("forget password (correct)", () => {
    cy.fixture("credentials.json").then((cred) => {
      cy.get('[href="/login"]').click({ force: true });
      cy.get('[href="/forgot-password"]').click({ force: true });
      cy.get('[data-testid="Email"]').type(cred.email);
      cy.get('[data-testid="Next"]').click();
      cy.pause();
      cy.get('[data-testid="Next"]').click();
      cy.get('[data-testid="Enter a new password"]').type(cred.password);
      cy.get('[data-testid="Confirm your password"]').type(cred.password);
      cy.get('[data-testid="Change password"]').click();
      cy.url().should("contain", "/home");
    });
  });
  it("wrong email", () => {
    cy.fixture("credentials.json").then((cred) => {
      cy.get('[href="/login"]').click({ force: true });
      cy.get('[href="/forgot-password"]').click({ force: true });
      cy.get('[data-testid="Email"]').type(cred.wrongEmail);
      cy.get('[data-testid="Next"]').click();
      cy.get("div").contains("No user").should("be.visible");
    });
  });
  it("passwords doesn't match", () => {
    cy.fixture("credentials.json").then((cred) => {
      cy.get('[href="/login"]').click({ force: true });
      cy.get('[href="/forgot-password"]').click({ force: true });
      cy.get('[data-testid="Email"]').type(cred.email);
      cy.get('[data-testid="Next"]').click();
      cy.pause();
      cy.get('[data-testid="Next"]').click();
      cy.get('[data-testid="Enter a new password"]').type(cred.wrongPassword);
      cy.get('[data-testid="Confirm your password"]').type(cred.password);
      cy.get('[data-testid="Change password"]').click({ force: true });
      cy.get("span").contains("Passwords do not match").should("be.visible");
    });
  });
  it("wrong otp", () => {
    cy.fixture("credentials.json").then((cred) => {
      cy.get('[href="/login"]').click({ force: true });
      cy.get('[href="/forgot-password"]').click({ force: true });
      cy.get('[data-testid="Email"]').type(cred.email);
      cy.get('[data-testid="Next"]').click();
      cy.pause();
      cy.get('[data-testid="Next"]').click();
      cy.get("div").contains("In").should("be.visible");
    });
  });
  /////////////////////BUG/////////////////Fixed///////////////////////
  it("didn't recieve otp, send again", () => {
    cy.fixture("credentials.json").then((cred) => {
      cy.get('[href="/login"]').click({ force: true });
      cy.get('[href="/forgot-password"]').click({ force: true });
      cy.get('[data-testid="Email"]').type(cred.email);
      cy.get('[data-testid="Next"]').click();
      cy.get("span").contains("Didn't receive email?").click();
      cy.get("div").contains("Email sent successfully").should("be.visible");
    });
  });

  it.only("otp resesnd (try to enter the old one)", () => {
    cy.fixture("credentials.json").then((cred) => {
      cy.get('[href="/login"]').click({ force: true });
      cy.get('[href="/forgot-password"]').click({ force: true });
      cy.get('[data-testid="Email"]').type(cred.email);
      cy.get('[data-testid="Next"]').click();
      cy.wait(5000);
      cy.get("span").contains("Didn't receive email?").click();
      cy.get("div").contains("Email sent successfully").should("be.visible");
      cy.pause();
      cy.get('[data-testid="Next"]').click();
      cy.get("div").contains("In").should("be.visible");
    });
  });
});
