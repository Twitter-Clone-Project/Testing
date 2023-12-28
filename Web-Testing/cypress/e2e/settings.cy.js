describe("Settings", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.fixture("timeLineSelectors").as("selectors");
    cy.fixture("userData").as("userData");
    cy.fixture("timeLineData").as("timeLineData");
    cy.fixture("settings_Data").as("Data");
    cy.fixture("settingsSelectors").as("SettingsSelectors");
    cy.visit("https://twitter-clone.onthewifi.com/");
    cy.get("@selectors").then((selectors) => {
      cy.get(selectors.signInButton).click({ force: true });
      cy.get(selectors.emailInputField).type("mennaabdelbaset208@gmail.com");
      cy.get(selectors.passwordInputField).type("12345678");
      cy.get(selectors.logInButton).click();
      cy.contains("Settings").click({ force: true });
      cy.contains("Settings").click({ force: true });
    });
  });
//Passsed
  it.skip("Update Email with existed one", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@Data").then((Data) => {
        cy.contains("Account Info").click();
        cy.contains("Update Your Email").click();
        cy.get("[data-testid='update-email-btn']").click();
        cy.get("[data-testid='Password']").type("12345678", { delay: 100 });
        cy.get("[data-testid='Next']").click();
        cy.get("[data-testid='Email']").type("menamohamed0207@gmail.com"); //existed email
        cy.get("[data-testid='Next']").should("be.disabled");
      });
    });
  });
//Passed
  it.skip("Update Email with new one", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@Data").then((Data) => {
        cy.contains("Account Info").click();
        cy.contains("Update Your Email").click();
        cy.get("[data-testid='update-email-btn']").click();
        cy.get("[data-testid='Password']").type("12345678", { delay: 100 });
                cy.get("[data-testid='Next']").click();
        let codeTyped;
        cy.get("[data-testid='Email']").first().type("4113c8ce-5a59-4b30-879a-301408731187@mailslurp.com");
        cy.get("[data-testid='Next']").click();
        cy.wait(10000);
        cy.mailslurp().then((mailslurp) => {
          return mailslurp
            .waitForLatestEmail("4113c8ce-5a59-4b30-879a-301408731187")
            .then((email) => {
              const codeRegex = /Your OTP is ([0-9a-zA-Z]+)/;
              const match = codeRegex.exec(email.body);
              const code = match ? match[1] : null;
              codeTyped = code;
              cy.get("[data-testid='Code']").type(codeTyped);
              cy.get("[data-testid='Next']").should("be.enabled");
              cy.get("[data-testid='Next']").click();
              cy.get("div")
                .contains("Your email has been updated successfully")
                .should("be.visible");
              expect(code).to.not.be.null;
              cy.log(code);
            });
        });
      });
    });
  });
  //Passed

  it.skip("Update username", () => {
    cy.contains("Account Info").click();
    cy.contains("Update Your Username").click();
    cy.get("[data-testid='Username']").type("mennaabdelbaset");
    cy.get("[data-testid='save']").click();
    cy.get("div")
      .contains("Your Username has been updated successfully!")
      .should("be.visible");
  });
  //Passed
  it.skip("update password", () => {
    cy.get("@Data").then((Data) => {
      cy.contains("Change Password").click();
      cy.get("[data-testid='Current Password']").type(Data.passwordOld);
      cy.get("[data-testid='New Password']").type(Data.passwordNew);
      cy.get("[data-testid='Confirm New Password']").type(Data.passwordNew);
      cy.get("[data-testid='save']").click();
      cy.get("div")
        .contains("Your password has been updated successfully!")
        .should("be.visible");
    });
  });
});

