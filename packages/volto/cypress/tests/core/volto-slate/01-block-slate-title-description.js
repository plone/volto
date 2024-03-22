import { slateBeforeEach } from '../../../support/commands';

describe('Block Tests', () => {
  beforeEach(slateBeforeEach);

  // it('see the initial Title block, type in it, see the updated title in the sidebar, add a Description block, type in it, see the updated description in the sidebar, save the page, see the correct page view, delete the Description block, then see the correct page view', function () {
  // cy.get('.documentFirstHeading').contains('My Page');
  // cy.get('[contenteditable=true]').first().type(' Is Special');
  // cy.get('#field-title').should('have.value', 'My Page Is Special');
  // cy.get('.content-area .slate-editor [contenteditable=true]')
  //   .focus()
  //   .click();
  // cy.get("button[title='Add block']").click();
  // cy.get("[aria-label='Unfold Text blocks']").click();
  // cy.get('button.ui.basic.icon.button.description').click();
  // cy.get('.block.description [contenteditable="true"]').type(
  //   'My Realistic Description',
  // );
  // cy.get('#field-description').should(
  //   'have.value',
  //   'My Realistic Description',
  // );
  // cy.toolbarSave();
  // cy.contains('My Page Is Special');
  // cy.contains('My Realistic Description');
  // cy.get("[aria-label='Edit']").click();
  // cy.get('.block.description [contenteditable="true"]').click();
  // cy.get('button.ui.basic.icon.button.delete-button').click();
  // cy.toolbarSave();
  // cy.get('#page-document p').should('have.length', 1);
  // cy.get('#page-document p').first().should('have.text', '');
  // });
});
