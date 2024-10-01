import testData from "../../fixtures/loginData.json";
import seats from "../../fixtures/seats.json";

describe("Booking Tests", () => {
  it("should log in and book a seat", () => {
    cy.visit("https://qamid.tmweb.ru/admin/");

    // Ввод данных для входа
    cy.get(testData.selectors.email).type(testData.validEmail);
    cy.get(testData.selectors.password).type(testData.validPassword);
    cy.contains(testData.selectors.loginButton).click();

    const cinemaHallText = {};

    // Сбор информации о залах
    cy.get(testData.selectors.cinemaHall)
      .each(($el, index) => {
        cinemaHallText[`hall${index + 1}`] = $el.text();
      })
      .then(() => {
        // Запись данных в файл
        cy.writeFile("cypress/fixtures/cinemaHall.json", cinemaHallText);
      });

    // Переход на страницу с фильмами
    cy.visit("https://qamid.tmweb.ru/client/index.php");
    cy.get(testData.selectors.days).should("have.length", 7);
    cy.get(testData.selectors.days).eq(1).click();
    cy.get(testData.selectors.movie).eq(1).contains("20:00").click();

    // Проверка видимости выбранного зала
    cy.fixture("cinemaHall").then((halls) => {
      cy.get(testData.selectors.buyingHall).contains(halls.hall2).should("be.visible");
    });

    // Бронирование
    seats.forEach((booking) => {
      cy.get(
        `.buying-scheme__wrapper > :nth-child(${booking.row}) > :nth-child(${booking.seat})`
      ).click();
    });
    cy.get('.acceptin-button').contains('Забронировать').click(); 
    cy.get('.acceptin-button').contains('Получить код бронирования').should('be.visible');
  });
});