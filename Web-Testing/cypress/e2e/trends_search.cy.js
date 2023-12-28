describe("Trends",()=>{
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.fixture("timeLineSelectors").as("selectors");
        cy.fixture("userData").as("userData");

        cy.visit("https://twitter-clone.onthewifi.com/");
        cy.get("@selectors").then((selectors) => {
          cy.get(selectors.signInButton).click({ force: true });
          cy.get(selectors.emailInputField).type("mennaabdelbaset208@gmail.com");
          cy.get(selectors.passwordInputField).type("12345678");
          cy.get(selectors.logInButton).click();
        });
      });
      it('insert double hashtag with characters', () => {
        cy.get("@selectors").then((selectors) => {
            cy.get("@timeLineData").then((Data) => {
              cy.intercept(
                "POST",
                "https://twitter-clone.onthewifi.com:2023/api/v1/tweets/add "
              ).as("addTweet");
      
              cy.get(selectors.postInputField).type("##trend");
              cy.get(selectors.postButton).click();      
              cy.wait("@addTweet").then((interception) => {
                const tweetId = interception.response.body.data.id;
                cy.get(`[data-testid=${tweetId}]`).should("be.visible");
                //check that text of blue color is just one hashtag and trend #trend
              });
            });
          });
      });
      it('insert invalid hashtag', () => {
        cy.get("@selectors").then((selectors) => {
            cy.get("@timeLineData").then((Data) => {
              cy.intercept(
                "POST",
                "https://twitter-clone.onthewifi.com:2023/api/v1/tweets/add "
              ).as("addTweet");
      
              cy.get(selectors.postInputField).type("##trend");
              cy.get(selectors.postButton).click();      
              cy.wait("@addTweet").then((interception) => {
                const tweetId = interception.response.body.data.id;
                cy.get(`[data-testid=${tweetId}]`).should("be.visible");
                //check that text of black color there is no blue color
              });
            });
          });
      });
    
    
})