import testData from "../fixtures/loginData.json";

describe("Valid Log in", () => {
    beforeEach(() => {
      cy.visit("/");
    });

    it("valid credentials", () => {
        cy.get(testData.selectors.email).type(testData.validEmail);
        cy.get(testData.selectors.password).type(testData.validPassword);
        cy.contains(testData.selectors.loginButton).click();
        cy.contains("Управление залами").should("be.visible");
      })
    
  });