import { slateBeforeEach } from '../../../support/e2e';

describe('Block Tests: Links', () => {
  beforeEach(slateBeforeEach);

  it('As editor I can add links', function () {
    cy.get('#toolbar').click();
    cy.getSlate().type('Colorless green ideas sleep furiously.');

    cy.log('Create a Link');

    cy.setSlateSelection('ideas', 'furiously');
    cy.clickSlateButton('Add link');

    cy.get('.slate-toolbar .link-form-container input').type(
      'https://google.com{enter}',
    );
    cy.getSlate().should('have.descendants', 'a.slate-editor-link');
    cy.toolbarSave();

    cy.log('Then the page view should contain a link');
    cy.get('.ui.container p').contains(
      'Colorless green ideas sleep furiously.',
    );
    cy.get('.ui.container p a')
      .should('have.text', 'ideas sleep furiously')
      .and('have.attr', 'href')
      .and('include', 'https://google.com');

    cy.log('Remove link by partial selection');
    cy.get('#toolbar .toolbar-actions .edit').click();

    cy.getSlate().click();
    cy.setSlateSelection('sleep');
    cy.clickSlateButton('Edit link');
    cy.get('.slate-inline-toolbar .cancel').click();

    cy.get('h1.documentFirstHeading').click();
    cy.get('.block-editor-slate .slate-editor').eq(0).click();

    cy.getSlate().should('not.have.descendants', 'a.slate-editor-link');

    cy.log('Re-add link');
    cy.setSlateSelection('green', 'sleep');
    cy.clickSlateButton('Add link');
    cy.get('.slate-toolbar .link-form-container input').type(
      'https://google.com{enter}',
    );

    cy.log('Save');
    cy.toolbarSave();

    cy.log('Then the page view should contain a link');
    cy.get('.ui.container p').contains(
      'Colorless green ideas sleep furiously.',
    );
    cy.get('.ui.container p a')
      .should('have.text', 'green ideas sleep')
      .and('have.attr', 'href')
      .and('include', 'https://google.com');
  });

  it('As editor I can add multiple lines and add links', function () {
    // Complete chained commands
    cy.getSlateEditorAndType(
      'Colorless green ideas{shift}{enter} {shift}{enter}sleep furiously.',
    );

    cy.log("Adding link")
    cy.setSlateSelection('green', 'furiously');
    cy.clickSlateButton('Add link');

    cy.get('.slate-toolbar .link-form-container input').type(
      'https://google.com{enter}',
    );

    cy.log("Removing link");
    cy.setSlateSelection('ideas');
    cy.clickSlateButton('Edit link');
    cy.get('.slate-inline-toolbar .cancel').click();

    cy.log("Re-add link")
    cy.setSlateSelection('Colorless', 'furiously');
    cy.clickSlateButton('Add link');

    cy.get('.slate-toolbar .link-form-container input').type(
      'https://google.com{enter}',
    );

    cy.log("Save");
    cy.toolbarSave();

    cy.log("then the page view should contain a link");
    cy.get('[id="page-document"] p a')
      .should('have.attr', 'href')
      .and('include', 'https://google.com');
    cy.get('[id="page-document"] p a').contains('Colorless green ideas');
    cy.get('[id="page-document"] p a').contains('sleep furiously');
  });
});
