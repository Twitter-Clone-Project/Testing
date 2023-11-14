describe("MailSlurp Test", () => {
  it("should receive an email and extract OTP", () => {
    cy.mailslurp().then((mailslurp) => {
      return mailslurp
        .waitForLatestEmail("4113c8ce-5a59-4b30-879a-301408731187")
        .then((email) => {
          const codeRegex = /Your OTP is ([0-9a-zA-Z]+)/;
          const match = codeRegex.exec(email.body);
          const code = match ? match[1] : null;
          expect(code).to.not.be.null;
          cy.log(code);
        });
    });
  });
});