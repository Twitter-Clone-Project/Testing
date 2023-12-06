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
          expect(text).to.equal(" NEW TWEET ");
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
          expect(text).to.equal(" SECOND NEW TWEET ");
        });
      cy.get(sel.beforeLastestTweetContent, { timeout: 40000 })
        .invoke("text")
        .then((text) => {
          expect(text).to.equal(" FIRST NEW TWEET ");
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
        .selectFile("cypress/fixtures/profile.jpg", { force: true });
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
        "https://kady-twitter-images.s3.amazonaws.com/profile.jpg"
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
        .selectFile("cypress/fixtures/profile.jpg", { force: true });
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
        "https://kady-twitter-images.s3.amazonaws.com/profile.jpg"
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
        .selectFile("cypress/fixtures/profile.jpg", { force: true });
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
        "https://kady-twitter-images.s3.amazonaws.com/profile.jpg"
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
//not finished
describe("followers&following", () => {
  it.only("follers list-->follow-->check on it in following list", () => {
    cy.get("@selectors").then((sel) => {
      cy.get(sel.sideBarProfile, { timeout: 6000 })
        .click()
        .then(() => {
          cy.get(sel.followersListBtn).click();
          cy.get(sel.followLatestUserInFollowersList, { timeout: 6000 })
            .click()
            .then(() => {
              cy.get(".w-min.text-light-thin")
                .last()
                .invoke("text")
                .then((text1) => {
                  cy.get(sel.followingFromInside).click();
                  cy.get(".w-min.text-light-thin", { timeout: 6000 })
                    .invoke("text")
                    .then((text2) => {
                      expect(text1).to.eq(text2);
                    });
                });
            });
        });
    });
  });
  // it.only("following list-->unfollow-->follow again", () => {
  //   cy.get("@selectors").then((sel) => {
  //     cy.get(sel.sideBarProfile, { timeout: 6000 })
  //       .click()
  //       .then(() => {
  //         cy.get(sel.followingListBtn).click();
  //         cy.get(sel.followingLatestUserBtn, { timeout: 6000 })
  //           .click()
  //           .then(() => {
  //             cy.get(sel.followLatestUserBtn).should("be.visible");
  //             cy.get(sel.followingLatestUserBtn).should("not.be.visible");
  //           });
  //       });
  //   });
  // });
});
