context('Test field types in example content', () => {
  describe('Test', () => {
    beforeEach(() => {
      cy.intercept('GET', `/**/*?expand*`).as('content');
      cy.intercept('GET', '/**/@types/example').as('schema');
      cy.intercept('POST', '/**/').as('create');

      // given a logged in editor and a page in edit mode
      cy.autologin();
      cy.visit('/');
      cy.wait('@content');

      // We always add a new example content type, fill the required
      cy.navigate('/add?type=example');
      cy.wait('@schema');

      cy.get('#field-title').type('An Example');
    });

    it('Test Email field by entering email address without a domain', function () {
      cy.get('#field-email_field').type('plone');
      cy.findAllByText('Email field').click();

      cy.get('.form-error-label')
        .contains('Input must be valid email (something@domain.com)')
        .should('be.visible');
      cy.get('#toolbar-save').click();
      cy.wait(100);
      cy.get('.toast-inner-content')
        .contains('Input must be valid email (something@domain.com)')
        .should('be.visible');
    });

    it('Test Text Field', function () {
      cy.get('#field-description').type('Volto Coresandbox fixture');
      cy.findAllByText('Description (Textline)').click();
      cy.get('.form-error-label').should('not.exist');
      cy.get('#toolbar-save').click();
      cy.wait(100);
      cy.get('.toast-inner-content').should('not.exist');
    });

    it('Test Integer & Float Field', function () {
      cy.findByText('Number fields').click();
      cy.wait(500);
      cy.get('#field-int_field').type('121');
      cy.get('#field-float_field').type('121.121');
      cy.findAllByText('Integer Field (e.g. 12)').click();
      cy.get('.form-error-label').should('not.exist');
      cy.get('#toolbar-save').click();
      cy.wait(100);
      cy.get('.toast-inner-content').should('not.exist');
    });
    it('Test Date & Time Field', function () {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();

      const currentTime = date.toLocaleTimeString([], {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });

      cy.findByText('Date and time fields').click();
      cy.wait(100);
      //Date
      cy.get('#datetime_field-date').type(`${month}/${day}/${year}`);
      cy.get('#datetime_field-date').should(
        'have.value',
        `${month}/${day}/${year}`,
      );

      //Time
      cy.get('#datetime_field-time').type(`${currentTime} `);
      cy.get('#datetime_field-time').should('have.value', `${currentTime}`);

      cy.get('.form-error-label').should('not.exist');
      cy.get('#toolbar-save').click();
      cy.wait(100);
      cy.get('.toast-inner-content').should('not.exist');
    });

    it('Test List Field', function () {
      cy.findAllByText('Choice and Multiple Choice fields').click();
      cy.wait(500); // We allow the Select component to lazy load

      cy.get('.react-select__placeholder')
        .should('be.visible')
        .contains('Select');

      // We select the choice 'Beginner' of the field and remove it
      cy.get('#field-list_field').click();
      cy.findAllByText('Beginner').click();
      cy.get(
        '#field-list_field > .react-select__control > .react-select__value-container > .react-select__multi-value',
      )
        .first('Beginner')
        .get('.react-select__multi-value__remove')
        .click();

      // We select the choice 'Advanced' of the field
      cy.get('#field-list_field').click();
      cy.findAllByText('Advanced').click();
      cy.get(
        '#field-list_field > .react-select__control > .react-select__value-container > .react-select__multi-value',
      ).should('have.text', 'Advanced');

      cy.get('.form-error-label').should('not.exist');
      cy.get('#toolbar-save').click();
      cy.wait(100);
      cy.get('.toast-inner-content').should('not.exist');
    });

    it('Test Relationship Field', function () {
      cy.findAllByText('Relation fields').click();
      cy.wait(500); // We allow the Select component to lazy load
      cy.get('.react-select__placeholder')
        .should('be.visible')
        .contains('Select');

      // We select the choice 'Beginner' of the field and remove it

      cy.get('#field-relationchoice_field > .react-select__control ')
        .click()
        .get('.react-select__menu-list > #react-select-6-option-4')
        .click();

      cy.wait(100);
      cy.get('.form-error-label').should('not.exist');
      cy.get('#toolbar-save').click();
      cy.wait(100);
      cy.get('.toast-inner-content').should('not.exist');
      cy.wait('@create');
      cy.wait('@content');
      cy.get('.relation').should('have.attr', 'href');
    });
    //relation widget Folder private

    it('Test URI Field by entering invalid URI', function () {
      cy.findAllByText('Other fields').click();
      cy.get('#field-uri_field').type('plone');
      cy.findAllByText('URI field').click();

      cy.get('.form-error-label')
        .contains(
          'Input must be valid url (www.something.com or http(s)://www.something.com)',
        )
        .should('be.visible');
      cy.get('#toolbar-save').click();
      cy.wait(100);
      cy.get('.toast-inner-content')
        .contains(
          'Input must be valid url (www.something.com or http(s)://www.something.com)',
        )
        .should('be.visible');
    });
  });
});
