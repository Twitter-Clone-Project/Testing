describe("signUp", () => {
  beforeEach(() => {
    cy.visit("http://54.234.179.218:5173/");
    cy.fixture("signUpSelectors").as("selectors");
    cy.fixture("userData").as("userData");
    cy.get("@selectors").then((selectors) => {
      cy.get(selectors.createAccountButton).click();
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
        cy.get(selectors.whatIsYourNameMessage)
        .should("have.text", "What's your  name?");
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
        cy.get(selectors.userEmailTextField).type(userData.validEmail);
        cy.get(selectors.nextButtonSignUp).click();
        cy.get(selectors.popUp).should("be.visible");
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
  it("testcase4:enter invalid email and invalid user name", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@userData").then((userData) => {
        cy.get(selectors.nameInputField).type(userData.userName);
        cy.get(selectors.userNameTextField).type(userData.invalidUserName);
        cy.get(selectors.userEmailTextField).type(userData.invalidEmail);
        cy.get(selectors.passwordInputField).type(userData.passwordOfTesting);
        cy.get(selectors.confirmPasswordInputField).type(
          userData.passwordOfTesting
        );
        cy.get(selectors.monthSelector).select(userData.selectedMonth);
        cy.get(selectors.daySelector).select(userData.selectedDay);
        cy.get(selectors.yearSelector).select(userData.selectedYear);
        cy.get(selectors.nextButtonSignUp).click();
        cy.wait(100);
        cy.get(selectors.popUp).should("be.visible");
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

  it("verification code check", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@userData").then((userData) => {
        cy.get(selectors.nameInputField).type(userData.userName);
        cy.get(selectors.userNameTextField).type(userData.userName);
        cy.get(selectors.passwordInputField).type(userData.passwordOfTesting);
        cy.get(selectors.confirmPasswordInputField).type(
          userData.passwordOfTesting
        );
        cy.get(selectors.userEmailTextField).type(userData.validEmail);
        cy.get(selectors.monthSelector).select(userData.selectedMonth);
        cy.get(selectors.daySelector).select(userData.selectedDay);
        cy.get(selectors.yearSelector).select(userData.selectedYear);
        cy.get(selectors.nextButtonSignUp).click();
        cy.get(selectors.verificationCodeInputField).type("1233");
        cy.get(selectors.nextButtonVerificationCode).click();
        cy.url().should("have.text", "http://54.234.179.218:5173/signup");
      });
    });
  });

 

});
