import { first } from 'lodash';

describe('User Control Panel Test', () => {
  beforeEach(() => {
    // given a logged in editor
    // and a folder that contains a document
    // and the folder contents view
    cy.visit('/');
    cy.autologin();
  });
  it('Should add User to controlPanel', () => {
    cy.visit('/controlpanel/users');
    cy.waitForResourceToLoad('@navigation');
    cy.waitForResourceToLoad('@breadcrumbs');
    cy.waitForResourceToLoad('@actions');
    cy.waitForResourceToLoad('@types');
    // when I added a user from controlPanel
    cy.get('Button[id="toolbar-add"]').click();
    cy.get('input[id="field-username"]').clear().type('iFlameing');
    cy.get('input[id="field-fullname"]').clear().type('Alok Kumar');
    cy.get('input[id ="field-email"]').clear().type('info@example.com');
    cy.get('input[id="field-password"]').clear().type('test@test');
    cy.get('button[title="Save"]').click(-50, -50, { force: true });

    // then the user section must contains a fullname when I searched the
    // same with the same username
    cy.get('input[id="user-search-input"]').clear().type('i');
    cy.get('.icon.zoom').click();
    cy.contains('Alok Kumar');
  });

  it('Should show error from backend when add User fails', () => {
    cy.intercept('POST', '**/@users', {
      statusCode: 400,
      body: {
        error: {
          message: 'Error from backend.',
        },
      },
    }).as('saveUser');
    cy.visit('/controlpanel/users');
    // when I added a user from controlPanel
    cy.get('Button[id="toolbar-add"]').click();
    cy.get('input[id="field-username"]').clear().type('iFlameing');
    cy.get('input[id="field-fullname"]').clear().type('Alok Kumar');
    cy.get('input[id ="field-email"]').clear().type('info@example.com');
    cy.get('input[id="field-password"]').clear().type('test@test');
    cy.get('button[title="Save"]').click(-50, -50, { force: true });
    cy.wait('@saveUser').then((intercepted) => {
      cy.contains(intercepted.response.body.error.message);
    });
  });

  it('Should delete User from controlPanel', () => {
    cy.visit('/controlpanel/users');
    cy.waitForResourceToLoad('@navigation');
    cy.waitForResourceToLoad('@breadcrumbs');
    cy.waitForResourceToLoad('@actions');
    cy.waitForResourceToLoad('@types');
    cy.waitForResourceToLoad('@users');

    //add a user first
    cy.get('Button[id="toolbar-add"]').click();
    cy.get('input[id="field-username"]').clear().type('iFlameing');
    cy.get('input[id="field-fullname"]').clear().type('Alok Kumar');
    cy.get('input[id ="field-email"]').clear().type('info@example.com');
    cy.get('input[id="field-password"]').clear().type('test@test');
    cy.get('button[title="Save"]').click(-50, -50, { force: true });

    cy.get('td:nth-child(1) > .checkbox').first().click();
    cy.get('button.ui.item').should('not.have.class', 'disabled').click();
    cy.contains('test_user_1');
    cy.get('div.modal .primary').click();

    cy.get('input[id="user-search-input"]').clear().type('test');
    cy.get('.icon.zoom').click();
    cy.getIfExists('.fullname').should('not.have.text', 'test');
  });

  it('Should update user roles', () => {
    cy.visit('/controlpanel/users');
    cy.waitForResourceToLoad('@navigation');
    cy.waitForResourceToLoad('@breadcrumbs');
    cy.waitForResourceToLoad('@actions');
    cy.waitForResourceToLoad('@types');

    cy.get('Button[id="toolbar-add"]').click();
    cy.get('input[id="field-username"]').clear().type('iFlameing');
    cy.get('input[id="field-fullname"]').clear().type('Alok Kumar');
    cy.get('input[id ="field-email"]').clear().type('info@example.com');
    cy.get('input[id="field-password"]').clear().type('test@test');
    cy.get('button[title="Save"]').click(-50, -50, { force: true });

    cy.get('td:nth-child(3) > .checkbox').first().click();

    cy.get('Button[id="toolbar-save"]').click();

    cy.reload();

    cy.get('td:nth-child(3) > .checkbox')
      .first()
      .should('have.class', 'checked');
  });
});
