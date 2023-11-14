describe("signUp", () => {
  beforeEach(() => {
    cy.visit("http://18.212.103.71:5173/");
    cy.fixture("signUpSelectors").as("selectors");
    cy.fixture("userData").as("userData");
    cy.get("@selectors").then((selectors) => {
      cy.get(selectors.createAccountButton).click();
    });
  });
  //i want to get the eye that get disappeared but i could not YET
  it("check on the other eye", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get(selectors.passwordInputField).type("1", { delay: 100 });
      cy.pause();
      cy.get(selectors.passwordInputField).should(
        "have.attr",
        "type",
        "password"
      );
    });
  });

  //tested and there is a bug
  it("testcase7:fill all input fields and click next", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@userData").then((userData) => {
        cy.contains("Name").type(userData.userName);
        cy.get(selectors.userNameTextField).type(userData.userName);
        cy.get(selectors.passwordInputField).type(userData.passwordOfTesting);
        cy.get(selectors.confirmPasswordInputField).type(
          userData.passwordOfTesting
        );
        cy.get(selectors.userEmailTextField).type(userData.validEmail);
        cy.get(selectors.monthSelector).select(userData.selectedMonth);
        cy.get(selectors.daySelector).select(userData.selectedDay);
        cy.get(selectors.yearSelector).select(userData.selectedYear);
        cy.get(selectors.nextButtonSignUp).should("be.enabled").click();
      });
    });
  });
  it.only("username existed and the email not ", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@userData").then((userData) => {
        cy.contains("Name").type(userData.userName);
        cy.get(selectors.userNameTextField).type(userData.userName);
        cy.get(selectors.passwordInputField).type(userData.passwordOfTesting);
        cy.get(selectors.confirmPasswordInputField).type(
          userData.passwordOfTesting
        );
        cy.get(selectors.userEmailTextField).type(userData.validEmail);
        cy.get(selectors.monthSelector).select(userData.selectedMonth);
        cy.get(selectors.daySelector).select(userData.selectedDay);
        cy.get(selectors.yearSelector).select(userData.selectedYear);
        cy.get(selectors.userNameExistedErrorMessage).should("be.visible");
      });
    });
  });
  //tested and it is okay
  it("testcase2:enter invalid user name", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@userData").then((userData) => {
        cy.get(selectors.nameInputField).type(userData.invalidUserName);
        cy.get(selectors.userEmailTextField).type(userData.validEmail);
        cy.get(selectors.nameInputField)
          .invoke("val")
          .then((text) => {
            cy.log(text);
            //text should be less than or equal to 50
            expect(text.length).to.be.lessThan(51);
          });
      });
    });
  });
  //tested and it is okay
  it("testcase6:what is your name ? message", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@userData").then((userData) => {
        cy.get(selectors.nameInputField).type(userData.userName);
        cy.get(selectors.nameInputField).clear();
        cy.get(selectors.whatIsYourNameMessage).should(
          "have.text",
          "What's your  name?"
        );
      });
    });
  });
  //there is a bug when fill confirm password before password
  it("testcase9:fill the confirmed password before password", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@userData").then((userData) => {
        cy.get(selectors.nameInputField).type(userData.userName);
        cy.get(selectors.userNameTextField).type(userData.userName);
        cy.get(selectors.confirmPasswordInputField).type(
          userData.passwordOfTesting
        );
        cy.get(selectors.passwordInputField).type(userData.passwordOfTesting);
        cy.get(selectors.userEmailTextField).type(userData.validEmail);
        cy.get(selectors.monthSelector).select(userData.selectedMonth);
        cy.get(selectors.daySelector).select(userData.selectedDay);
        cy.get(selectors.yearSelector).select(userData.selectedYear);
        cy.get(selectors.nextButtonSignUp).should("be.enabled").click();
      });
    });
  });

  //passes
  it("testcase1:enter invalid email", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@userData").then((userData) => {
        cy.get(selectors.nameInputField).type(userData.userName);
        cy.get(selectors.userNameTextField).type(userData.userName);
        cy.get(selectors.passwordInputField).type(userData.passwordOfTesting);
        cy.get(selectors.confirmPasswordInputField).type(
          userData.passwordOfTesting
        );
        cy.get(selectors.monthSelector).select(userData.selectedMonth);
        cy.get(selectors.daySelector).select(userData.selectedDay);
        cy.get(selectors.yearSelector).select(userData.selectedYear);
        cy.get(selectors.userEmailTextField).type(userData.invalidEmailPassed);
        cy.get(selectors.errorEmailMessage).should("be.visible");
        // cy.get(selectors.nextButtonSignUp).click();
        // cy.get(selectors.popUp).should("be.visible");
      });
    });
  });
  it("testcase10:enter another invalid email", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@userData").then((userData) => {
        cy.get(selectors.nameInputField).type(userData.userName);
        cy.get(selectors.userNameTextField).type(userData.userName);
        cy.get(selectors.passwordInputField).type(userData.passwordOfTesting);
        cy.get(selectors.confirmPasswordInputField).type(
          userData.passwordOfTesting
        );
        cy.get(selectors.monthSelector).select(userData.selectedMonth);
        cy.get(selectors.daySelector).select(userData.selectedDay);
        cy.get(selectors.yearSelector).select(userData.selectedYear);
        cy.get(selectors.userEmailTextField).type(userData.invalidEmail);
        cy.get(selectors.errorEmailMessage).should("be.visible");
      });
    });
  });
  //passes
  it("testcase3:Fill Data and then press close", () => {
    cy.viewport(1920, 1080);
    cy.get("@selectors").then((selectors) => {
      cy.get("@userData").then((userData) => {
        cy.get(selectors.userNameTextField).type(userData.userName);
        cy.get(selectors.userEmailTextField).type(userData.validEmail);
        cy.get(selectors.monthSelector).select(userData.selectedMonth);
        cy.get(selectors.daySelector).select(userData.selectedDay);
        cy.get(selectors.yearSelector).select(userData.selectedYear);
        cy.get(selectors.closeButton).click();
        cy.get(selectors.createAccountButton).click();
        //make sure that the data is cleared
        cy.get(selectors.userNameTextField)
          .invoke("val")
          .then((text) => {
            cy.log(text);
            expect(text.length).to.be.equal(0);
          });
      });
    });
  });

  //passes
  it("testcase5:empty email and user name and then click on the button it will be clickable", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@userData").then((userData) => {
        cy.get(selectors.userNameTextField).type(userData.userName);
        cy.get(selectors.userEmailTextField).type(userData.validEmail);
        cy.get(selectors.monthSelector).select(userData.selectedMonth);
        cy.get(selectors.daySelector).select(userData.selectedDay);
        cy.get(selectors.yearSelector).select(userData.selectedYear);

        cy.get(selectors.userNameTextField).clear();
        cy.get(selectors.userEmailTextField).clear();
        cy.get(selectors.nextButtonSignUp).should("be.disabled");
      });
    });
  });
  it("Year Field doesn't work properly", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@userData").then((userData) => {
        cy.get(selectors.nameInputField).type(userData.userName, {
          delay: 100,
        });
        cy.get(selectors.userNameTextField).type(userData.userName, {
          delay: 100,
        });
        cy.get(selectors.passwordInputField).type(userData.passwordOfTesting, {
          delay: 100,
        });
        cy.get(selectors.confirmPasswordInputField).type(
          userData.passwordOfTesting,
          { delay: 100 }
        );

        cy.get(selectors.userEmailTextField).type(userData.validEmail, {
          delay: 100,
        });
        cy.get(selectors.monthSelector).select(userData.selectedMonth);
        cy.get(selectors.daySelector).select(userData.selectedDay);
        cy.get(selectors.nextButtonSignUp).should("be.disabled");
      });
    });
  });

  // bug
  it.skip("sign up button", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get(selectors.signUpWithGoogleButton).click();
      cy.pause();
    });
  });
  it("enter existed email", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@userData").then((userData) => {
        cy.get(selectors.nameInputField).type(userData.userName, {
          delay: 100,
        });
        cy.get(selectors.userNameTextField).type(userData.userName, {
          delay: 100,
        });
        cy.get(selectors.passwordInputField).type(userData.passwordOfTesting, {
          delay: 100,
        });
        cy.get(selectors.confirmPasswordInputField).type(
          userData.passwordOfTesting,
          { delay: 100 }
        );

        cy.get(selectors.userEmailTextField).type(userData.existingEmail, {
          delay: 100,
        });
        cy.get(selectors.monthSelector).select(userData.selectedMonth);
        cy.get(selectors.daySelector).select(userData.selectedDay);
        cy.get(selectors.emailExitedErrorMessage).should("be.visible");
        cy.get(selectors.nextButtonSignUp).should("be.disabled");
      });
    });
  });
  it("Empty Data", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get(selectors.nextButtonSignUp).should("be.disabled");
    });
  });
  //bug in back
  it("verification code check", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@userData").then((userData) => {
        cy.get(selectors.nameInputField).type(userData.userName, {
          delay: 100,
        });
        cy.get(selectors.userNameTextField).type(userData.userName, {
          delay: 100,
        });
        cy.get(selectors.passwordInputField).type(userData.passwordOfTesting, {
          delay: 100,
        });
        cy.get(selectors.confirmPasswordInputField).type(
          userData.passwordOfTesting,
          { delay: 100, force: true }
        );

        cy.get(selectors.userEmailTextField).type(userData.surpMail, {
          delay: 100,
        });
        cy.get(selectors.monthSelector).select(userData.selectedMonth);
        cy.get(selectors.daySelector).select(userData.selectedDay);
        cy.get(selectors.yearSelector).select(userData.selectedYear);
        cy.get(selectors.nextButtonSignUp).should("be.enabled");
        cy.get(selectors.nextButtonSignUp).click();
        cy.pause();

        let codeTyped;
        cy.wait(5000);
        cy.mailslurp().then((mailslurp) => {
          return mailslurp
            .waitForLatestEmail("4113c8ce-5a59-4b30-879a-301408731187")
            .then((email) => {
              const codeRegex = /Your OTP is ([0-9a-zA-Z]+)/;
              const match = codeRegex.exec(email.body);
              const code = match ? match[1] : null;
              codeTyped = code;
              cy.get(selectors.verificationCodeInputField).type(codeTyped);
              cy.get(selectors.verificationCodeButton).click();
              cy.url().should("contains", "/home");
              expect(code).to.not.be.null;
              cy.log(code);
            });
        });
      });
    });
  });
});
