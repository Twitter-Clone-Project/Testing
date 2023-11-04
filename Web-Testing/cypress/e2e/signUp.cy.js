describe("signUp", () => {
  beforeEach(() => {
    cy.visit("https://twitter.com/");
    cy.fixture("signUpSelectors").as("selectors");
    cy.fixture("userData").as("userData");
    cy.get("@selectors").then((selectors) => {
      cy.get(selectors.createAccountButton).click();
      cy.url().should("contains", "/flow/signup");
    });
  });

  //1.check if it will say that the email is already exist or not
  it("Check email already exists", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get(selectors.userNameTextField).focus();
      cy.get("@userData").then((userData) => {
        cy.get(selectors.userNameTextField).type(userData.userName);
        cy.get(selectors.userEmailTextField)
          .type(userData.existingEmail)
          .then(() => {
            cy.get(selectors.alreadyExistEmailMessage).should(
              "have.text",
              "Email has already been taken."
            );
          });
      });
    });
  });

  //2.enter invalid email
  it("enter invalid email", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@userData").then((userData) => {
        cy.get(selectors.userNameTextField).type(userData.userName);
        cy.get(selectors.userEmailTextField).type(userData.invalidEmail);
        cy.get(selectors.alreadyExistEmailMessage).should(
          "have.text",
          "Please enter a valid email."
        );
      });
    });
  });

  //3.enter invalid user name 60 character name the characters over 50 is turncated
  it("enter invalid user name", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@userData").then((userData) => {
        cy.get(selectors.userNameTextField).type(userData.invalidUserName);
        cy.get(selectors.userEmailTextField).type(userData.invalidEmail);
        cy.get(selectors.userNameTextField)
          .invoke("val")
          .then((text) => {
            cy.log(text);
            //text should be less than or equal to 50
            expect(text.length).to.be.lessThan(51);
          });
      });
    });
  });

  //4.Fill data and then  press close and then press create account is the data will remain ???
  it("Fill Data and then press close", () => {
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

  //5.Press create account button and then press Next and fill the data and then go back is the data will remain the same
  it("Fill the data and then go back and the data will remain", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@userData").then((userData) => {
        cy.get(selectors.userNameTextField).type(userData.userName);
        cy.get(selectors.userEmailTextField).type(userData.validEmail);
        cy.get(selectors.monthSelector).select(userData.selectedMonth);
        cy.get(selectors.daySelector).select(userData.selectedDay);
        cy.get(selectors.yearSelector).select(userData.selectedYear);
        cy.get(selectors.nextButtonStep1).contains("Next").click();
        cy.get(selectors.nextButtonStep1)
          .contains("Next")
          .click()
          .then(() => {
            cy.wait(300);
            cy.get(selectors.checkButton).uncheck();
            cy.get(selectors.checkButton).check();
            cy.get(selectors.nextButtonStep2).click();
            cy.get(selectors.goBackArrow).click();
            cy.get(selectors.goBackArrow).click();
            cy.get(selectors.userNameTextField)
              .invoke("val")
              .then((text) => {
                cy.log(text);
                //expect the text to be the same as the original
                expect(text).to.equal(userData.userName);
              });
          });
      });
    });
  });

  //6.enter invalid email and invalid user name is the button will be clickable
  it("enter invalid email and invalid user name", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@userData").then((userData) => {
        cy.get(selectors.userNameTextField).type(userData.invalidUserName);
        cy.get(selectors.userEmailTextField).type(userData.invalidEmail);
        cy.get(selectors.monthSelector).select(userData.selectedMonth);
        cy.get(selectors.daySelector).select(userData.selectedDay);
        cy.get(selectors.yearSelector).select(userData.selectedYear);
        //i want to get the element number 20 in this list
        cy.get(selectors.nextButtonStep1)
          .contains("Next")
          .click()
          .then(() => {
            cy.get(selectors.stepNumber)
              .contains("Step 1 of 5")
              .should("be.visible");
          });
      });
    });
  });

  //7.empty email and user name and then click on the button it will be clickable
  it("empty email and user name and then click on the button it will be clickable", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@userData").then((userData) => {
        cy.get(selectors.userNameTextField).type(userData.userName);
        cy.get(selectors.userEmailTextField).type(userData.validEmail);
        cy.get(selectors.monthSelector).select(userData.selectedMonth);
        cy.get(selectors.daySelector).select(userData.selectedDay);
        cy.get(selectors.yearSelector).select(userData.selectedYear);

        cy.get(selectors.userNameTextField).clear();
        cy.get(selectors.userEmailTextField).clear();

        cy.get(selectors.stepNumber)
          .contains("Step 1 of 5")
          .should("have.text", "Step 1 of 5");
      });
    });
  });
  //8.what is your name ? message when focuse on the element and then blur without write any thing
  it("what is your name ? message", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@userData").then((userData) => {
        cy.get(selectors.userNameTextField).type(userData.userName);
        cy.get(selectors.userNameTextField).clear();
        cy.get(selectors.whatIsYourNameMessage)
          .contains("What’s your name?")
          .should("have.text", "What’s your name?");
      });
    });
  });

  //9.in the step 3 when editing it will go back to step 1 we can check on the step number
  it("Data reaches step3 as expected", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@userData").then((userData) => {
        cy.get(selectors.userNameTextField).type(userData.userName, {
          delay: 100,
        });
        cy.get(selectors.userEmailTextField).type(userData.validEmail, {
          delay: 100,
        });
        cy.get(selectors.monthSelector).select(userData.selectedMonth); //Feburary
        cy.get(selectors.daySelector).select(userData.selectedDay); //7
        cy.get(selectors.daySelector).focus();
        cy.get(selectors.daySelector).blur();
        cy.get(selectors.yearSelector).select(userData.selectedYear); //2002
        cy.wait(500);
        cy.get(selectors.nextButtonStep1)
          .contains("Next")
          .click()
          .then(() => {
            cy.wait(200);
            cy.get(selectors.nextButtonStep2).click();
            cy.get(selectors.nameTextFieldStep3)
              .invoke("val")
              .then((text) => {
                cy.log(text);
                //expect the text to be the same as the original
                expect(text).to.equal(userData.userName);
              });
            cy.get(selectors.emailTextFieldStep3)
              .invoke("val")
              .then((text) => {
                cy.log(text);
                //expect the text to be the same as the original
                expect(text).to.equal(userData.validEmail);
              });
            cy.get(selectors.birthDateTextFieldStep3)
              .invoke("val")
              .then((text) => {
                cy.log(text);
                //expect the text to be the same as the original  Feb 7, 2002
                let Month =
                  userData.selectedMonth[0] +
                  userData.selectedMonth[1] +
                  userData.selectedMonth[2];
                cy.log(Month);
                expect(text).to.equal(
                  Month +
                    " " +
                    userData.selectedDay +
                    ", " +
                    userData.selectedYear
                );
              });
          });

        cy.get(selectors.nameTextFieldStep3).focus();
        cy.wait(100);
        cy.get(selectors.nameTextFieldStep3).click();

        cy.get(selectors.stepNumber)
          .contains("Step 1 of 5")
          .should("have.text", "Step 1 of 5");
      });
    });
  });

  //10.Valid Case
  it.only("make sure that the code is sent", () => {
    cy.get("@selectors").then((selectors) => {
      cy.readFile("cypress/fixtures/userData.json").then((userData) => {
        cy.get(selectors.userNameTextField).type(userData.userName, {
          delay: 100,
        });
        cy.get(selectors.userEmailTextField).type(userData.validEmail, {
          delay: 100,
        });
        cy.get(selectors.monthSelector).select(userData.selectedMonth); //Feburary
        cy.get(selectors.daySelector).select(userData.selectedDay); //7
        cy.get(selectors.daySelector).focus();
        cy.get(selectors.daySelector).blur();
        cy.get(selectors.yearSelector).select(userData.selectedYear); //2002
        cy.wait(500);
        cy.get(selectors.nextButtonStep1)
          .contains("Next")
          .click()
          .then(() => {
            cy.wait(200);
            cy.get(selectors.nextButtonStep2).click();
            cy.get(selectors.nameTextFieldStep3)
              .invoke("val")
              .then((text) => {
                cy.log(text);
                //expect the text to be the same as the original
                expect(text).to.equal(userData.userName);
              });
            cy.get(selectors.emailTextFieldStep3)
              .invoke("val")
              .then((text) => {
                cy.log(text);
                //expect the text to be the same as the original
                expect(text).to.equal(userData.validEmail);
              });
            cy.get(selectors.birthDateTextFieldStep3)
              .invoke("val")
              .then((text) => {
                cy.log(text);
                //expect the text to be the same as the original  Feb 7, 2002
                let Month =
                  userData.selectedMonth[0] +
                  userData.selectedMonth[1] +
                  userData.selectedMonth[2];
                cy.log(Month);
                expect(text).to.equal(
                  Month +
                    " " +
                    userData.selectedDay +
                    ", " +
                    userData.selectedYear
                );
              });
          });
        cy.get(selectors.signUpButtonStep3).click();
        cy.pause();
        cy.get(selectors.nextButtonVerificationCode).click();
        cy.get(selectors.passwordInputField).type(
          userData.twitterInvalidPassword,
          { delay: 100 }
        );
        cy.get(selectors.shortPasswordMessage).should(
          "have.text",
          "Your password needs to be at least 8 characters. Please enter a longer one."
        );

        cy.get(selectors.passwordInputField)
          .invoke("val")
          .then((text) => {
            cy.log(text);
            expect(text).to.equal(userData.twitterInvalidPassword);
          });
        cy.get(selectors.passwordInputField).clear();
        cy.get(selectors.passwordInputField).type(
          userData.twitterValidPassword,
          { delay: 100 }
        );
        cy.contains("Next").click();
        cy.wait(100);
        cy.contains("Skip for now").click();
        cy.wait(100);
        cy.contains("Skip for now").click();
        cy.wait(100);
        cy.get("Skip for now").eq(1).click();
        cy.wait(100);
        cy.contains("Next").click();
        cy.wait(100);
        cy.get(selectors.entertainmentTopic).click();

        // cy.get(selectors.nextButtonTopics).should("be.disabled");
        cy.get(selectors.technoTopic).click();
        cy.wait(100);
        cy.get(selectors.animationTopic).click();
        // cy.get(selectors.nextButtonTopics).should("be.enabled");
        cy.contains("Next").click();
        cy.wait(100);
        cy.contains("Next").click();
        cy.wait(100);
        cy.contains("Next").should("be.disabled");
        cy.get(selectors.followOne);
        cy.contains("Next").should("be.enabled");
        cy.contains("Next").click();
        cy.url().should("contain", "https://twitter.com/home");
      });
    });
  });
});
