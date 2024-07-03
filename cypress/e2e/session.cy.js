describe("POST /session", () => {

  beforeEach(function () {
    cy.fixture('users').then(function (users){
      this.users = users
    })
  })

  it("user session",function () {

      const userData = this.users.login

      cy.task('removeUser', userData.email)
      cy.postUser(userData)

      cy.postSession(userData)
        .then((response) => {
          expect(response.status).to.eq(200);

          const { user, token } = response.body;

          expect(user.name).to.eq(userData.name)
          expect(user.email).to.eq(userData.email)
          expect(token).not.to.be.empty
        });
    });
    it("invalid password", function () {

      const user = this.users.inv_pass

      cy.postSession(user).then((response) => {
        expect(response.status).to.eq(401);
      });
    });
    it("invalid email", function () {

      const user = this.users.inv_email

      cy.postSession(user).then((response) => {
        expect(response.status).to.eq(401);
      });
    });


  })


