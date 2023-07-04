describe('Blocks copy/paste', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.autologin();
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-page',
      contentTitle: 'My Page',
    });
    cy.visit('/my-page');
    cy.waitForResourceToLoad('@navigation');
    cy.waitForResourceToLoad('@breadcrumbs');
    cy.waitForResourceToLoad('@actions');
    cy.waitForResourceToLoad('@types');
    cy.waitForResourceToLoad('my-page');
    cy.navigate('/my-page/edit');
  });

  it('Copy/paste multiple blocks', () => {
    cy.intercept('PATCH', '/**/my-page').as('save');
    cy.intercept('GET', '/**/my-page').as('content');
    // GIVEN: A page with multiple blocks
    cy.addNewBlock('maps');
    cy.get(`.block.maps .toolbar-inner .ui.input input`)
      .type(
        '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2525.497070288158!2d7.103133415464086!3d50.72926897951482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bee17434076fc7%3A0x2e99668f581378c8!2sRiesstra%C3%9Fe+21%2C+53113+Bonn!5e0!3m2!1sde!2sde!4v1561386702097!5m2!1sde!2sde" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>',
      )
      .type('{enter}');

    cy.getSlateEditorAndType('Noam Avram Chomsky').contains(
      'Noam Avram Chomsky',
    );

    cy.getSlate().click();

    cy.toolbarSave();
    cy.get('a[aria-label="Edit"]').click();

    // WHEN: I copy paste them
    cy.getSlateTitle().focus().click().type('{shift}', { release: false });
    cy.get('.block-editor-maps').click();
    cy.get('#toolbar-copy-blocks').click();

    cy.getSlateEditorAndType('{shift}').click();
    cy.get('#toolbar-paste-blocks').should('be.visible');
    cy.get('#toolbar-paste-blocks').click();

    // THEN: the page will contain duplicated blocks
    cy.get('.documentFirstHeading').should(($blocks) => {
      expect($blocks).to.have.length(2);
    });

    cy.get('.block-editor-maps').should(($blocks) => {
      expect($blocks).to.have.length(2);
    });
  });

  it('Cut/paste multiple blocks', () => {
    // GIVEN: A page with multiple blocks
    cy.intercept('PATCH', '/**/my-page').as('save');
    cy.intercept('GET', '/**/my-page').as('content');
    cy.addNewBlock('maps');
    cy.get(`.block.maps .toolbar-inner .ui.input input`)
      .type(
        '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2525.497070288158!2d7.103133415464086!3d50.72926897951482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bee17434076fc7%3A0x2e99668f581378c8!2sRiesstra%C3%9Fe+21%2C+53113+Bonn!5e0!3m2!1sde!2sde!4v1561386702097!5m2!1sde!2sde" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>',
      )
      .type('{enter}');

    cy.getSlateEditorAndType('Noam Avram Chomsky').contains(
      'Noam Avram Chomsky',
    );

    cy.getSlate().click();

    cy.toolbarSave();
    cy.get('a[aria-label="Edit"]').click();

    // WHEN: I cut paste them
    cy.getSlateTitle().focus().click().type('{shift}', { release: false });
    cy.get('.block-editor-maps').click();
    cy.get('#toolbar-cut-blocks').click();

    cy.getSlateEditorAndType('{shift}').click();

    cy.get('#toolbar-paste-blocks').should('be.visible');
    cy.get('#toolbar-paste-blocks').click();

    // THEN: the page will contain only one of each blocks
    cy.get('.documentFirstHeading').should(($blocks) => {
      expect($blocks).to.have.length(1);
    });

    cy.get('.block-editor-maps').should(($blocks) => {
      expect($blocks).to.have.length(1);
    });
  });

  it('Delete multiple blocks', () => {
    cy.intercept('PATCH', '/**/my-page').as('save');
    cy.intercept('GET', '/**/my-page').as('content');
    // GIVEN: A page with multiple blocks
    cy.addNewBlock('maps');
    cy.get(`.block.maps .toolbar-inner .ui.input input`)
      .type(
        '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2525.497070288158!2d7.103133415464086!3d50.72926897951482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bee17434076fc7%3A0x2e99668f581378c8!2sRiesstra%C3%9Fe+21%2C+53113+Bonn!5e0!3m2!1sde!2sde!4v1561386702097!5m2!1sde!2sde" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>',
      )
      .type('{enter}');

    cy.getSlateEditorAndType('Noam Avram Chomsky').contains(
      'Noam Avram Chomsky',
    );

    cy.getSlate().click();

    cy.toolbarSave();
    cy.get('a[aria-label="Edit"]').click();

    // WHEN: I delete them
    cy.getSlateTitle().focus().type('{shift}', { release: false });
    cy.get('.block-editor-maps').click();
    cy.get('#toolbar-delete-blocks').should('be.visible');
    cy.get('#toolbar-delete-blocks').click();

    // THEN: the page will contain none of the blocks
    cy.get('.documentFirstHeading').should(($blocks) => {
      expect($blocks).to.have.length(0);
    });

    cy.get('.block-editor-maps').should(($blocks) => {
      expect($blocks).to.have.length(0);
    });
  });
});
