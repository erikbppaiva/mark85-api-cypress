describe("DELETE /tasks/id:", () => {
  beforeEach(function () {
    cy.fixture("tasks/delete").then(function (task) {
      this.task = task;
    });
  });
  
  it("remove a task", function () {
    const { user, task } = this.task.remove;

    cy.task("removeTask", task.name, user.email);

    cy.task("removeUser", user.email);

    cy.postUser(user);

    cy.postSession(user).then((respUser) => {
      cy.postTask(task, respUser.body.token).then((resptask) => {
        cy.deleteTask(resptask.body._id, respUser.body.token).then(
          (response) => {
            expect(response.status).to.eq(204);
          }
        );
      });
    });
  });

  it("get not found task", function () {
    const { user, task } = this.task.not_found;

    cy.task("removeTask", task.name, user.email);
    cy.task("removeUser", user.email);
    cy.postUser(user);

    cy.postSession(user).then((respUser) => {
      cy.postTask(task, respUser.body.token).then((respTask) => {
        cy.deleteTask(respTask.body._id, respUser.body.token).then(
          (response) => {
            expect(response.status).to.eq(204);
          }
        );

        cy.deleteTask(respTask.body._id, respUser.body.token).then(
          (response) => {
            expect(response.status).to.eq(404);
          }
        );
      });
    });
  });
});
