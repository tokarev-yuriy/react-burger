import * as actions from "../../src/services/actions/auth";
const dispatch = action => cy.window().its('store').invoke('dispatch', action)

describe('service is available', function() {
  
  before(() => {
    cy.visit('/');
  });

  beforeEach(() => {
    cy.visit('/');
    cy.intercept("GET", "api/ingredients", { fixture: "ingredients.json" });
    cy.intercept("GET", "api/auth/user", { fixture: "user.json" });
    cy.intercept("POST", "api/orders", { fixture: "order.json" }).as("postOrder");
    dispatch(
      actions.getLoginSuccessAction(
        {
          email: 'test',
          name: 'test'
        },{
          access: 'test',
          refresh: 'test'
        }
      )
    );
  });

  it('should be available on localhost:3000', function() {
    cy.visit('/');
  });

  it('should contain bun in ingredients', function() {
    cy.get('[data-test-id=ingredients]').should('contain', 'булка 1');
  });

  it('should open and close ingredients modal', function() {
    cy.get('#react-modals').should('not.contain', 'булка 1');
    
    cy.get('[data-test-id=ingredients]').contains('булка 1').click();
    cy.get('#react-modals').should('contain', 'булка 1');

    cy.get('[data-test-id=modal-close] > *').click();
    cy.get('#react-modals').should('not.contain', 'булка 1');
  });

  it('should add bun by drag and drop', function() {
    cy.get('[data-test-id=constructor]').should('not.contain', 'булка 1');
    cy.get('[data-test-id=constructor]').should('not.contain', 'начинка 1');
    
    cy.get('[data-test-id=ingredients]').contains('булка 1').trigger('dragstart');
    cy.get('[data-test-id=constructor-drop]').trigger('drop');
    cy.get('[data-test-id=constructor]').should('contain', 'булка 1');

    cy.get('[data-test-id=ingredients]').contains('начинка 1').trigger('dragstart');
    cy.get('[data-test-id=constructor-drop]').trigger('drop');
    cy.get('[data-test-id=constructor]').should('contain', 'начинка 1');
  });

  it('should place an order', function() {
    cy.get('[data-test-id=ingredients]').contains('булка 1').trigger('dragstart');
    cy.get('[data-test-id=constructor-drop]').trigger('drop');
    cy.get('[data-test-id=ingredients]').contains('начинка 1').trigger('dragstart');
    cy.get('[data-test-id=constructor-drop]').trigger('drop');
    cy.get('[data-test-id=constructor] button').contains('Оформить заказ').click();
    
    cy.get('#react-modals').should('contain', '123');
  });
}); 