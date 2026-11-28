/* eslint-disable no-template-curly-in-string */
// Template variables like ${portal_url} are intentionally used as literal strings in tests
context('URL Widget Template Variables', () => {
  describe('URL widgets preserve template variables', () => {
    beforeEach(() => {
      cy.intercept('GET', `/**/*?expand*`).as('content');
      cy.intercept('GET', '/**/Document').as('schema');
      cy.intercept('GET', '/**/Link').as('linkSchema');
      cy.autologin();
      cy.createContent({
        contentType: 'Document',
        contentId: 'document',
        contentTitle: 'Test document',
      });
    });

    it('As an editor I can enter template variables in url widget (remoteUrl field) and they are preserved', function () {
      cy.intercept('POST', '*', (req) => {
        if (req.body.remoteUrl) {
          expect(req.body.remoteUrl).to.include('${portal_url}');
        }
      }).as('saveLink');
      cy.intercept('GET', '/**/*?expand*').as('content');

      // Visit the home page first
      cy.visit('/');
      cy.wait('@content');

      // When I add a Link with template variables
      cy.get('#toolbar-add').click();
      cy.get('#toolbar-add-link').click();
      cy.wait('@linkSchema');

      cy.get('input[name="title"]')
        .type('My Link with Template')
        .should('have.value', 'My Link with Template');

      // Test ${portal_url} template variable
      const portalUrlTemplate = '${portal_url}/some-path';
      cy.get('input[name="remoteUrl"]')
        .type(portalUrlTemplate, { parseSpecialCharSequences: false })
        .should('have.value', portalUrlTemplate);

      // Verify no validation error is shown
      cy.get('input[name="remoteUrl"]').should('not.have.class', 'error');

      // Verify template variable is preserved when blurring
      cy.get('input[name="remoteUrl"]').blur();
      cy.get('input[name="remoteUrl"]').should('have.value', portalUrlTemplate);

      cy.get('#toolbar-save').click();
      cy.wait('@saveLink');
      cy.wait('@content');
    });

    it('As an editor I can enter ${navigation_root_url} template variable in url widget and it is preserved', function () {
      cy.intercept('POST', '*', (req) => {
        if (req.body.remoteUrl) {
          expect(req.body.remoteUrl).to.include('${navigation_root_url}');
        }
      }).as('saveLink');
      cy.intercept('GET', '/**/*?expand*').as('content');

      // Visit the home page first
      cy.visit('/');
      cy.wait('@content');

      cy.get('#toolbar-add').click();
      cy.get('#toolbar-add-link').click();
      cy.wait('@linkSchema');

      cy.get('input[name="title"]')
        .type('Navigation Root Link')
        .should('have.value', 'Navigation Root Link');

      // Test ${navigation_root_url} template variable
      const navRootTemplate = '${navigation_root_url}/page';
      cy.get('input[name="remoteUrl"]')
        .type(navRootTemplate, { parseSpecialCharSequences: false })
        .should('have.value', navRootTemplate);

      // Verify no validation error is shown
      cy.get('input[name="remoteUrl"]').should('not.have.class', 'error');

      // Verify template variable is preserved when blurring
      cy.get('input[name="remoteUrl"]').blur();
      cy.get('input[name="remoteUrl"]').should('have.value', navRootTemplate);

      cy.get('#toolbar-save').click();
      cy.wait('@saveLink');
      cy.wait('@content');
    });

    it('As an editor I can edit template variables in url widget without normalization', function () {
      cy.intercept('POST', '*', (req) => {
        if (req.body.remoteUrl) {
          expect(req.body.remoteUrl).to.include('${navigation_root_url}');
        }
      }).as('saveLink');
      cy.intercept('GET', '/**/*?expand*').as('content');

      // Visit the home page first
      cy.visit('/');
      cy.wait('@content');

      cy.get('#toolbar-add').click();
      cy.get('#toolbar-add-link').click();
      cy.wait('@linkSchema');

      cy.get('input[name="title"]').type('Editable Template Link');

      // Enter template variable
      const templateVar = '${portal_url}/test';
      cy.get('input[name="remoteUrl"]')
        .type(templateVar, { parseSpecialCharSequences: false })
        .should('have.value', templateVar);

      // Clear and re-enter to verify it's not normalized
      const updatedTemplate = '${navigation_root_url}/updated';
      cy.get('input[name="remoteUrl"]')
        .clear()
        .type(updatedTemplate, { parseSpecialCharSequences: false })
        .should('have.value', updatedTemplate);

      // Verify no validation error
      cy.get('input[name="remoteUrl"]').should('not.have.class', 'error');

      // Verify template variable is preserved when blurring
      cy.get('input[name="remoteUrl"]').blur();
      cy.get('input[name="remoteUrl"]').should('have.value', updatedTemplate);

      cy.get('#toolbar-save').click();
      cy.wait('@saveLink');
      cy.wait('@content');
    });

    it('As an editor template variables are not treated as invalid URLs', function () {
      cy.intercept('POST', '*').as('saveLink');

      // Visit the home page first
      cy.visit('/');
      cy.wait('@content');

      cy.get('#toolbar-add').click();
      cy.get('#toolbar-add-link').click();
      cy.wait('@linkSchema');

      cy.get('input[name="title"]').type('Valid Template URL');

      // Template variables should not trigger URL validation errors
      const templateVar = '${portal_url}';
      cy.get('input[name="remoteUrl"]')
        .type(templateVar, { parseSpecialCharSequences: false })
        .blur();

      // Verify no error state is shown
      cy.get('input[name="remoteUrl"]').should('not.have.class', 'error');

      // Verify the value is still there
      cy.get('input[name="remoteUrl"]').should('have.value', templateVar);
    });
  });
});
