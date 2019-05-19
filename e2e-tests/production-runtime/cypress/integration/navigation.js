describe(`navigation`, () => {
  beforeEach(() => {
    cy.visit(`/`).waitForRouteChange();
  });

  it(`displays content from other pages`, () => {
    cy.visit(`/about`).waitForRouteChange();

    cy.getTestElement(`about-message`)
      .invoke(`text`)
      .should(`equal`, `Gatsby v4-beta example`);
  });
});
