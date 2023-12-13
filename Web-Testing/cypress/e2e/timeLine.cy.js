describe("Time Line", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("https://twitter-clone.onthewifi.com/");
    cy.fixture("timeLineSelectors").as("selectors");
    cy.fixture("userData").as("userData");
    cy.fixture("timeLineData").as("timeLineData");
    cy.get("@selectors").then((selectors) => {
      cy.get(selectors.signInButton).click({ force: true });
      cy.get(selectors.emailInputField).type("mennaabdelbaset208@gmail.com");
      cy.get(selectors.passwordInputField).type("12345678");
      cy.get(selectors.logInButton).click();
    });
  });

  //Passes
  it("1.Reload Page", () => {
    cy.wait(2000);
    cy.reload();
    cy.url().should("contains", "/home");
  });

  //==============================================================add tweet
  //Passes
  it("Add tweet of text", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@timeLineData").then((Data) => {
        cy.get(selectors.postInputField).type(Data.postText);
        cy.get(selectors.postButton).click();
        cy.get(selectors.postInputField).should("not.have.text", Data.postText);
        cy.contains(Data.postText).should("be.visible");
      });
    });
  });
  //Post Button in the nav bar should be functional
  it("Post Button should be enabled", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get(selectors.postButtonTimeLine).click();
    });
  });
  //Faild -->BUG--->FIXED
  it("Validation of post input field", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@timeLineData").then((Data) => {
        cy.get(selectors.postInputField).click();
        cy.get(selectors.postInputField).type("{enter}");
        cy.get(selectors.postButton).should("be.disabled");
      });
    });
  });
  //Failed-->BUG-->FIXED
  it(" profile icon", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get(selectors.profileIcon).click({ force: true });
      cy.url().should("contain", "posts");
    });
  });
  //Failed-->BUG
  it("check on the time created the tweet", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@timeLineData").then((Data) => {
        cy.get(selectors.postInputField).type(Data.postText);
        cy.get(selectors.postButton).click();
        cy.get(selectors.postInputField).should("not.have.text", Data.postText);
        cy.wait(60000);
        cy.get("time").first().should("have.text", "1m");
      });
    });
  });
  //Failed-->BUG-->Passed
  it("Emotion Search", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@timeLineData").then((Data) => {
        cy.get(selectors.AddEmojiButton).click();
        cy.get(selectors.emojiPicker).click(150, 70);
        cy.get(selectors.emojiPicker).should("be.visible");
      });
    });
  });
  //Failed-->BUG--->Passed
  it("Emotion Category Choose", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@timeLineData").then((Data) => {
        cy.get(selectors.AddEmojiButton).click();
        cy.get(selectors.emojiPicker).click(150, 20);
        cy.get(selectors.emojiPicker).should("be.visible");
      });
    });
  });
  //Passed
  it("Add arabic text to post ", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@timeLineData").then((Data) => {
        cy.get(selectors.postInputField).click();
        cy.get(selectors.postInputField).type(Data.arabicData);
        cy.get(selectors.postInputField)
          .children()
          .first()
          .children()
          .first()
          .children()
          .first()
          .children()
          .first()
          .children()
          .first()
          .should("have.class", "public-DraftStyleDefault-rtl");
      });
    });
  });

  it("Text post overflow ", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@timeLineData").then((Data) => {
        cy.get(selectors.postInputField).click();
        cy.get(selectors.postInputField).type(Data.longValidText);
        cy.get(selectors.postButton).click();
        //line =24
        cy.get(selectors.captionTweet)
          .eq(1)
          .invoke("height")
          .should("be.greaterThan", 40); // Adjust the threshold as needed
      });
    });
  });

  //==============================================================add media
  it("Add  4 images in a tweet", () => {
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
  it("Add more than 4 images to insure it does not ", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get(selectors.uploadImageSelector).attachFile([
        "image1.jpg",
        "image2.jpg",
        "image3.jpg",
        "image4.jpg",
      ]);
      cy.get(selectors.uploadImageSelector).should("be.disabled");
      cy.get(selectors.imagesUploaded).then(($elements) => {
        const count = $elements.length;
        cy.log(`Number of elements: ${count}`);
      });
      cy.get(selectors.imagesUploaded).should("have.length", 4);
    });
  });

  //Failed -->BUG
  it("too long text for tweet", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@timeLineData").then((Data) => {
        cy.get(selectors.postInputField).type(Data.tooLongText);
        cy.get(selectors.postContent).should("have.text", Data.longValidText);
        cy.get(selectors.postButton).click();
      });
    });
  });
  //Passes
  it("Add a post(text&emoji) with an image ", () => {
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
  it("clear an image", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get(selectors.uploadImageSelector).attachFile("image1.jpg");
      cy.get(selectors.closeImageButton).click();
      cy.get(selectors.imagesUploaded).should("have.length", 0);
    });
  });
  it("add video", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get(selectors.uploadImageSelector).attachFile("Sample Video.mp4");
      cy.get("video").should("be.visible");
    });
  });
  //==============================================================add reply
  //Failed -->BUG
  it("Add reply", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@timeLineData").then((Data) => {
        cy.get(selectors.tweet).click();
        cy.get(selectors.replyInputField).type(Data.replyText);
        cy.get(selectors.AddReplyButton).click();
        cy.contains(Data.postText).should("be.visible");
      });
    });
  });
  //Failed -->BUG-->FIXED
  it("add Reply Name does not appear", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@timeLineData").then((Data) => {
        cy.get(selectors.tweet).click();
        cy.get(selectors.replyInputField).type(Data.replyText);
        cy.get(selectors.AddReplyButton).click();
        cy.get(selectors.userInfoReply)
          .eq(1)
          .children()
          .first()
          .should("have.text", Data.name);
        cy.get(selectors.userInfoReply)
          .eq(2)
          .children()
          .first()
          .should("have.text", Data.name);
      });
    });
  });

  //Failed-->Invalid-->FIXED

  it("Writing Arabic in reply input field", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@timeLineData").then((Data) => {
        cy.get(selectors.tweet).click();
        cy.get(selectors.replyInputField).type(Data.arabicData);
        cy.get(selectors.replyInputField).should("have.attr", "dir", "auto");
      });
    });
  });
  //Failed-->BUG--->Fixed
  it.only("Text reply overflow ", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@timeLineData").then((Data) => {
        cy.get(selectors.tweet).click();

        cy.get(selectors.replyInputField).click();
        cy.get(selectors.replyInputField).type(Data.longValidText);
        cy.get(selectors.AddReplyButton).click();
        //line =24
        cy.get(selectors.captionTweet)
          .eq(1)
          .should("have.text", Data.longValidText);
      });
    });
  });

  it("Go to user profile ", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@timeLineData").then((Data) => {
        cy.get(selectors.tweet).click();

        cy.get(selectors.nameTweetPage).click();
        cy.url().should("include", Data.userName);
      });
    });
  });

  //faild-->BUG
  it("username of the tweet owner", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@timeLineData").then((Data) => {
        cy.get(selectors.tweet).click();
        cy.get(selectors.userNameTweetPage)
          .first()
          .should("have.text", Data.userName);
      });
    });
  });
  //it passed but not always working
  it.only("DropDown List of reply", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@timeLineData").then((Data) => {
        cy.get(selectors.tweet).click();
        cy.get(selectors.menueReplyDeleteLabel).click();
        cy.get(selectors.deleteButtonDropDown).should("be.visible");
      });
    });
  });
  //==============================================================add like and remove
  //passes
  it("remove Like", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@timeLineData").then((Data) => {
        cy.get(selectors.likeButton).first().click();
        cy.get(selectors.likeButton)
          .first()
          .children()
          .first()
          .should("have.attr", "class")
          .and("include", "text-dark-gray");
      });
    });
  });

  it("Add Like", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@timeLineData").then((Data) => {
        cy.wait(5000);
        cy.get(selectors.likeButton).first().click();
        cy.get(selectors.likeButton)
          .first()
          .children()
          .first()
          .should("have.attr", "class")
          .and("not.include", "text-dark-gray");
      });
    });
  });
  //==============================================================add repost
  it("Add repost", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@timeLineData").then((Data) => {
        cy.get(selectors.repostButton).first().click();
        cy.get(selectors.numOfReposts).should("have.text", "1");
      });
    });
  });
  //Failded-->BUG

  it("Add tweet and then repost it and check on it in the posts of the profile", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@timeLineData").then((Data) => {
        cy.get(selectors.postInputField).type(Data.repostText);
        cy.get(selectors.postButton).click();
        cy.get(selectors.postInputField).should(
          "not.have.text",
          Data.repostText
        );
        cy.contains(Data.repostText).should("be.visible");
        cy.get(selectors.repostButton).first().click();
        cy.wait(2000);
        cy.get(selectors.profileButton).click();
        cy.get(":nth-child(1) > .rightColumn > .retweeted-info").should(
          "be.visible"
        );
        cy.get(":nth-child(2) > .rightColumn > .retweeted-info").should(
          "be.not.visible"
        );
      });
    });
  });

  it.only("Add tweet and then retweet it and then remove the retweet from tweet ", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@timeLineData").then((Data) => {
        cy.get(selectors.postInputField).type(Data.repostText);
        cy.get(selectors.postButton).click();
        cy.get(selectors.repostButton).first().click();
        cy.wait(2000);
        cy.get(selectors.profileButton).click();
      });
    });
  });

  //==============================================================tweet its self
  //Failed-->BUG-->FIXED
  it("Reply Icon ", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get(selectors.tweet).click();
      cy.url().should("contain", "tweet");
    });
  });
  it("add tweet and then delete it and check on it in the posts ", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@timeLineData").then((Data) => {
        cy.get(selectors.postInputField).type(Data.deleteText);
        cy.get(selectors.postButton).click();
        cy.contains(Data.postText).should("be.visible");
        cy.wait(5000);
        cy.get(selectors.dropDownButton).click();
        cy.get(selectors.deleteOption).click();
        cy.get(selectors.profileButton).click();
        cy.get(selectors.profilePosts)
          .invoke("text")
          .then((text) => {
            expect(text).not.to.include(Data.deleteText);
          });
      });
    });
  });
  //Failed-->BUG--->Passed

  it("the dropdown list ", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@timeLineData").then((Data) => {
        cy.get(selectors.dropDownButton).click();
        cy.wait(1000);
        cy.wait(1000);
        cy.get(selectors.secondDropDownButton).click();
        cy.wait(1000);
        cy.get(selectors.secondDropDown).should("be.visible");
      });
    });
  });

  it("User name in tweet", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@timeLineData").then((Data) => {
        cy.get(selectors.userNameTweet).click();
        cy.url().should("contain", "posts");
      });
    });
  });

  // it.only('User Image in tweet', () => {
  //   cy.viewport("iphone-x")
  //   cy.get("@selectors").then((selectors) => {
  //     cy.get("@timeLineData").then((Data) => {
  //       cy.get("main").scrollIntoView({ duration: 3000 });
  //     });
  //   });
  // });

  //=====================================================General testcases
  it("Log out testcase", () => {
    cy.contains("Log Out").click();
    cy.url().should("contain", "https://twitter-clone.onthewifi.com/");
  });
});
