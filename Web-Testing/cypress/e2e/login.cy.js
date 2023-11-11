const baseUrl = "http://54.234.179.218:5173/";
beforeEach(() => {
  cy.fixture("credentials.json").as("cred");
  cy.visit(`${baseUrl}`);
});
describe("Should be able to login correctly", () => {
  it("correct email, password", () => {
    cy.fixture("credentials.json").then((cred) => {
      cy.get('[href="/login"]').click({ force: true });
      cy.get('[type="email"]').type(cred.email);
      cy.get('[type="password"]').type(cred.password);
      cy.get(":nth-child(6) > .cursor-pointer").click();
      cy.url().should("contain", "/home");
    });
  });
});
describe("should not login", () => {
  it("correct email,wrong passowrd", () => {
    cy.fixture("credentials.json").then((cred) => {
      cy.get('[href="/login"]').click({ force: true });
      cy.get('[type="email"]').type(cred.email);
      cy.get('[type="password"]').type(cred.wrongPassword);
      cy.get(":nth-child(6) > .cursor-pointer").click();
      cy.url().should("not.contain", "/home");
    });
  });
  it("wrong email", () => {
    cy.fixture("credentials.json").then((cred) => {
      cy.get('[href="/login"]').click({ force: true });
      cy.get('[type="email"]').type(cred.wrongEmail);
      cy.get('[type="password"]').type(cred.password);
      cy.get(":nth-child(6) > .cursor-pointer").click();
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
      cy.get("input").get('[type="email"]').type(cred.email);
      cy.get(".cursor-pointer").click();
      cy.pause();
      cy.get(".cursor-pointer").click();
      cy.get("button").get('[type="password"]').first().type(cred.password);
      cy.get("button").get('[type="password"]').last().type(cred.password);
      cy.get(".mb-4 > .relative > .cursor-pointer").click();
      cy.url().should("contain", "/home");
    });
  });
  it("wrong email", () => {
    cy.fixture("credentials.json").then((cred) => {
      cy.get('[href="/login"]').click({ force: true });
      cy.get('[href="/forgot-password"]').click({ force: true });
      cy.get("input").get('[type="email"]').type(cred.wrongEmail);
      cy.get(".cursor-pointer").click();
      cy.get("div").contains("No user").should("be.visible");
    });
  });
  it("passwords doesn't match", () => {
    cy.fixture("credentials.json").then((cred) => {
      cy.get('[href="/login"]').click({ force: true });
      cy.get('[href="/forgot-password"]').click({ force: true });
      cy.get("input").get('[type="email"]').type(cred.email);
      cy.get(".cursor-pointer").click();
      cy.pause();
      cy.get(".cursor-pointer").click();
      cy.get("button")
        .get('[type="password"]')
        .first()
        .type(cred.wrongPassword);
      cy.get("button").get('[type="password"]').last().type(cred.password);
      cy.get(".mb-4 > .relative > .cursor-pointer").click({ force: true });
      cy.get("span").contains("Passwords do not match").should("be.visible");
    });
  });
  it.only("wrong otp", () => {
    cy.fixture("credentials.json").then((cred) => {
      cy.get('[href="/login"]').click({ force: true });
      cy.get('[href="/forgot-password"]').click({ force: true });
      cy.get("input").get('[type="email"]').type(cred.email);
      cy.get(".cursor-pointer").click();
      cy.pause();
      cy.get(".cursor-pointer").click();
      cy.get("div").contains("Incorrect OTP").should("be.visible");
    });
  });
});
