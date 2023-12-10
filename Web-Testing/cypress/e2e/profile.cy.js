/// <reference types="cypress"/>
const baseUrl = "https://twitter-clone.onthewifi.com/";
beforeEach(() => {
  cy.fixture("credentials_profile").as("credentials");
  cy.fixture("selectors_profile").as("selectors");
  cy.visit(`${baseUrl}`);
  cy.get("@credentials").then((cred) => {
    cy.get("@selectors").then((sel) => {
      cy.get(sel.startScreenLoginBtn).click({ force: true });
      cy.get(sel.loginEmailInput).type(cred.confirmedEmail3);
      cy.get(sel.loginPassInput).type(cred.confirmedPass3);
      cy.get(sel.loginBtn).click();
    });
  });
  cy.viewport("macbook-16");
});
describe("posts", () => {
  it("add new tweet--> added in profile", () => {
    cy.get("@selectors").then((sel) => {
      cy.get(sel.postInputField).type("NEW TWEET");
      cy.get(sel.postButton).click();
      cy.get(sel.sideBarProfile).click();
      cy.get(sel.lastestTweetContent, { timeout: 20000 })
        .invoke("text")
        .then((text) => {
          expect(text).to.equal("NEW TWEET ");
        });
    });
  });
  it("add 2 new tweet--> added in profile in right order", () => {
    cy.get("@selectors").then((sel) => {
      cy.get(sel.postInputField).type("FIRST NEW TWEET");
      cy.get(sel.postButton).click();
      cy.get(sel.postInputField).type("SECOND NEW TWEET");
      cy.get(sel.postButton).click();
      cy.get(sel.sideBarProfile).click();
      cy.get(sel.lastestTweetContent, { timeout: 40000 })
        .invoke("text")
        .then((text) => {
          expect(text).to.equal("SECOND NEW TWEET ");
        });
      cy.get(sel.beforeLastestTweetContent, { timeout: 40000 })
        .invoke("text")
        .then((text) => {
          expect(text).to.equal("FIRST NEW TWEET ");
        });
    });
  });
});
describe("like", () => {
  it("like some tweet from my posts --> added to likes", () => {
    cy.get("@selectors").then((sel) => {
      cy.get(sel.sideBarProfile).click();
      cy.get(sel.latestTweetLike, { timeout: 40000 }).then(() => {
        cy.get(sel.latestTweetLike).click();
        cy.get(sel.likesBtn, { timeout: 40000 })
          .click()
          .then(() => {
            cy.get(sel.latestTweetContentLikes, { timeout: 40000 })
              .invoke("text")
              .then((text) => {
                expect(text).to.contain("SECOND NEW TWEET");
              });
          });
      });
    });
  });
  it("unlike some tweet from my likes --> removed likes", () => {
    cy.get("@selectors").then((sel) => {
      cy.get(sel.sideBarProfile).click();
      cy.get(sel.likesBtn).click();
      cy.get(sel.latestTweetLike, { timeout: 40000 }).then(() => {
        cy.get(sel.latestTweetLike).first().click();
        cy.get(sel.latestTweetLike)
          .first()
          .children()
          .first()
          .should("have.attr", "class")
          .and("include", "text-dark-gray");
      });
    });
  });
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
      cy.get(sel.editLocation).clear().type("Mokattam");
      cy.get(sel.editWebsite).clear().type("www.");
      cy.get(sel.saveEdits).click();

      cy.get(sel.userLocation).should("be.visible").and("contain", "Mokattam");
      cy.get(sel.userWebsite).should("be.visible").and("contain", "www.");
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
      cy.get(sel.editWebsite).clear().type("www.1");
      cy.get(sel.x).click();
      cy.get(sel.discardBtn).click();

      cy.get(sel.userLocation).should("be.visible").and("contain", "Mokattam");
      cy.get(sel.userWebsite).should("be.visible").and("contain", "www.");
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
      cy.get(sel.editWebsite).clear().type("www.");
      cy.get(sel.saveEdits).click();
      cy.wait(2000);
      cy.get(sel.userLocation).should("be.visible").and("contain", "Mokattam");
      cy.get(sel.userWebsite).should("be.visible").and("contain", "www.");
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
      cy.get(sel.editName).clear().type("rawannn");
      cy.get(sel.saveEdits).click();
      cy.wait(2000);
      cy.get("span").contains("rawannn").should("be.visible");
    });
  });
  it("name size check", () => {
    cy.get("@selectors").then((sel) => {
      cy.get(sel.sideBarProfile).click();
      cy.get(sel.editProfile).click();
      cy.get(sel.editName)
        .clear()
        .type(
          "rW7zDl2uVHgNp0Oc9Jy1e8xL3qFfSsBbAaXwKkYyZzRrMmGgIiNnEeDdHhUuTtCcWv6Qq8Pp4"
        );
      cy.get(sel.saveEdits).click();
      cy.wait(2000);
      cy.get("span")
        .contains("rW7zDl2uVHgNp0Oc9Jy1e8xL3qFfSsBbAaXwKkYyZzRrMmGgIi")
        .should("be.visible")
        .and("not.contain", "NnEeDdHhUuTtCcWv6Qq8Pp4");
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
  //bug
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
});
describe("followers&following", () => {
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
describe("block", () => {
  it("block user from following-->home shouldn't have tweets from this user", () => {
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
                  cy.get(sel.userActions).click();
                  cy.get(sel.blockUser).click();
                  cy.get(sel.sideBarHome, { timeout: 60000 })
                    .click()
                    .then(() => {
                      cy.get(sel.lastestTweetContent, { timeout: 600000 }) //just to wait until the page loads
                        .invoke("text")
                        .then((txt) => {
                          cy.get("span").should("not.contain", text);
                        });
                    });
                });
            });
        });
    });
  });
  it("block user from following-->user removed from followers", () => {
    //login-profile-following-click on latest username-click on user actions-block-profile-followers-user shouldn't be found
    cy.get("@selectors").then((sel) => {
      cy.get(sel.sideBarProfile, { timeout: 6000 })
        .click()
        .then(() => {
          cy.get(sel.followingListBtn, { timeout: 6000 }).click();
          // .then(() => {
          cy.get(sel.latestfollowingUsername, { timeout: 6000 })
            .contains("@")
            .click()
            .invoke("text")
            .then((text) => {
              cy.get(sel.userActions).click();
              cy.get(sel.blockUser).click();
              cy.get(sel.sideBarProfile, { timeout: 6000 }).click();
              cy.get(sel.sideBarProfile, { timeout: 6000 }).click();
              cy.get(sel.sideBarProfile, { timeout: 6000 })
                .click()
                .then(() => {
                  cy.get(sel.followersListBtn, { timeout: 6000 })
                    .click()
                    .then(() => {
                      cy.get(sel.latestFollowerUsername, {
                        timeout: 600000,
                      }) //just to wait until the page loads
                        .invoke("text")
                        .then((txt) => {
                          cy.get("span").should("not.contain", text);
                        });
                      // });
                    });
                });
            });
        });
    });
  });
});
describe("Mute", () => {
  it("user1 Mute user2->logout->login to user2->add new tweet->logout->login to user1->check that it didn't appear", () => {
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
                  cy.get(sel.userActions).click();
                  cy.get(sel.muteUser).click();
                });
            });
        });
    });
  });
});
