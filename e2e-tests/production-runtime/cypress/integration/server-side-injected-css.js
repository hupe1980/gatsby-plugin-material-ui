describe(`server-side injected css`, () => {
  it(`removes server-side injected css`, () => {
    cy.request(`/`)
      .its(`body`)
      .should(`include`, `<style id="jss-server-side">`);

    cy.visit(`/`).waitForRouteChange();

    cy.get(`#jss-server-side`).should(`not.exist`);
  });
});
