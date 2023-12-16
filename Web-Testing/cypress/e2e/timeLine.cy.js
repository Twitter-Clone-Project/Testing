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
        cy.intercept(
          "POST",
          "https://twitter-clone.onthewifi.com:2023/api/v1/tweets/add "
        ).as("addTweet");

        cy.get(selectors.postInputField).type(Data.postText);
        cy.get(selectors.postButton).click();
        cy.get(selectors.postInputField).should("not.have.text", Data.postText);

        cy.wait("@addTweet").then((interception) => {
          const tweetId = interception.response.body.data.id;
          cy.get(`[data-testid=${tweetId}]`).should("be.visible");
        });
      });
    });
  });
  //Post Button in the nav bar should be functional
  it("Post Button should be enabled", () => {
    cy.get("@selectors").then((selectors) => {
      cy.intercept(
        "POST",
        "https://twitter-clone.onthewifi.com:2023/api/v1/tweets/add "
      ).as("addTweet");

      cy.get(selectors.postButtonTimeLine).click();
      cy.get(selectors.postInputField).type(Data.postText);
      cy.get(selectors.postButtonCard).click();
      cy.wait("@addTweet").then((interception) => {
        const tweetId = interception.response.body.data.id;
        cy.get(`[data-testid=${tweetId}]`).should("be.visible");
      });
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
        cy.get(selectors.postInputField)
          .invoke("val")
          .then((text) => {
            expect(text.length).to.be.lessThan(60);
          });
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
        cy.contains(Data.replyText).should("be.visible");
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
  it("Text reply overflow ", () => {
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
    //I have tried the drop down but the dark mode no and it is bug.  //  dark mode but dropdown is light ?
    cy.get("@selectors").then((selectors) => {
      cy.get("@timeLineData").then((Data) => {
        cy.get(selectors.tweet).click();
        cy.get(selectors.menueReplyDeleteLabel).click();
        cy.get(selectors.deleteButtonDropDown).should("be.visible");
        cy.get(selectors.deleteButtonDropDown).should("have.class","dark:hover:bg-[#080808]");
      });
    });
  });
  //==============================================================add like and remove
  //passes
  it("remove Like", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@timeLineData").then((Data) => {
        cy.intercept(
          "POST",
          "https://twitter-clone.onthewifi.com:2023/api/v1/tweets/add "
        ).as("addTweet");

        cy.get(selectors.postInputField).type(Data.postText);
        cy.get(selectors.postButton).click();
        cy.get(selectors.postInputField).should("not.have.text", Data.postText);

        cy.wait("@addTweet").then((interception) => {
          const tweetId = interception.response.body.data.id;
          cy.intercept(
            "POST",
            `https://twitter-clone.onthewifi.com:2023/api/v1/tweets/${tweetId}/addLike`
          ).as("addLike");

          cy.get(`[data-testid=${tweetId}like]`).click();

          cy.wait("@addLike").then(() => {
            cy.get(`[data-testid=${tweetId}like]`).click();

            cy.get(selectors.likeButton)
              .first()
              .children()
              .first()
              .should("have.attr", "class")
              .and("include", "text-dark-gray");
          });
        });
      });
    });
  });

  it("Add Like", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@timeLineData").then((Data) => {
        cy.intercept(
          "GET",
          "https://twitter-clone.onthewifi.com:2023/api/v1//users/1/timeline"
        ).as("timeline");

        cy.intercept(
          "POST",
          "https://twitter-clone.onthewifi.com:2023/api/v1/tweets/add "
        ).as("addTweet");

        cy.get(selectors.postInputField).type(Data.postText);
        cy.get(selectors.postButton).click();
        cy.get(selectors.postInputField).should("not.have.text", Data.postText);

        cy.wait("@addTweet").then((interception) => {
          const tweetId = interception.response.body.data.id;
          cy.intercept(
            "POST",
            `https://twitter-clone.onthewifi.com:2023/api/v1/tweets/${tweetId}/addLike`
          ).as("addLike");
          cy.get(`[data-testid=${tweetId}like]`).click();
          cy.get(`[data-testid=${tweetId}like]`)
            .first()
            .children()
            .first()
            .should("have.attr", "class")
            .and("not.include", "text-dark-gray");
        });
      });
    });
  });

  //Failed -->BUG

  it("Add like to a retweet and see if the original tweet got affected ", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@timeLineData").then((Data) => {
        cy.intercept(
          "POST",
          "https://twitter-clone.onthewifi.com:2023/api/v1/tweets/add "
        ).as("addTweet");
        let username = Data.userName;
        cy.intercept(
          "GET",
          `https://twitter-clone.onthewifi.com:2023/api/v1/profile/${username}`
        ).as("profile");

        cy.get(selectors.postInputField).type(Data.postText);
        cy.get(selectors.postButton).click();
        cy.get(selectors.postInputField).should("not.have.text", Data.postText);

        cy.wait("@addTweet").then((interception) => {
          const tweetId = interception.response.body.data.id;
          cy.get(`[data-testid=${tweetId}repost]`).click();
          cy.wait(2000);
          cy.get(selectors.profileButton).click();
          cy.wait("@profile").then(() => {
            cy.get(`[data-testid=${tweetId}like]`).first().click();
            cy.wait(5000);
            cy.get(`[data-testid=${tweetId}like]`)
              .eq(1)
              .should("have.attr", "class")
              .and("not.include", "text-dark-gray");
          });
        });
      });
    });
  });
  //==============================================================add repost
  it("Add repost", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@timeLineData").then((Data) => {
        cy.get(selectors.postInputField).type(Data.repostText);
        cy.get(selectors.postButton).click();
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
  //Failed-->BUG
  it("Add tweet and then retweet it and then remove the retweet from tweet ", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@timeLineData").then((Data) => {
        cy.intercept(
          "POST",
          "https://twitter-clone.onthewifi.com:2023/api/v1/tweets/add "
        ).as("addTweet");

        cy.get(selectors.postInputField).type(Data.repostText);
        cy.get(selectors.postButton).click();

        cy.wait("@addTweet").then((interception) => {
          const tweetId = interception.response.body.data.id;
          cy.get(`[data-testid=${tweetId}repost]`).click();
          cy.wait(2000);
          cy.get(selectors.profileButton).click();

          cy.get(`[data-testid=${tweetId}repost]`).first().click();
          cy.get(`[data-testid=${tweetId}repost]`).eq(1).click();
          cy.get("div")
            .contains(" Error in deleting retweet")
            .should("not.be.visible");
        });
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
  //passed
  it("add tweet and then delete it and check on it in the posts ", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@timeLineData").then((Data) => {
        cy.intercept(
          "POST",
          "https://twitter-clone.onthewifi.com:2023/api/v1/tweets/add "
        ).as("addTweet");

        cy.get(selectors.postInputField).type(Data.deleteText);
        cy.get(selectors.postButton).click();
        cy.contains(Data.postText).should("be.visible");

        cy.wait("@addTweet").then((interception) => {
          const tweetId = interception.response.body.data.id;
          cy.get(`[data-testid=${tweetId}menubtn]`).click();
          cy.wait(5000);
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
  });
  //Failed-->BUG--->Passed

  it("the dropdown list ", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@timeLineData").then((Data) => {
        cy.intercept(
          "POST",
          "https://twitter-clone.onthewifi.com:2023/api/v1/tweets/add "
        ).as("addTweet");
        cy.get(selectors.postInputField).type(Data.deleteText);
        cy.get(selectors.postButton).click();
        cy.contains(Data.postText).should("be.visible");

        cy.get(selectors.postInputField).type(Data.deleteText);
        cy.get(selectors.postButton).click();
        cy.contains(Data.postText).should("be.visible");

        cy.wait("@addTweet").then((interception) => {
          const tweetId = parseInt(interception.response.body.data.id, 10);
          cy.get(`[data-testid=${tweetId}menubtn]`).click();
          let nextId = tweetId + 1;
          cy.get(`[data-testid=${nextId}menubtn]`).click();
          cy.get(`[data-testid=${nextId}menu]`).should("be.visible");
        });
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

  //=====================================================General testcases
  //Passed
  it("Log out testcase", () => {
    cy.intercept(
      "GET",
      "https://twitter-clone.onthewifi.com:2023/api/v1//users/1/timeline"
    ).as("timeline");

    cy.get("@selectors").then((selectors) => {
      cy.get("@timeLineData").then((Data) => {
        cy.wait("@timeline").then(() => {
          cy.get(selectors.userButton).click();
          cy.get("[data-testid='nav-logout-btn']").click();
          cy.get(selectors.logOutButton).click();
          cy.url().should("contain", "https://twitter-clone.onthewifi.com/");
        });
      });
    });
  });
  it.only("Repost-->delete repost -->like", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@timeLineData").then((Data) => {
        cy.intercept(
          "POST",
          "https://twitter-clone.onthewifi.com:2023/api/v1/tweets/add "
        ).as("addTweet");
        cy.get(selectors.postInputField).type(Data.deleteText);
        cy.get(selectors.postButton).click();
        cy.contains(Data.postText).should("be.visible");

        cy.wait("@addTweet").then((interception) => {
          const tweetId = parseInt(interception.response.body.data.id, 10);
          cy.get(`[data-testid=${tweetId}repost]`).click();
          cy.wait(2000);
          cy.get(`[data-testid=${tweetId}repost]`).click();
          cy.get(`[data-testid=${tweetId}like]`).click();

          cy.get(`[data-testid=${tweetId}like]`)
            .should("have.attr", "class")
            .and("not.include", "text-dark-gray");
        });
      });
    });
  });
  //=====================================================List of likers
  //Failed -->BUG
  it.only("List of likers", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@timeLineData").then((Data) => {
        cy.get(selectors.tweet).click();
        cy.url().then((url) => {
          const match = url.match(/\/(\d+)$/);
          if (match) {
            const number = match[1];
            cy.log(number);
            cy.intercept(
              "GET",
              `https://twitter-clone.onthewifi.com:2023/api/v1/tweets/${number}/likers`
            ).as("likers");

            cy.get(selectors.listOfLikers).click();
            cy.url().should("contain", "likes");
            cy.wait("@likers").then((interception) => {
              let data = interception.response.body.data[0];
              let firstLiker;
              if (data != null) {
                firstLiker = data.name;
                cy.log(firstLiker);
                cy.get(selectors.firstRetweeterOrLiker)
                  .invoke("text")
                  .then((text) => {
                    expect(text).to.equal(firstLiker);
                  });
              }
            });
          }
        });
      });
    });
  });

  //Failed -->BUG

  it("List of retweeters", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@timeLineData").then((Data) => {
        cy.get(selectors.tweet).click();
        cy.url().then((url) => {
          const match = url.match(/\/(\d+)$/);
          if (match) {
            const number = match[1];
            cy.log(number);
            cy.intercept(
              "GET",
              `https://twitter-clone.onthewifi.com:2023/api/v1/tweets/${number}/retweeters`
            ).as("retweeters");

            cy.get(selectors.listOfRetweeters).click();
            cy.url().should("contain", "retweets");
            cy.wait("@retweeters").then((interception) => {
              let data = interception.response.body.data[0];
              let firstRetweeter;
              if (data != null) {
                firstRetweeter = interception.response.body.data[0].name;
                cy.log(firstRetweeter);
                cy.get(selectors.firstRetweeterOrLiker)
                  .invoke("text")
                  .then((text) => {
                    expect(text).to.equal(firstRetweeter);
                  });
              } else firstRetweeter = null;
            });
          }
        });
      });
    });
  });
});
describe("Time Line smaller view port", () => {
  beforeEach(() => {
    cy.viewport("iphone-8");
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

  it.only("Add emoji in mobile view port", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get(selectors.AddEmojiButton).click();
      cy.get("[title='Frequently used']").should("be.visible");
    });
  });
  it.only("delete post from mobile view port", () => {
    cy.get("@selectors").then((selectors) => {
      cy.get("@timeLineData").then((Data) => {
        cy.intercept(
          "POST",
          "https://twitter-clone.onthewifi.com:2023/api/v1/tweets/add "
        ).as("addTweet");

        cy.get(selectors.postInputField).type(Data.deleteText);
        cy.get(selectors.postButton).click();
        cy.contains(Data.postText).should("be.visible");

        cy.wait("@addTweet").then((interception) => {
          const tweetId = interception.response.body.data.id;
          cy.get(`[data-testid=${tweetId}menubtn]`).click();
          cy.wait(5000);
          cy.get(selectors.deleteOption).should("be.visible");
          cy.get(selectors.deleteOption).click();
        });
      });
    });
  });
});
