describe("Time Line", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("http://127.0.0.1:5173/");
    cy.fixture("timeLineSelectors").as("selectors");
    cy.fixture("userData").as("userData");
    cy.fixture("timeLineData").as("timeLineData");
    cy.get("@selectors").then((selectors) => {
      cy.get(selectors.signInButton).click({ force: true });
      cy.get(selectors.emailInputField).type("menamohamed0207@gmail.com");
      cy.get(selectors.passwordInputField).type("12345678");
      cy.get(selectors.logInButton).click();
    });
  });

  //Passes
  it("1.Reload Page", () => {
    cy.reload();
    cy.url().should("contains", "/home");
  });
  //Passes
  it("2.Add tweet of text", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@timeLineData").then((Data) => {
        cy.get(selectors.postInputField).type(Data.postText);
        cy.get(selectors.postButton).click();
        cy.contains(Data.postText).should("be.visible");
      });
    });
  });

  //Post Button in the nav bar should be functional
  it("3.Post Button should be enabled", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get(selectors.postButtonTimeLine).click();
    });
  });
  //Faild -->BUG
  it("4.Validation of post input field", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@timeLineData").then((Data) => {
        cy.get(selectors.postInputField).click();
        cy.get(selectors.postInputField).type("{enter}");
        cy.get(selectors.postButton).should("be.disabled");
      });
    });
  });
  //Faild -->Invalid
  it("5.Add  4 images in a tweet", () => {
    cy.get("@selectors").then((selectors) => {
      let count = 0;
      cy.get(selectors.uploadImageSelector).attachFile("image1.jpg");
      cy.get(selectors.uploadImageSelector).attachFile("image2.jpg");
      cy.get(selectors.uploadImageSelector).attachFile("image3.jpg");
      cy.get(selectors.uploadImageSelector).attachFile("image4.jpg");
      cy.get(selectors.imagesUploaded).then(($elements) => {
        count = $elements.length;
        cy.log(`Number of elements: ${count}`);
        expect(count).to.equal(4);
      });
    });
  });
//Failed -->Invalid
  it('6.Add more than 4 images to insure it does not ', () => {
    cy.get("@selectors").then((selectors) => {
      
      cy.get(selectors.uploadImageSelector).attachFile(["image1.jpg","image2.jpg","image3.jpg","image4.jpg"]);
      cy.get(selectors.uploadImageSelector).should("be.disabled");
      cy.get(selectors.uploadImageSelector).attachFile("image5.jpg");
      cy.get(selectors.imagesUploaded).then(($elements) => {
        const count = $elements.length;
        cy.log(`Number of elements: ${count}`);
      });
      cy.get(selectors.imagesUploaded).should("have.length", 4);

    });
    
  });
  //Failed-->BUG
  it("7.add video", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get(selectors.uploadImageSelector).attachFile("Sample Video.mp4");
      cy.get("video").should("be.visible");
    });
  });
//Failed -->BUG
it('too long text for tweet', () => {
  cy.get("@selectors").then((selectors) => {
    cy.get("@timeLineData").then((Data) => {
      cy.get(selectors.postInputField).type(Data.tooLongText);
      cy.get(selectors.postButton).click();
      cy.contains(Data.tooLongText).should("be.visible");
    });
  });
  
});
//Passes
  it.only("8.Add a post(text&emoji) with an image ", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@timeLineData").then((Data) => {
        cy.get(selectors.postInputField).type(Data.postText);
        cy.get(selectors.AddEmojiButton).click();
        cy.get(selectors.emojiPicker).click();
        cy.get(selectors.uploadImageSelector).attachFile("image1.jpg");
        cy.get(selectors.postButton).click();
        cy.contains(Data.postText).should("be.visible");
      });
    });
  });
  //Passes
  it("9.clear an image", () => {
    cy.get("@selectors").then((selectors) => {
      
      cy.get(selectors.uploadImageSelector).attachFile("image1.jpg");
     cy.get(selectors.closeImageButton).click();
     cy.get(selectors.imagesUploaded).should("have.length", 0);
    });
  });

  it("10.like and unlike and like what is the count then", () => {});

  // i need to understand the repost first
  it("11.repost and then clear repost ", () => {});
  //post and then repost elpost
  it("12.post and then log out and then go the other email and make sure that the post that i have repost it appear", () => {});

  
});
