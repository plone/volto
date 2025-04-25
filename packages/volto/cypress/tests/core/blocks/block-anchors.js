import { slateBeforeEach } from '../../../support/volto-slate';

describe('Block Tests: Anchors', () => {
  beforeEach(slateBeforeEach);

  it('Add Block: add content to TOC', () => {
    // Change page title
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Slate Heading Anchors');
    cy.getSlate().click();

    // Add TOC block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get(".blocks-chooser .ui.form .field.searchbox input[type='text']").type(
      'table of contents',
    );
    cy.get('.button.toc').click();

    // Add headings
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get(".blocks-chooser .ui.form .field.searchbox input[type='text']").type(
      'text',
    );
    cy.get('.button.slate').click();
    cy.get('.ui.drag.block.inner.slate').click().type('Title 1').click();
    cy.get('.ui.drag.block.inner.slate span span span').setSelection('Title 1');
    cy.get('.slate-inline-toolbar .button-wrapper a[title="Title"]').click({
      force: true,
    });
    cy.get('.ui.drag.block.inner.slate').click().type('{enter}');

    cy.get('.ui.drag.block.inner.slate').eq(1).click().type('Title 2').click();
    cy.get('.ui.drag.block.inner.slate span span span')
      .eq(1)
      .setSelection('Title 2');
    cy.get('.slate-inline-toolbar .button-wrapper a[title="Title"]').click({
      force: true,
    });
    cy.get('.ui.drag.block.inner.slate').eq(1).click().type('{enter}');

    // Save page
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/my-page');

    // Check if the page contains the TOC and scrolls to each entry on click
    cy.contains('Slate Heading Anchors');
    cy.get('h2[id="title-1"]').contains('Title 1');
    cy.get('h2[id="title-2"]').contains('Title 2');
    cy.get('.table-of-contents a[href="/my-page#title-1"]').click();
    cy.get('h2[id="title-1"]').scrollIntoView().should('be.visible');
    cy.get('.table-of-contents a[href="/my-page#title-2"]').click();
    cy.get('h2[id="title-2"]').scrollIntoView().should('be.visible');
  });

  it('Add Block: add content to TOC with special characters', () => {
    // Change page title
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Slate Heading Anchors with special characters');
    cy.getSlate().click();

    // Add TOC block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get(".blocks-chooser .ui.form .field.searchbox input[type='text']").type(
      'table of contents',
    );
    cy.get('.button.toc').click();

    // Add headings
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get(".blocks-chooser .ui.form .field.searchbox input[type='text']").type(
      'text',
    );
    cy.get('.button.slate').click();

    cy.get('.ui.drag.block.inner.slate').click().type('Title 1').click();
    cy.get('.ui.drag.block.inner.slate span span span').setSelection('Title 1');
    cy.get('.slate-inline-toolbar .button-wrapper a[title="Title"]').click({
      force: true,
    });
    cy.get('.ui.drag.block.inner.slate').click().type('{enter}');

    cy.get('.ui.drag.block.inner.slate')
      .eq(1)
      .click()
      .type('Title 2 ü à')
      .click();
    cy.get('.ui.drag.block.inner.slate span span span')
      .eq(1)
      .setSelection('Title 2 ü à');
    cy.get('.slate-inline-toolbar .button-wrapper a[title="Title"]').click({
      force: true,
    });
    cy.get('.ui.drag.block.inner.slate').eq(1).click().type('{enter}');

    // Save page
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/my-page');

    // Check if the page contains the TOC and scrolls to each entry on click
    cy.contains('Slate Heading Anchors');
    cy.get('h2[id="title-1"]').contains('Title 1');
    cy.get('h2[id="title-2-u-a"]').contains('Title 2 ü à');
    cy.get('.table-of-contents a[href="/my-page#title-1"]').click();
    cy.get('h2[id="title-1"]').scrollIntoView().should('be.visible');
    cy.get('.table-of-contents a[href="/my-page#title-2-u-a"]').click();
    cy.get('h2[id="title-2-u-a"]').scrollIntoView().should('be.visible');
  });
});
