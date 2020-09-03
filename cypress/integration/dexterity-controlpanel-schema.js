if (Cypress.env('API') !== 'guillotina') {
  describe('ControlPanel: Dexterity Content-Types Schema', () => {
    beforeEach(() => {
      // given a logged in editor
      // add a new dexterity content-type for Book
      // and edit it's initial layout
      cy.visit('/');
      cy.autologin();
      cy.visit('/controlpanel/dexterity-types');
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
    });

    it('Add Bike content-type with custom schema', () => {
      // Add Bike content-type
      cy.get('#toolbar-add').click();
      cy.get('input[id="field-title"]').clear().type('Bike');
      cy.get('input[id="field-description"]').type('Bike content-type');
      cy.get('[title=Save]').click();

      cy.get('a[href="/controlpanel/dexterity-types/bike"]').should(
        'have.text',
        'Bike',
      );

      // Go to schema
      cy.visit('/controlpanel/dexterity-types/bike/schema');
      cy.get('#page-controlpanel-schema').contains('bike schema');

      // Add field
      cy.get('button[id=addfield]').click();
      cy.get('.modal [id="field-factory"] .react-select-container')
        .click()
        .type('Choice{enter}');
      cy.get('.modal input[id="field-title"]')
        .type('Color')
        .should('have.value', 'Color');
      cy.get('.modal .actions button[aria-label="Save"]').click();

      // Add fieldset
      cy.get('.tabular.menu .item-add button').click();
      cy.get('.modal input[id="field-title"]')
        .type('Specifications')
        .should('have.value', 'Specifications');
      cy.get('.modal input[id="field-id"]')
        .type('specifications')
        .should('have.value', 'specifications');
      cy.get('.modal .actions button[aria-label="Save"]').click();

      // Edit field
      cy.get(
        '[data-rbd-draggable-id="Color"] .toolbar button[aria-label="Edit"]',
      ).click();
      cy.get('.modal [id="field-parentFieldSet"] .react-select-container')
        .click()
        .type('Specifications{enter}');
      cy.get('.modal textarea[id="field-values"]').type(
        'Blue{enter}Red{enter}Green',
      );
      cy.get('.modal label[for="field-required"]').click();
      cy.get('.modal .actions button[aria-label="Save"]').click();
      cy.get('[data-rbd-draggable-id="Specifications"]').click();
      cy.get('.react-select-container[id="field-Color"]')
        .click()
        .type('Red{enter}');

      // Save
      cy.get('#toolbar-save').click();

      cy.visit('/');
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');

      // Add a bike
      cy.get('#toolbar-add').click();
      cy.get('#toolbar-add-bike').click();
      cy.get('input[name="title"]').type('Kona').should('have.value', 'Kona');
      cy.get('.formtabs a').contains('Specifications').click();
      cy.get('.react-select-container[id="field-Color"]')
        .click()
        .type('Green{enter}');

      // then a new bike has been created
      cy.get('#toolbar-save').click();
      cy.url().should('eq', Cypress.config().baseUrl + '/kona');
      cy.contains('Kona');
    });
  });
}
