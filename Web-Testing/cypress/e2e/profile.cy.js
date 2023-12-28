/// <reference types="cypress"/>

const baseUrl = "https://twitter-clone.onthewifi.com/";
beforeEach(() => {
  cy.fixture("credentials_profile").as("credentials");
  cy.fixture("selectors_profile").as("selectors");
  cy.visit(`${baseUrl}`);
  cy.get("@credentials").then((cred) => {
    cy.get("@selectors").then((sel) => {
      cy.get(sel.startScreenLoginBtn).click({ force: true });
      cy.get(sel.loginEmailInput).type(cred.email1);
      cy.get(sel.loginPassInput).type(cred.password123);
      cy.get(sel.loginBtn).click();
    });
  });
  cy.viewport("macbook-16");
});
//done and working
describe("posts", () => {
  it("add new tweet--> added in profile", () => {
    cy.intercept(
      "POST",
      "https://twitter-clone.onthewifi.com:2023/api/v1/tweets/add "
    ).as("addTweet");

    cy.get("@selectors").then((sel) => {
      cy.get(sel.postInputField).type("NEW TWEET");
      cy.get(sel.postButton).click();

      // Wait for the intercepted request to complete
      cy.wait("@addTweet").then((interception) => {
        const tweetId = interception.response.body.data.id;
        cy.setTweetId(tweetId);
        cy.get(sel.sideBarProfile).click();
        cy.get(`[data-testid=${tweetId}]`).should("be.visible");
      });
    });
  });
  it("delete tweet--> deleted from profile", () => {
    cy.get("@selectors").then((sel) => {
      cy.get(sel.sideBarProfile).click();
      cy.getTweetId().then((Id) => {
        cy.get(`[data-testid=${Id}menubtn]`).click();
        cy.get(`[data-testid=${Id}menu]`).as("menu");
        cy.get("@menu").click("left");
        cy.get(sel.sideBarProfile).click();
        cy.get(sel.sideBarProfile).click();
        cy.wait(2000);
        cy.get(`[data-testid=${Id}]`).should("not.exist"); //check if it's present in likes
      });
    });
  });
  it("add new tweet--> added in profile", () => {
    cy.intercept(
      "POST",
      "https://twitter-clone.onthewifi.com:2023/api/v1/tweets/add "
    ).as("addTweet");

    cy.get("@selectors").then((sel) => {
      cy.get(sel.postInputField).type("NEW TWEET");
      cy.get(sel.postButton).click();

      // Wait for the intercepted request to complete
      cy.wait("@addTweet").then((interception) => {
        const tweetId = interception.response.body.data.id;
        cy.setTweetId(tweetId);
        cy.get(sel.sideBarProfile).click();
        cy.get(`[data-testid=${tweetId}]`).should("be.visible");
      });
    });
  });
});
//done and working
describe("like", () => {
  it("like the tweet added in the prev test it from my posts --> added to likes", () => {
    cy.get("@selectors").then((sel) => {
      cy.get(sel.postInputField).type("testing tweet");
      cy.get(sel.postButton).click();

      cy.get(sel.sideBarProfile).click();
      cy.getTweetId().then((Id) => {
        cy.log(Id);
        cy.get(`[data-testid=${Id}like]`).click(); //like the new tweet

        cy.get(sel.likesBtn).click();
        cy.get(sel.likesBtn).click();
        cy.get(`[data-testid=${Id}]`).should("be.visible"); //check if it's present in likes
      });
    });
  });

  it("unlike some tweet from my likes --> removed likes", () => {
    cy.get("@selectors").then((sel) => {
      cy.get(sel.sideBarProfile).click();
      cy.get(sel.likesBtn, { timeout: 6000 })
        .click()
        .then(() => {
          cy.getTweetId().then((Id) => {
            cy.get(`[data-testid=${Id}like]`).click(); //unlike
            cy.get(sel.postsBtn).click();
            cy.get(sel.likesBtn).click();
            cy.get(`[data-testid=${Id}]`).should("not.exist");
          });
        });
    });
  }); //updated,working
});
describe("edit profile", () => {
  it("edit profile", () => {
    cy.get("@selectors").then((sel) => {
      cy.get(sel.sideBarProfile).click();
      cy.get(sel.editProfile).click();
      cy.get("[type='file']")
        .first()
        .selectFile("cypress/fixtures/cover.png", { force: true });
      cy.get("[type='file']")
        .last()
        .selectFile("cypress/fixtures/user.png", { force: true });
      cy.get(sel.editBio).clear().type("Computer Engineering"); //bio limit
      cy.get(sel.editLocation).clear().type("Mokattamm");
      cy.get(sel.editWebsite)
        .clear()
        .type("https://twitter-clone.onthewifi.com/");
      cy.get(sel.saveEdits).click();
      cy.wait(1000);
      cy.get(sel.userLocation).should("be.visible").and("contain", "Mokattamm");
      cy.get(sel.userWebsite)
        .should("be.visible")
        .and("contain", "https://twitter-clone.onthewifi.com/");
      cy.get(sel.userBio)
        .should("be.visible")
        .and("contain", "Computer Engineering");
      cy.get(sel.userPhoto).should(
        "have.attr",
        "src",
        "https://kady-twitter-images.s3.amazonaws.com/user.png"
      );
      cy.get(sel.userCover).should(
        "have.attr",
        "src",
        "https://kady-twitter-images.s3.amazonaws.com/cover.png"
      );
    });
  });
  it("edit profile-->discard", () => {
    cy.get("@selectors").then((sel) => {
      cy.get(sel.sideBarProfile).click();
      cy.get(sel.editProfile).click();
      cy.get("[type='file']")
        .first()
        .selectFile("cypress/fixtures/user.png", { force: true });
      cy.get("[type='file']")
        .last()
        .selectFile("cypress/fixtures/cover.png", { force: true });
      cy.get(sel.editBio).clear().type("Computer Engineering1"); //bio limit
      cy.get(sel.editLocation).clear().type("Mokattam1");
      cy.get(sel.editWebsite)
        .clear()
        .type("https://twitter-clone.onthewifi.com/");
      cy.get(sel.x).click();
      cy.get(sel.discardBtn).click();

      cy.get(sel.userLocation).should("be.visible").and("contain", "Mokattam");
      cy.get(sel.userWebsite)
        .should("be.visible")
        .and("contain", "https://twitter-clone.onthewifi.com/");
      cy.get(sel.userBio)
        .should("be.visible")
        .and("contain", "Computer Engineering");
      cy.get(sel.userPhoto).should(
        "have.attr",
        "src",
        "https://kady-twitter-images.s3.amazonaws.com/user.png"
      );
      cy.get(sel.userCover).should(
        "have.attr",
        "src",
        "https://kady-twitter-images.s3.amazonaws.com/cover.png"
      );
    });
  });
  it("edit profile-->cancel-->continue editing", () => {
    cy.get("@selectors").then((sel) => {
      cy.get(sel.sideBarProfile).click();
      cy.get(sel.editProfile).click();
      cy.get("[type='file']")
        .first()
        .selectFile("cypress/fixtures/cover.png", { force: true });
      cy.get("[type='file']")
        .last()
        .selectFile("cypress/fixtures/user.png", { force: true });
      cy.get(sel.editBio).clear().type("Computer Engineeringg"); //bio limit
      cy.get(sel.x).click();
      cy.get(sel.cancelBtn).click();
      cy.get(sel.editLocation).clear().type("Mokattam");
      cy.get(sel.editWebsite)
        .clear()
        .type("https://twitter-clone.onthewifi.com/");
      cy.get(sel.saveEdits).click();
      cy.wait(2000);
      cy.get(sel.userLocation).should("be.visible").and("contain", "Mokattam");
      cy.get(sel.userWebsite)
        .should("be.visible")
        .and("contain", "https://twitter-clone.onthewifi.com/");
      cy.get(sel.userBio)
        .should("be.visible")
        .and("contain", "Computer Engineeringg");
      cy.get(sel.userPhoto).should(
        "have.attr",
        "src",
        "https://kady-twitter-images.s3.amazonaws.com/user.png"
      );
      cy.get(sel.userCover).should(
        "have.attr",
        "src",
        "https://kady-twitter-images.s3.amazonaws.com/cover.png"
      );
    });
  });
  it("edit name", () => {
    cy.get("@selectors").then((sel) => {
      cy.get(sel.sideBarProfile).click();
      cy.get(sel.editProfile).click();
      cy.get(sel.editName).clear().type("rawannnn");
      cy.get(sel.saveEdits).click();
      cy.wait(2000);
      cy.get("span").contains("rawannn").should("be.visible");
    });
  });
  //bug-->fixed
  it("name size check", () => {
    cy.get("@selectors").then((sel) => {
      cy.get(sel.sideBarProfile).click();
      cy.get(sel.editProfile).click();
      cy.get(sel.editName)
        .clear()
        .type(
          "rWazDlauVHgNpaOaJy1eaxLlqFfSsBbAaXwKkYyZzRrMmGgIiNnEeDdHhUuTtCcWv6Qq8Pp4"
        );
      cy.get(sel.saveEdits).click();
      cy.wait(2000);
      cy.get("span")
        .contains("rWazDlauVHgNpaOaJy1eaxLlqFfSsBbAaXwKkYyZzRrMmGgIi")
        .should("be.visible")
        .and("not.contain", "NnEeDdHhUuTtCcWv6Qq8Pp4");
    });
  });
  //bug-->fixed
  it("name format check", () => {
    cy.get("@selectors").then((sel) => {
      cy.get(sel.sideBarProfile).click();
      cy.get(sel.editProfile).click();
      cy.get(sel.editName).clear().type("rWazDlauVHgNpaOaJy1eaxLlqFfSsBb658");
      cy.get(sel.saveEdits).should("be.disabled");
      cy.get(sel.nameError).should("be.visible");
    });
  });
  it("edit bd", () => {
    cy.get("@selectors").then((sel) => {
      cy.get(sel.sideBarProfile).click();
      cy.get(sel.editProfile).click();
      cy.get(sel.editBd).click();
      cy.get(sel.month).select("August");
      cy.get(sel.day).select("20");
      cy.get(sel.year).select("2002");
      cy.get(sel.saveEdits).click();
      cy.wait(2000);
      cy.get(sel.userBd).should("contain", "Born August 20, 2002");
    });
  });
  it("put the same profile picture 2 times", () => {
    cy.get("@selectors").then((sel) => {
      cy.get(sel.sideBarProfile).click();
      cy.get(sel.editProfile).click();
      cy.get("[type='file']")
        .last()
        .selectFile("cypress/fixtures/user.png", { force: true });
      cy.get(sel.saveEdits).click();
      cy.get(sel.userPhoto).should(
        "have.attr",
        "src",
        "https://kady-twitter-images.s3.amazonaws.com/user.png"
      );
      cy.get(sel.editProfile).click();
      cy.get("[type='file']")
        .last()
        .selectFile("cypress/fixtures/user.png", { force: true });
      cy.get(sel.saveEdits).click();

      cy.get(sel.userPhoto).should(
        "have.attr",
        "src",
        "https://kady-twitter-images.s3.amazonaws.com/user.png"
      );
    });
  });
  //bug--fixed
  it("check on input sizes", () => {
    cy.get("@selectors").then((sel) => {
      cy.get(sel.sideBarProfile).click();
      cy.get(sel.editProfile).click();
      cy.get(sel.editBio)
        .clear()
        .type(
          "nHkXcT5y8zFjPd7LgUqRvQwE1oW2aI6sZ9JrBmY3u0xS4iGpOcAeVbDfKlMRzQjLxVpE3d9yAqYsMnFtG0rW1hS8cP2lZ5gUuT7vN4bX6kKoIiJfCwDSvRb7tL5e8oJ9n6kU2xV4yMzCgQp3dW0qF1hXjE7lIiBfNcPwGzOaKuYrTxV3cRi2lN1gQk9u0W5mBjO8e6G7pY4zS9qF2dHv3KfCnXaZrEoJwTbMlU"
        );
      cy.get(sel.editLocation)
        .clear()
        .type(
          "nHkXcT5y8zFjPd7LgUqRvQwE1oW2aI6sZ9JrBmY3u0xS4iGpOcAeVbDfKlM RzQjLxVpE3d9yAqYsMnFtG0rW1hS8cP2lZ5gUuT7vN4bX6kKoIiJfCwD SvRb7tL5e8oJ9n6kU2xV4yMzCgQp3dW0qF1hXjE7lIiBfNcPwGzOaKuYrT xV3cRi2lN1gQk9u0W5mBjO8e6G7pY4zS9qF2dHv3KfCnXaZrEoJwTbMlUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        );
      cy.get(sel.editWebsite)
        .clear()
        .type(
          "nHkXcT5y8zFjPd7LgUqRvQwE1oW2aI6sZ9JrBmY3u0xS4iGpOcAeVbDfKlM RzQjLxVpE3d9yAqYsMnFtG0rW1hS8cP2lZ5gUuT7vN4bX6kKoIiJfCwD SvRb7tL5e8oJ9n6kU2xV4yMzCgQp3dW0qF1hXjE7lIiBfNcPwGzOaKuYrT xV3cRi2lN1gQk9u0W5mBjO8e6G7pY4zS9qF2dHv3KfCnXaZrEoJwTbMlUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        );
      cy.get(sel.saveEdits).click();
      cy.get(sel.userBio)
        .should("be.visible")
        .and(
          "contain",
          "nHkXcT5y8zFjPd7LgUqRvQwE1oW2aI6sZ9JrBmY3u0xS4iGpOcAeVbDfKlMRzQjLxVpE3d9yAqYsMnFtG0rW1hS8cP2lZ5gUuT7vN4bX6kKoIiJfCwDSvRb7tL5e8oJ9n6kU2xV4yMzCgQp3dW0qF1hXjE7lIi"
        )
        .and(
          "not.contain",
          "BfNcPwGzOaKuYrTxV3cRi2lN1gQk9u0W5mBjO8e6G7pY4zS9qF2dHv3KfCnXaZrEoJwTbMlU"
        );
    });
  });
  it("invalid name input(spaces)", () => {
    cy.get("@selectors").then((sel) => {
      cy.get(sel.sideBarProfile).click();
      cy.get(sel.editProfile).click();
      cy.get(sel.editName).clear().type("   ");
      cy.get(sel.saveEdits).should("be.disabled");
    });
  });
  it("invalid name input(digits)", () => {
    cy.get("@selectors").then((sel) => {
      cy.get(sel.sideBarProfile).click();
      cy.get(sel.editProfile).click();
      cy.get(sel.editName).clear().type("666");
      cy.get(sel.saveEdits).should("be.disabled");
    });
  });
  //bug
  it("future birthdate in edit profile", () => {
    /////////////////BUG
    cy.get("@selectors").then((sel) => {
      cy.get(sel.sideBarProfile).click();
      cy.get(sel.editProfile).click();
      cy.get(sel.editBd).click();
      cy.get(sel.month).select("December");
      cy.get(sel.day).select("31");
      cy.get(sel.year).select("2023");
      cy.get(sel.saveEdits).click();
      cy.wait(2000);
      cy.get(sel.userBd).should("not.contain.text", "Born December 31, 2023");
    });
  });
  //bug
  it("very young birthdate in edit profile", () => {
    /////////////////BUG
    cy.get("@selectors").then((sel) => {
      cy.get(sel.sideBarProfile).click();
      cy.get(sel.editProfile).click();
      cy.get(sel.editBd).click();
      cy.get(sel.month).select("December");
      cy.get(sel.day).select("31");
      cy.get(sel.year).select("2020");
      cy.get(sel.saveEdits).click();
      cy.wait(2000);
      cy.get(sel.userBd).should("not.contain.text", "Born December 31, 2023");
    });
  });
  it("remove cover photo", () => {
    cy.get("@selectors").then((sel) => {
      cy.get(sel.sideBarProfile).click();
      cy.get(sel.editProfile).click();
      cy.get(sel.removeCover).click();
      cy.get(sel.saveEdits).click();
      cy.wait(1000);
      cy.get(sel.userCover).should(
        "have.attr",
        "src",
        "https://kady-twitter-images.s3.amazonaws.com/DefaultBanner.png"
      );
    });
  });
});

describe("followers&following", () => {
  it("following list-->unfollow-->following count should decrement", () => {
    cy.get("@selectors").then((sel) => {
      cy.get(sel.sideBarProfile).click();
      cy.get(sel.followingCount)
        .invoke("text")
        .then((count) => {
          cy.get(sel.followingListBtn).click();
          cy.get(sel.latestfollowingUsername)
            .contains("@")
            .invoke("text")
            .then((username) => {
              cy.get(sel.unfollowLatestUserInFollowingList).click(); //unfollow
              cy.get(sel.sideBarProfile).click();
              cy.get(sel.followingCount).should(
                "contain",
                `${parseInt(count) - 1}`
              );
              // cy.get(sel.followersListBtn).click();
              // cy.get("[data-testid='FollowingList_2']")
              //   .children()
              //   .contains(username)
              //   .get("button")
              //   .click();
            });
        });
    });
  });
  it("followers list-->follow-->check on it in following list", () => {
    cy.get("@selectors").then((sel) => {
      cy.get(sel.sideBarProfile, { timeout: 6000 })
        .click()
        .then(() => {
          cy.get(sel.followersListBtn).click();
          cy.get(sel.followLatestUserInFollowersList, { timeout: 6000 })
            .click()
            .then(() => {
              cy.get(sel.latestFollowerUsername)
                .invoke("attr", "href")
                .then((href) => {
                  cy.get(sel.followingFromInside, { timeout: 10000 })
                    .click()
                    .then(() => {
                      cy.wait(3000);
                      cy.get(sel.latestfollowingUsername)
                        .invoke("attr", "href")
                        .then((href2) => {
                          cy.log(href, href2);
                          expect(href).to.eq(href2);
                        });
                    });
                });
            });
        });
    });
  });
  it("click on user in following-->go to user profile", () => {
    cy.get("@selectors").then((sel) => {
      cy.get(sel.sideBarProfile, { timeout: 6000 })
        .click()
        .then(() => {
          cy.get(sel.followingListBtn, { timeout: 6000 })
            .click()
            .then(() => {
              cy.get(sel.latestfollowingUsername, { timeout: 6000 })
                .contains("@")
                .click()
                .invoke("text")
                .then((text) => {
                  cy.url().should("contain", text.slice(1));
                });
            });
        });
    });
  });
});
//bug-->FIXED
//done and working
describe("block", () => {
  it("block user -->home shouldn't have tweets from this user", () => {
    cy.get("@selectors").then((sel) => {
      cy.get(sel.searchBar).type("rawantest1");
      cy.get(sel.rawantest1Search).click();
      cy.get(sel.rawantest1UserActions).click();
      cy.get(sel.rawantest1Block).click();
      cy.get(sel.sideBarHome).click();
      cy.get(sel.lastestTweetContent, { timeout: 600000 }) //just to wait until the page loads
        .then(() => {
          cy.get("span").should("not.contain", "rawantest1");
        });
    });
  });
  it("unblock user-->follow user-->home should have tweets from this user", () => {
    cy.get("@selectors").then((sel) => {
      cy.get(sel.searchBar).type("rawantest1");
      cy.get(sel.gotorawantest1).click();
      cy.get(sel.rawantest1UserActions).click();
      cy.get(sel.rawantest1Block).click(); //unblock
      //follow
      cy.get(sel.searchBar).clear();
      cy.get(sel.searchBar).type("rawantest1");
      cy.get(sel.gotorawantest1).click();
      cy.get(sel.followBtn).click();
      cy.get(sel.sideBarHome).click();
      //check
      cy.get(sel.lastestTweetContent, { timeout: 600000 }) //just to wait until the page loads
        .then(() => {
          cy.get(sel.rawantest1Tweet).scrollIntoView().should("be.visible");
        });
    });
  });

  it("block user-->user removed from followers", () => {
    cy.get("@selectors").then((sel) => {
      //first make this user follow me to check on the followers then
      cy.get(sel.userBtn).click();
      cy.get(sel.logOutBtn).click();
      cy.get(sel.logOutStep2).click();
      cy.get("@credentials").then((cred) => {
        cy.get(sel.startScreenLoginBtn).click({ force: true });
        cy.get(sel.loginEmailInput).type(cred.email2);
        cy.get(sel.loginPassInput).type(cred.password123);
        cy.get(sel.loginBtn).click();
      });
      cy.get(sel.searchBar).type("rawann");
      cy.get(sel.gotorawann).click();
      cy.get(sel.followBtn).click();
      //////back to my account
      cy.get(sel.userBtn).click();
      cy.get(sel.logOutBtn).click();
      cy.get(sel.logOutStep2).click();
      cy.get("@credentials").then((cred) => {
        cy.get(sel.startScreenLoginBtn).click({ force: true });
        cy.get(sel.loginEmailInput).type(cred.email1);
        cy.get(sel.loginPassInput).type(cred.password123);
        cy.get(sel.loginBtn).click();
      });
      cy.get(sel.searchBar).type("rawantest1");
      cy.get(sel.gotorawantest1).click();
      cy.get(sel.rawantest1UserActions).click();
      cy.get(sel.rawantest1Block).click();
      ///check
      cy.get(sel.sideBarProfile).click();
      cy.get(sel.sideBarProfile).click();
      cy.get(sel.sideBarProfile).click();
      cy.get(sel.followersListBtn).click();
      cy.get("span").should("not.contain", "rawantest1");
    });
  });
  it("unblock user-->follow user-->home should have tweets from this user", () => {
    cy.get("@selectors").then((sel) => {
      cy.get(sel.searchBar).type("rawantest1");
      cy.get(sel.gotorawantest1).click();
      cy.get(sel.rawantest1UserActions).click();
      cy.get(sel.rawantest1Block).click(); //unblock
      //follow
      cy.get(sel.searchBar).clear();
      cy.get(sel.searchBar).type("rawantest1");
      cy.get(sel.gotorawantest1).click();
      cy.get(sel.followBtn).click();
      cy.get(sel.sideBarHome).click();
      //check
      cy.get(sel.lastestTweetContent, { timeout: 600000 }) //just to wait until the page loads
        .then(() => {
          cy.get(sel.rawantest1Tweet).scrollIntoView().should("be.visible");
        });
    });
  });
});
//done and working
describe("Mute", () => {
  it("user1 Mute user2->logout->login to user2->add new tweet->logout->login to user1->check that it didn't appear", () => {
    cy.get("@selectors").then((sel) => {
      cy.get(sel.searchBar).type("rawantest1");
      cy.get(sel.rawantest1Search).click();
      cy.get(sel.rawantest1UserActions).click();
      cy.get(sel.rawantest1Mute).click();
      cy.get(sel.userBtn).click();
      cy.get(sel.logOutBtn).click();
      cy.get(sel.logOutStep2).click();
      cy.get("@credentials").then((cred) => {
        cy.get(sel.startScreenLoginBtn).click({ force: true });
        cy.get(sel.loginEmailInput).type(cred.email2);
        cy.get(sel.loginPassInput).type(cred.password123);
        cy.get(sel.loginBtn).click();
      });
      cy.intercept(
        "POST",
        "https://twitter-clone.onthewifi.com:2023/api/v1/tweets/add "
      ).as("addTweet");

      cy.get(sel.postInputField).type(
        "Muted user new tweet, this tweet shouldn't be visible"
      );
      cy.get(sel.postButton).click();

      // Wait for the intercepted request to complete
      cy.wait("@addTweet").then((interception) => {
        const tweetId = interception.response.body.data.id;
        cy.setTweetId(tweetId);
        cy.get(sel.userBtn).click();
        cy.get(sel.logOutBtn).click();
        cy.get(sel.logOutStep2).click();
        cy.get("@credentials").then((cred) => {
          cy.get(sel.startScreenLoginBtn).click({ force: true });
          cy.get(sel.loginEmailInput).type(cred.email1);
          cy.get(sel.loginPassInput).type(cred.password123);
          cy.get(sel.loginBtn).click();
        });
        cy.wait(2000);
        cy.get(`[data-testid=${tweetId}]`).should("not.exist");
      });
    });
  });
  it("user1 unMute user2->logout->login to user2->add new tweet->logout->login to user1->check that it appears in home", () => {
    cy.get("@selectors").then((sel) => {
      cy.get(sel.searchBar).type("rawantest1");
      cy.get(sel.rawantest1Search).click();
      cy.get(sel.rawantest1UserActions).click();
      cy.get(sel.rawantest1Mute).click(); //unmute
      cy.get(sel.userBtn).click();
      cy.get(sel.logOutBtn).click();
      cy.get(sel.logOutStep2).click();
      cy.get("@credentials").then((cred) => {
        cy.get(sel.startScreenLoginBtn).click({ force: true });
        cy.get(sel.loginEmailInput).type(cred.email2);
        cy.get(sel.loginPassInput).type(cred.password123);
        cy.get(sel.loginBtn).click();
      });
      cy.intercept(
        "POST",
        "https://twitter-clone.onthewifi.com:2023/api/v1/tweets/add "
      ).as("addTweet");

      cy.get(sel.postInputField).type(
        "unMuted user new tweet, this tweet be visible"
      );
      cy.get(sel.postButton).click();

      // Wait for the intercepted request to complete
      cy.wait("@addTweet").then((interception) => {
        const tweetId = interception.response.body.data.id;
        cy.setTweetId(tweetId);
        cy.get(sel.userBtn).click();
        cy.get(sel.logOutBtn).click();
        cy.get(sel.logOutStep2).click();
        cy.get("@credentials").then((cred) => {
          cy.get(sel.startScreenLoginBtn).click({ force: true });
          cy.get(sel.loginEmailInput).type(cred.email1);
          cy.get(sel.loginPassInput).type(cred.password123);
          cy.get(sel.loginBtn).click();
        });
        cy.wait(2000);
        cy.get(`[data-testid=${tweetId}]`).should("be.visible");
      });
    });
  });
  it("user1 Mute user2->check that their tweets don't appear", () => {
    cy.get("@selectors").then((sel) => {
      cy.get(sel.searchBar).type("rawantest1");
      cy.get(sel.rawantest1Search).click();
      cy.get(sel.rawantest1UserActions).click();
      cy.get(sel.rawantest1Mute).click();
      cy.get(sel.sideBarHome, { timeout: 60000 })
        .click()
        .then(() => {
          cy.get(sel.lastestTweetContent, { timeout: 600000 }) //just to wait until the page loads
            .then(() => {
              cy.get("span").should("not.contain", "rawantest1");
            });
        });
    });
  });
});