describe("Check on Muted Users", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("https://twitter-clone.onthewifi.com/");
    cy.fixture("timeLineSelectors").as("selectors");
    cy.fixture("userData").as("userData");
    cy.fixture("timeLineData").as("timeLineData");
    cy.fixture("settings_Data").as("Data");
    cy.fixture("settingsSelectors").as("SettingsSelectors");
    cy.get("@selectors").then((selectors) => {
      cy.get(selectors.signInButton).click({ force: true });
      cy.get(selectors.emailInputField).type("mennaabdelbaset208@gmail.com");
      cy.get(selectors.passwordInputField).type("12345678");
      cy.get(selectors.logInButton).click();
    });
  });
  it.skip("Mute and then Check on Muted Users", () => {
    cy.get("@Data").then((Data) => {
      cy.get("@SettingsSelectors").then((selectors) => {
        cy.get(selectors.searchInputField).type(Data.searchedUser);
        // cy.get(`[data-testid='search-bar-goto${Data.searchedUser}']`).click();
        cy.get("[data-testid='search-result-11']").click();
        // cy.url().should(
        //   "contains",  //data-testid="search-bar-serachmenna abdelbaset"
  
        //     "/posts"
        // );
        cy.get("[data-testid='testing-UserActions-2']").click();
        cy.get("[data-testid='testing-UserActions-4']").click();
        cy.contains("Settings").click({ force: true });
        cy.contains("Settings").click({ force: true });
        cy.get("[data-testid='SettingsList_Link_3']").click();
        let mutedUsers = cy.get("[data-testid='muted-users-page']").children();
        // cy.get("[data-testid='muted-users-page']")
        //   .children()
        //   .eq(1)
        //   .should("have.text", Data.searchedUser+"Muted ");
      });
    });
  });
  it.skip("unMute and then check on Muted Users", () => {
    cy.get("@Data").then((Data) => {
      cy.get("@SettingsSelectors").then((selectors) => {
        cy.get(selectors.searchInputField).type(Data.searchedUser);
        // cy.get(`[data-testid='search-bar-goto${Data.searchedUser}']`).click();
        cy.get("[data-testid='search-result-11']").click();
        // cy.url().should(
         
        //     "/posts"
        // );
        cy.get("[data-testid='testing-UserActions-2']").click();
        cy.get("[data-testid='testing-UserActions-4']").click();
        cy.contains("Settings").click({ force: true });
        cy.contains("Settings").click({ force: true });
        cy.get("[data-testid='SettingsList_Link_3']").click();
        cy.get("[data-testid='muted-users-page']")
        .children()
        .eq(1)
        .should("not.contain", Data.searchedUser);
      });
    });
  });
});

describe("Check on Blocked Users", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("https://twitter-clone.onthewifi.com/");
    cy.fixture("timeLineSelectors").as("selectors");
    cy.fixture("userData").as("userData");
    cy.fixture("timeLineData").as("timeLineData");
    cy.fixture("settings_Data").as("Data");
    cy.fixture("settingsSelectors").as("settingsSelectors");

    cy.get("@selectors").then((selectors) => {
      cy.get(selectors.signInButton).click({ force: true });
      cy.get(selectors.emailInputField).type("mennaabdelbaset208@gmail.com");
      cy.get(selectors.passwordInputField).type("12345678");
      cy.get(selectors.logInButton).click();
    });
  });
  it("Block and then Check on Blocked Users", () => {
    cy.get("@Data").then((Data) => {
      cy.get("@settingsSelectors").then((selectors) => {
        cy.get(selectors.searchInputField).type(Data.searchedUser);
        // cy.get(`[data-testid='search-bar-goto${Data.searchedUser}']`).click();
        cy.get("[data-testid='search-result-11']").click();
        cy.url().should(
          "contains",
        
            "/posts"
        );
        cy.get("[data-testid='testing-UserActions-2']").click(); //menu button
        cy.get("[data-testid='testing-UserActions-6']").click(); //add block
        cy.contains("Settings").click({ force: true });
        cy.contains("Settings").click({ force: true });
        cy.get("[data-testid='SettingsList_Link_2']").click(); //Blocked Users
        let mutedUsers = cy
          .get("[data-testid='blocked-users-page']")
          .children().should("have.length.above",0)
          cy.contains("Menna Abdelbaset").should("exist");

        // cy.get("[data-testid='blocked-users-page']")
        // .children()
        // .eq(1)
        // .should("contains", Data.searchedUser);
      });
    });
  });
  it("unBlock and then check on Blocked Users", () => {
    cy.get("@Data").then((Data) => {
      cy.get("@settingsSelectors").then((selectors) => {
        cy.get(selectors.searchInputField).type(Data.searchedUser);
        // cy.get(`[data-testid='search-bar-goto${Data.searchedUser}']`).click();
        cy.get("[data-testid='search-result-11']").click();
        cy.url().should(
          "contains",
          "https://twitter-clone.onthewifi.com/app/" +
            Data.searchedUser +
            "/posts"
        );
        cy.get("[data-testid='Blocked']").click();
        cy.contains("Settings").click({ force: true });
        cy.contains("Settings").click({ force: true });
        cy.get("[data-testid='SettingsList_Link_2']").click(); //Blocked Users
       cy.contains("Menna Abdelbaset").should("not.exist");
      });
    });
  });
});
