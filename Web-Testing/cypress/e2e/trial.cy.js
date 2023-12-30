describe("MailSlurp Test", () => {
  it("should receive an email and extract OTP", () => {
    cy.mailslurp().then((mailslurp) => {
      return mailslurp
        .waitForLatestEmail("9b5c0361-d9ce-4987-9745-f83d3cccdafa")
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
