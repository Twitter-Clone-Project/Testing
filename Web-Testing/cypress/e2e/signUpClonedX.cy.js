describe("signUp", () => {
  beforeEach(() => {
    cy.visit(" http://localhost:3000/");
    cy.fixture("signUpSelectors").as("selectors");
    cy.fixture("userData").as("userData");
  });
  //Bug: using edge makes another eye appear
  it("testcase1: check on the eye", () => {
    cy.get("@selectors").then((selectors) => {

      cy.get(selectors.createAccountButton).click();
      cy.get(selectors.passwordInputField).type("1", { delay: 100 });

      cy.get(selectors.passwordInputField).should(
        "have.attr",
        "type",
        "password"
      );
    });
  });

  //Bug: when pressing on the label it focuses on the email input field
  it("testcase2: fill all input fields and click next", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@userData").then((userData) => {
        cy.get(selectors.createAccountButton).click();
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
  //passes
  it("testcase3: username existed and the email not ", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@userData").then((userData) => {
        cy.get(selectors.createAccountButton).click();
        cy.contains("Name").type(userData.existedUserName);
        cy.get(selectors.userNameTextField).type(userData.existedUserName);
        cy.get(selectors.passwordInputField).type(userData.passwordOfTesting);
        cy.get(selectors.confirmPasswordInputField).type(
          userData.passwordOfTesting
        );
        cy.get(selectors.userEmailTextField).type(userData.validEmail);
        cy.get(selectors.monthSelector).select(userData.selectedMonth);
        cy.get(selectors.daySelector).select(userData.selectedDay);
        cy.get(selectors.yearSelector).select(userData.selectedYear);
        cy.get(selectors.userNameExistedErrorMessage).should("be.visible");
        cy.get(selectors.nextButtonSignUp).should("be.disabled");
      });
    });
  });
  //passes
  it("testcase4:enter invalid user name longer than 50 character ", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@userData").then((userData) => {
        cy.get(selectors.createAccountButton).click();
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
  //passes
  it("testcase5: what is your name ? message", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@userData").then((userData) => {
        cy.get(selectors.createAccountButton).click();
        cy.get(selectors.nameInputField).type(userData.userName);
        cy.get(selectors.nameInputField).clear();
        cy.get(selectors.whatIsYourNameMessage).should(
          "have.text",
          "What's your  name?"
        );
        cy.get(selectors.nameInputField).type(userData.userName);
        cy.get(selectors.whatIsYourNameMessage).should("not.exist");
      });
    });
  });

  it("testcase20: What's your username?  message", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@userData").then((userData) => {
        cy.get(selectors.createAccountButton).click();
        cy.get(selectors.userNameTextField).type(userData.userName);
        cy.get(selectors.userNameTextField).clear();
        cy.get(selectors.whatIsUserNameMessage).should(
          "have.text",
          "What's your username?"
        );
        cy.get(selectors.userNameTextField).type(userData.userName);
        cy.get(selectors.whatIsUserNameMessage).should("not.exist");
      });
    });
  });

  // Bug: when fill confirm password before password
  it("testcase6: fill the confirmed password before password", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@userData").then((userData) => {
        cy.get(selectors.createAccountButton).click();
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
  it("testcase7: enter invalid email", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@userData").then((userData) => {
        cy.get(selectors.createAccountButton).click();
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
  //passes
  it("testcase8: enter another invalid email", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@userData").then((userData) => {
        cy.get(selectors.createAccountButton).click();
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
  it("testcase9: Fill Data and then press close", () => {
    cy.viewport(1920, 1080);
    cy.get("@selectors").then((selectors) => {
      cy.get("@userData").then((userData) => {
        cy.get(selectors.createAccountButton).click();
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
  it("testcase10: empty email and user name and then click on the button it will be clickable", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@userData").then((userData) => {
        cy.get(selectors.createAccountButton).click();
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
  //Bug: the next button is not clickable
  it("testcase11: Year Field doesn't work properly", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@userData").then((userData) => {
        cy.get(selectors.createAccountButton).click();
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

  // bug it gives nothing
  it("testcase12: sign up button", () => {
    cy.get(selectors.createAccountButton).click();
    cy.get("@selectors").then((selectors) => {
      cy.get(selectors.signUpWithGoogleButton).click();
      cy.url().should("not.eql", "http://18.212.103.71:5173/");
    });
  });
  //passes
  it("testcase13: Password do not match", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@userData").then((userData) => {
        cy.get(selectors.createAccountButton).click();
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
          userData.passwordDoNotMatch,
          { delay: 100 }
        );
        cy.get(selectors.userEmailTextField).type(userData.validEmail, {
          delay: 100,
        });
        cy.get(selectors.monthSelector).select(userData.selectedMonth);
        cy.get(selectors.daySelector).select(userData.selectedDay);
        cy.get(selectors.yearSelector).select(userData.selectedYear);
        cy.get(selectors.passwordDoNotMatchError).should("be.visible");
        cy.get(selectors.nextButtonSignUp).should("be.disabled");
      });
    });
  });
  //passes
  it("testcase14: Eye Password Icon Fuction", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get(selectors.createAccountButton).click();
      cy.get(selectors.passwordInputField).type(userData.passwordOfTesting, {
        delay: 100,
      });
      cy.get(selectors.passwordInputField).should(
        "have.attr",
        "type",
        "password"
      );
      cy.get(selectors.eyeShowPassword).click();
      cy.get(selectors.passwordInputField).should("have.attr", "type", "text");
    });
  });
  //passes
  it("testcase15: enter existed email", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@userData").then((userData) => {
        cy.get(selectors.createAccountButton).click();
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
  //passes
  it("testcase16: Empty Data", () => {
    cy.get(selectors.createAccountButton).click();
    cy.get("@selectors").then((selectors) => {
      cy.get(selectors.nextButtonSignUp).should("be.disabled");
    });
  });
  //bug: it gives error message
  it("testcase17: verification code check", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@userData").then((userData) => {
        cy.get(selectors.createAccountButton).click();
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
  //bug data validation is missed
  it("testcase18: Check on February month 29 days", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@userData").then((userData) => {
        cy.get(selectors.createAccountButton).click();
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
        //try to select wrong date like day 29 in feburary in 2021
        cy.get(selectors.userEmailTextField).type(userData.validEmail, {
          delay: 100,
        });
        cy.get(selectors.monthSelector).select("February");
        cy.get(selectors.daySelector).select("29");
        cy.get(selectors.yearSelector).select("2021");
        //assert the selected date was the wrong date or it was changed
        cy.get(selectors.daySelector).should("have.value", "");
      });
    });
  });
  //bug : name validation is missed
  it.only("testcase19: Check on Name validation", () => {
    cy.wait(30000);
    cy.get("@selectors").then((selectors) => {
      cy.get("@userData").then((userData) => {
        cy.get(selectors.createAccountButton).click();
        cy.get(selectors.nameInputField).type(userData.invalidName, {
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
        //try to select wrong date like day 29 in feburary in 2021
        cy.get(selectors.userEmailTextField).type(userData.validEmail, {
          delay: 100,
        });
        cy.get(selectors.monthSelector).select(userData.selectedMonth);
        cy.get(selectors.daySelector).select(userData.selectedDay);
        cy.get(selectors.yearSelector).select(userData.selectedYear);
        cy.wait(60000)
        cy.get(selectors.nextButtonSignUp).should("be.disabled");
      });
    });
  });
  it.only("testcase21: missing name length validation", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@userData").then((userData) => {
        cy.get(selectors.createAccountButton).click();
        cy.get(selectors.nameInputField).type(userData.invalidLengthName, {
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
        //try to select wrong date like day 29 in feburary in 2021
        cy.get(selectors.userEmailTextField).type(userData.validEmail, {
          delay: 100,
        });
        cy.get(selectors.monthSelector).select(userData.selectedMonth);
        cy.get(selectors.daySelector).select(userData.selectedDay);
        cy.get(selectors.yearSelector).select(userData.selectedYear);
        cy.wait(60000)
        cy.get(selectors.nextButtonSignUp).should("be.disabled");
      });
    });
  });

  it.only("testcase22: missing username length validation", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@userData").then((userData) => {
        cy.get(selectors.createAccountButton).click();
        cy.get(selectors.nameInputField).type(userData.userName, {
          delay: 100,
        });
        cy.get(selectors.userNameTextField).type(userData.invalidLengthUserName, {
          delay: 100,
        });
        cy.get(selectors.passwordInputField).type(userData.passwordOfTesting, {
          delay: 100,
        });
        cy.get(selectors.confirmPasswordInputField).type(
          userData.passwordOfTesting,
          { delay: 100 }
        );
        //try to select wrong date like day 29 in feburary in 2021
        cy.get(selectors.userEmailTextField).type(userData.validEmail, {
          delay: 100,
        });
        cy.get(selectors.monthSelector).select(userData.selectedMonth);
        cy.get(selectors.daySelector).select(userData.selectedDay);
        cy.get(selectors.yearSelector).select(userData.selectedYear);
        cy.wait(60000)
        cy.get(selectors.nextButtonSignUp).should("be.disabled");
      });
    });
  });

});
