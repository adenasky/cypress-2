import testData from "../../fixtures/loginData.json";
import seats from "../../fixtures/seats.json";

describe("main page", () => {
  it("should open main page", () => {
    cy.visit("/admin");
    cy.get(testData.selectors.email).type(testData.validEmail);
    cy.get(testData.selectors.password).type(testData.validPassword);
    cy.contains(testData.selectors.loginButton).click();
    cy.get(testData.selectors.cinemaHall).should("have.length", 7);

    const cinemaHallText = {};

    cy.get(testData.selectors.cinemaHall)
      .each(($el, index) => {
        cinemaHallText[`hall${index + 1}`] = $el.text();
      })
      .then(() => {
        cy.writeFile("cypress/fixtures/cinemaHall.json", cinemaHallText);
      });

    cy.visit("/");
    cy.get(testData.selectors.days).should("have.length", 7);
    cy.get(testData.selectors.days).eq(1).click();
    cy.get(testData.selectors.movie).last().contains("16:00").click();

    cy.fixture("cinemaHall").then((halls) => {
      cy.get(testData.selectors.buyingHall).contains(halls.hall2).should("be.visible");
    });

    seats.forEach((booking) => {
      cy.get(
        `.buying-scheme__wrapper > :nth-child(${booking.row}) > :nth-child(${booking.seat})`
      ).click();
    });
  });
});