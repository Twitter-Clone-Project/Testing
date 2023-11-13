const baseUrl = "http://18.212.103.71:5173/";
beforeEach(() => {
  cy.fixture("credentials").as("credentials");
  cy.fixture("selectors").as("selectors");
  cy.visit(`${baseUrl}`);
});
describe("Should be able to login correctly", () => {
  it("correct login", () => {
    cy.get("@credentials").then((cred) => {
      cy.get("@selectors").then((sel) => {
        cy.get(sel.startScreenLoginBtn).click({ force: true });
        cy.get(sel.loginEmailInput).type(cred.email);
        cy.get(sel.loginPassInput).type(cred.password);
        cy.get(sel.loginBtn).click();
        cy.url().should("contain", "/home");
      });
    });
  });
});
describe("should not login", () => {
  it("wrong passowrd", () => {
    cy.get("@credentials").then((cred) => {
      cy.get("@selectors").then((sel) => {
        cy.get(sel.startScreenLoginBtn).click({ force: true });
        cy.get(sel.loginEmailInput).type(cred.email);
        cy.get(sel.loginPassInput).type(cred.wrongPassword);
        cy.get(sel.loginBtn).click();
        cy.url().should("contain", "/login");
        cy.get("div").contains("Wrong Password").should("be.visible");
      });
    });
  });
  it("wrong passowrd form", () => {
    cy.get("@credentials").then((cred) => {
      cy.get("@selectors").then((sel) => {
        cy.get(sel.startScreenLoginBtn).click({ force: true });
        cy.get(sel.loginEmailInput).type(cred.email);
        cy.get(sel.loginPassInput).type(cred.shortPassword);
        cy.get(sel.loginBtn).click();
        cy.url().should("contain", "/login");
        cy.get("div")
          .contains("Invalid input data: Invalid Password")
          .should("be.visible");
      });
    });
  });
  it("empty passowrd", () => {
    cy.get("@credentials").then((cred) => {
      cy.get("@selectors").then((sel) => {
        cy.get(sel.startScreenLoginBtn).click({ force: true });
        cy.get(sel.loginEmailInput).type(cred.email);
        cy.get(sel.loginBtn).should("be.disabled");
        cy.url().should("contain", "/login");
      });
    });
  });
  it("empty email", () => {
    cy.get("@credentials").then((cred) => {
      cy.get("@selectors").then((sel) => {
        cy.get(sel.startScreenLoginBtn).click({ force: true });
        cy.get(sel.loginPassInput).type(cred.password);
        cy.get(sel.loginBtn).should("be.disabled");
        cy.url().should("contain", "/login");
      });
    });
  });
  it("empty both", () => {
    cy.get("@selectors").then((sel) => {
      cy.get(sel.startScreenLoginBtn).click({ force: true });
      cy.get(sel.loginBtn).should("be.disabled");
      cy.url().should("contain", "/login");
    });
  });
  it("wrong email", () => {
    cy.get("@credentials").then((cred) => {
      cy.get("@selectors").then((sel) => {
        cy.get(sel.startScreenLoginBtn).click({ force: true });
        cy.get(sel.loginEmailInput).type(cred.wrongEmail);
        cy.get(sel.loginPassInput).type(cred.password);
        cy.get(sel.loginBtn).click();
        cy.url().should("contain", "/login");
        cy.get("div").contains("No User With Email").should("be.visible");
      });
    });
  });
  /////////////////BUG////////////////////
  it("wrong email form", () => {
    cy.get("@credentials").then((cred) => {
      cy.get("@selectors").then((sel) => {
        cy.get(sel.startScreenLoginBtn).click({ force: true });
        cy.get(sel.loginEmailInput).type("k@g");
        cy.get(sel.loginPassInput).type(cred.password);
        cy.get(sel.loginBtn).click();
        cy.url().should("contain", "/login");
        cy.get("div").contains("No User With Email").should("be.visible");
      });
    });
  });
});
/////////////////////////BUGGGGGG///////////////////////
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
    cy.get("@credentials").then((cred) => {
      cy.get("@selectors").then((sel) => {
        cy.get(sel.startScreenLoginBtn).click({ force: true });
        cy.get(sel.forgotPassBtn).click({ force: true });
        cy.get(sel.loginEmailInput).type(cred.email);
        cy.get(sel.nextBtn).click();
        cy.pause();
        cy.get(sel.nextBtn).click();
        cy.get(sel.newPassInput, { timeout: 6000 }).type(cred.password);
        cy.get(sel.confirmPassInput).type(cred.password);
        cy.get(sel.changePassBtn).click();
        cy.url().should("contain", "/home");
      });
    });
  });
  it("wrong email", () => {
    cy.get("@credentials").then((cred) => {
      cy.get("@selectors").then((sel) => {
        cy.get(sel.startScreenLoginBtn).click({ force: true });
        cy.get(sel.forgotPassBtn).click({ force: true });
        cy.get(sel.loginEmailInput).type(cred.wrongEmail);
        cy.get(sel.nextBtn).click();
        cy.get("div")
          .contains("No user registered with this email")
          .should("be.visible");
        cy.url().should("contain", "/forgot-password");
      });
    });
  });
  it("empty email", () => {
    cy.get("@credentials").then((cred) => {
      cy.get("@selectors").then((sel) => {
        cy.get(sel.startScreenLoginBtn).click({ force: true });
        cy.get(sel.forgotPassBtn).click({ force: true });
        cy.get(sel.nextBtn).should("be.disabled");
        cy.url().should("contain", "/forgot-password");
      });
    });
  });
  it("passwords doesn't match", () => {
    cy.get("@credentials").then((cred) => {
      cy.get("@selectors").then((sel) => {
        cy.get(sel.startScreenLoginBtn).click({ force: true });
        cy.get(sel.forgotPassBtn).click({ force: true });
        cy.get(sel.loginEmailInput).type(cred.email);
        cy.get(sel.nextBtn).click();
        cy.pause();
        cy.get(sel.nextBtn).click();
        cy.get(sel.newPassInput).type(cred.wrongPassword);
        cy.get(sel.confirmPassInput).type(cred.password);
        cy.get(sel.changePassBtn).click({ force: true });
        cy.get("span").contains("Passwords do not match").should("be.visible");
        cy.url().should("contain", "/forgot-password");
      });
    });
  });
  it("empty new passwords", () => {
    cy.get("@credentials").then((cred) => {
      cy.get("@selectors").then((sel) => {
        cy.get(sel.startScreenLoginBtn).click({ force: true });
        cy.get(sel.forgotPassBtn).click({ force: true });
        cy.get(sel.loginEmailInput).type(cred.email);
        cy.get(sel.nextBtn).click();
        cy.pause();
        cy.get(sel.nextBtn).click();
        cy.get(sel.changePassBtn, { timeout: 6000 }).should("be.disabled");
        cy.url().should("contain", "/forgot-password");
      });
    });
  });
  it("wrong otp,same form", () => {
    cy.get("@credentials").then((cred) => {
      cy.get("@selectors").then((sel) => {
        cy.get(sel.startScreenLoginBtn).click({ force: true });
        cy.get(sel.forgotPassBtn).click({ force: true });
        cy.get(sel.loginEmailInput).type(cred.email);
        cy.get(sel.nextBtn).click();
        cy.pause();
        cy.get(sel.nextBtn).click();
        cy.get("div").contains("Incorrect OTP").should("be.visible");
        cy.url().should("contain", "/forgot-password");
      });
    });
  });
  it("empty otp", () => {
    cy.get("@credentials").then((cred) => {
      cy.get("@selectors").then((sel) => {
        cy.get(sel.startScreenLoginBtn).click({ force: true });
        cy.get(sel.forgotPassBtn).click({ force: true });
        cy.get(sel.loginEmailInput).type(cred.email);
        cy.get(sel.nextBtn).click();
        cy.get(sel.nextBtn).should("be.disabled");
        cy.url().should("contain", "/forgot-password");
      });
    });
  });
  it("wrong otp,different form", () => {
    cy.get("@credentials").then((cred) => {
      cy.get("@selectors").then((sel) => {
        cy.get(sel.startScreenLoginBtn).click({ force: true });
        cy.get(sel.forgotPassBtn).click({ force: true });
        cy.get(sel.loginEmailInput).type(cred.email);
        cy.get(sel.nextBtn).click();
        cy.pause();
        cy.get(sel.nextBtn).click();
        cy.get("div")
          .contains("Invalid input data: Invalid value")
          .should("be.visible");
        cy.url().should("contain", "/forgot-password");
      });
    });
  });
  /////////////////////BUG/////////////////Fixed///////////////////////
  it("didn't recieve otp, send again", () => {
    cy.get("@credentials").then((cred) => {
      cy.get("@selectors").then((sel) => {
        cy.get(sel.startScreenLoginBtn).click({ force: true });
        cy.get(sel.forgotPassBtn).click({ force: true });
        cy.get(sel.loginEmailInput).type(cred.email);
        cy.get(sel.nextBtn).click();
        cy.get(sel.resendOtpBtn).click();
        cy.get("div").contains("Email sent successfully").should("be.visible");
      });
    });
  });

  it("otp resesnd (try to enter the old one)", () => {
    cy.get("@credentials").then((cred) => {
      cy.get("@selectors").then((sel) => {
        cy.get(sel.startScreenLoginBtn).click({ force: true });
        cy.get(sel.forgotPassBtn).click({ force: true });
        cy.get(sel.loginEmailInput).type(cred.email);
        cy.get(sel.nextBtn).click();
        cy.wait(5000);
        cy.get(sel.resendOtpBtn).click();
        cy.get("div").contains("Email sent successfully").should("be.visible");
        cy.pause();
        cy.get(sel.nextBtn).click();
        cy.get("div", { timeout: 6000 })
          .contains("Incorrect OTP")
          .should("be.visible");
        cy.url().should("contain", "/forgot-password");
      });
    });
  });
});
