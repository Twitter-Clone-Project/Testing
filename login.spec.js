/// <reference types="cypress"/>

describe("login functionality", () => {
    beforeEach(()=>{
       cy.fixture('validUser').as('user') 
    })

  it("should be able to login with valid password", () => {
    cy.visit("/login");
    //fixture: to get input values from json file
    cy.get('@user').then((user) => {
      cy.get("input").type(user.password);
      cy.get("button").click();
    });

    cy.url().should("eql", "http://localhost:3000/");
  });
});


describe("read/write file", () => {

  it.only("read/write files", () => {
    cy.visit("/login");
    //readFile--> same as cy.fixture but needs file ext, needs the full path like so
    // cy.readFile("cypress/fixtures/validUser.json").then((user) => {
    //   cy.get("input").type(user.password);
    //   cy.get("button").click();
    // });

    // cy.url().should("eql", "http://localhost:3000/");

    cy.writeFile("cypress/fixtures/testdata.json",{
        "password":'abc'
    })
  });
});


//to change fixture folder loc: 
//in cypress.json: "fixturesfolder": "cypress/data"
