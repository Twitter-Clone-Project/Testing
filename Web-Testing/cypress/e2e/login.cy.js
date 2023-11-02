const BASE_URL = "https://twitter.com";

describe("Should be able to login correctly", () => {
  it("perfect case", () => {
    cy.visit(`${BASE_URL}/`);
    cy.get(
      '[data-testid="loginButton"] > .r-1awozwy > .css-1hf3ou5 > .css-901oao'
    ).click();
    cy.get(".r-1roi411 > :nth-child(1) > .r-16y2uox").type(
      "rawanmostafa401@gmail.com"
    );
    cy.get("span").contains("Next").click();
    cy.get("input").type("rawanmo1174675");
    cy.get("span").contains("Next").click();
    cy.get('[name="password"]').type("nvp5U=uSiUxGb8.");
    cy.get("span").contains("Log in").click();
  });
});
