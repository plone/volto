context('Test Field Type in form ', () => {
  describe('Test', () => {
    beforeEach(() => {
      cy.intercept('GET', `/**/*?expand*`).as('content');
      cy.intercept('GET', '/**/@types/example').as('schema');
      cy.intercept('POST', '/**/').as('create');

      // given a logged in editor and a page in edit mode
      cy.autologin();
      cy.visit('/');
      cy.wait('@content');
      cy.navigate('/form');
    });

    it('Test Email field by entering email address without a domain', function () {
      cy.get('#field-email').type('plone');
      cy.findAllByText('Email').click();

      cy.get('.form-error-label')
        .contains('Input must be valid email (something@domain.com)')
        .should('be.visible');
    });

    it('Test Text Field', function () {
      cy.get('#field-textline').type('Volto Coresandbox fixture');
      cy.findAllByText('Title').click();
      cy.get('.form-error-label').should('not.exist');
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

      cy.findByText('Enter Date/Time').click();
      cy.wait(100);
      //Date
      cy.get('#datetime-date').type(`${month}/${day}/${year}`);
      cy.get('#datetime-date').should('have.value', `${month}/${day}/${year}`);

      //Time
      cy.get('#datetime-time').type(`${currentTime} `);
      cy.get('#datetime-time').should('have.value', `${currentTime}`);

      cy.get('.form-error-label').should('not.exist');
      cy.findByText('Enter Date/Time').click();
    });

    it('Test URI Field by entering invalid URI', function () {
      cy.get('#field-url').type('plone');
      cy.findAllByText('Enter URL').click();
      cy.get('.form-error-label')
        .contains(
          'Input must be valid url (www.something.com or http(s)://www.something.com)',
        )
        .should('be.visible');
    });

    it('Test ID Field Type', function () {
      cy.get('#field-id').type('Plone');
      cy.findAllByText('Enter ID').click();
      cy.get('.form-error-label')
        .contains(
          'Only 7-bit bytes characters are allowed. Cannot contain uppercase letters, special characters: <, >, &, #, /, ?, or others that are illegal in URLs. Cannot start with: _, aq_, @@, ++. Cannot end with __. Cannot be: request,contributors, ., .., "". Cannot contain new lines.',
        )
        .should('be.visible');
    });
    it('Test Link Document/News/Event Field Type', function () {
      cy.get('.objectbrowser-field > .selected-values').click();
      cy.get('svg.icon.home-icon').click();
      cy.get('li').last().click();
      cy.findAllByText('Link to Document/Event/News').click();
      cy.get('.objectbrowser-field > .selected-values > div.ui.label').should(
        'be.visible',
      );
    });
    it('Test RichText Field Type', function () {
      cy.get('.slate_wysiwyg_box').type('Plone{selectall}');
      cy.get('a[title="Bold"]').click();
      cy.get('a[title="Italic"]').click();
      cy.get('.slate_wysiwyg_box').click();
    });
    it('Missing required field error', function () {
      cy.get('#field-textline').type('Volto Coresandbox fixture');
      cy.get('#field-email').type('plone@org.com');
      cy.get('#field-password').click();
      cy.get('#field-email').click();
      cy.get('.form-error-label')
        .contains('Required input is missing.')
        .should('be.visible');
      cy.get('.ui.icon.negative.attached.message > .content ').should(
        'be.visible',
      );
    });
  });
});
