describe('Main page test', () => {
  it("should open main page", () => {
    cy.visit('https://qamid.tmweb.ru/client/index.php');
    cy.get(".page-header__title").contains("Идём").should("exist");
    cy.get(".page-nav__day").should("have.length", 7);
    cy.get(".movie").should("be.visible");
 });
});