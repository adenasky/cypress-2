import testData from "../fixtures/loginData.json";

describe("Invalid Log in", () => {
    beforeEach(() => {
      cy.visit("/");
    });

    it("should fail with invalid email", () => {
        cy.get(testData.selectors.email).type(testData.invalidEmail);
        cy.get(testData.selectors.password).type(testData.validPassword);
        cy.error(testData.selectors.loginButton, "Ошибка авторизации!");
      });

    it("should fail with invalid password", () => {
        cy.get('[name="password"]').type(testData.invalidPassword);
        cy.get('[name="email"]').type(testData.validEmail);
        cy.error(testData.selectors.loginButton, "Ошибка авторизации!");
      });

    it("should fail with empty email", () => {
        cy.get('[name="password"]').type(testData.validPassword);
        cy.contains("Авторизоваться").click();
        cy.get('[name="email"]').then((elements) => {
          expect(elements[0].checkValidity()).to.be.false;
          const validationMessage = elements[0].validationMessage;
          expect(validationMessage).to.be.oneOf([
          "Заполните это поле.",
          "Please fill out this field."
      ]);
    });
});

    it("should fail with empty password", () => {
        cy.get('[name="email"]').type(testData.validEmail);
        cy.contains("Авторизоваться").click();
        cy.get('[name="password"]').then((elements) => {
          expect(elements[0].checkValidity()).to.be.false;
          const validationMessage = elements[0].validationMessage;
          expect(validationMessage).to.be.oneOf([
          "Заполните это поле.",
          "Please fill out this field."
      ]);
    });
});
});