import {domainURL, APP_URL, ORDER_TIMEOUT } from "../../src/utils/constants";

describe('Проверка страницы "Конструктор"', () => {
  it('Приложение доступно по адресу ' + APP_URL, () => {
    cy.visit(APP_URL);
    cy.intercept('GET', `${domainURL}/api/ingredients`, { fixture: 'ingredients.json' }).as('ingredientsFixture');
  });

  it('Перетаскивание ингредиентов в конструктор', () => {
    const dataTransfer = new DataTransfer();

    // Краторная булка N-200i
    cy.get('[data-testid="60d3b41abdacab0026a733c6"]').as('bun');
    // Соус Spicy-X
    cy.get('[data-testid="60d3b41abdacab0026a733cc"]').as('sauce');
    // Филе Люминесцентного тетраодонтимформа
    cy.get('[data-testid="60d3b41abdacab0026a733c8"]').as('feeling');

    cy.get('[data-test="constructor"]').as('constructor');

    cy.get('@bun').trigger('dragstart', { dataTransfer });
    cy.get('@constructor').trigger('drop', { dataTransfer });

    cy.get('@sauce').trigger('dragstart', { dataTransfer });
    cy.get('@constructor').trigger('drop', { dataTransfer });

    cy.get('@feeling').trigger('dragstart', { dataTransfer });
    cy.get('@constructor').trigger('drop', { dataTransfer });

    cy.get('[data-test="order-price"]').should('contain', '3588');
  });

  it('Открытие модального окна с описанием ингредиента', () => {
    // Краторная булка N-200i
    cy.get('[data-testid="60d3b41abdacab0026a733c6"]').trigger('click');
    cy.location('pathname').should('eq', '/ingredients/60d3b41abdacab0026a733c6')
    cy.get('[data-test="modal"]').should('exist');
  });

  it('Отображение в модальном окне данных ингредиента', () => {
    cy.get('[data-test="ingredient-details"]').as('ingredientDetails');

    cy.get('@ingredientDetails')
      .find('[data-test="ingredient-details-image"]')
      .should('have.attr', 'src')
      .and('match', /https:\/\/code\.s3\.yandex\.net\/react\/code\/bun-02[a-zA-Z|-]*\.png/);
    cy.get('@ingredientDetails')
      .find('[data-test="ingredient-details-name"]')
      .should('have.text', 'Краторная булка N-200i');
    cy.get('@ingredientDetails')
      .find('[data-test="ingredient-details-calories"]')
      .should('have.text', '420');
    cy.get('@ingredientDetails')
      .find('[data-test="ingredient-details-proteins"]')
      .should('have.text', '80');
    cy.get('@ingredientDetails')
      .find('[data-test="ingredient-details-fat"]')
      .should('have.text', '24');

    cy.get('[data-test="modal-overlay"]').trigger('click', 'topLeft');
  });


  it('Открытие модального окна с данными о заказе при клике по кнопке "Оформить заказ"', () => {
    cy.get('[data-test="order-info"]').as('orderInfo');
    cy.get('@orderInfo').find('button').as('orderButton');

    cy.get('@orderButton')
      .should('be.enabled')
      .click();

    cy.location('pathname').should('eq', '/login')

    cy.get('[data-test="login-form"]').as('loginForm');

    cy.get('@loginForm').within(() => {
      cy.get('input[type=email]').type('tachkovsa@ya.ru');
      cy.get('input[type=password]').type('practicum');
    })
      .submit();

    cy.location('pathname').should('eq', '/');

    cy.get('@orderButton')
      .should('be.enabled')
      .click();

    cy.get('[data-test="modal"]', { timeout: ORDER_TIMEOUT })
      .should('exist')
      .find('[data-test="order-number"]')
      .should('exist');
  });

  it('Закрытие модальных окон при клике на кнопку закрытия', () => {
    cy.get('[data-test="modal-header"]').find('svg').click();
    cy.get('[data-test="modal"]').should('not.exist');
  });
});