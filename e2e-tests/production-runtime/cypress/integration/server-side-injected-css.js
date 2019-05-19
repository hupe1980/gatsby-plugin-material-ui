describe(`server-side injected css`, () => {
  it(`removes server-side injected css`, () => {
    cy.visit(`/`).waitForRouteChange();

    cy.get(`#jss-server-side`).should(`not.exist`);
  });
});
