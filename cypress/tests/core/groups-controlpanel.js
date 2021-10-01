describe('Groups Control Panel Test', () => {
  beforeEach(() => {
    // given a logged in editor
    // and a folder that contains a document
    // and the folder contents view
    cy.visit('/');
    cy.autologin();
  });
  it('Should add a new group to controlPanel', () => {
    cy.visit('/controlpanel/groups');
    cy.waitForResourceToLoad('@navigation');
    cy.waitForResourceToLoad('@breadcrumbs');
    cy.waitForResourceToLoad('@actions');
    cy.waitForResourceToLoad('@types');
    cy.waitForResourceToLoad('@groups');
    // when I added a group from controlPanel
    cy.get('Button[id="toolbar-add"]').click();
    cy.get('input[id="field-title"]').clear().type('demo-title');
    cy.get('input[id="field-description"]').clear().type('Demo group');
    cy.get('input[id ="field-groupname"]').clear().type('uniquename');
    cy.get('input[id="field-email"]').clear().type('test@gmail.com');
    cy.get('button[title="Save"]').click(-50, -50, { force: true });

    // then the group section must contains a groupname when I searched the
    // same with the same groupname
    cy.get('input[id="group-search-input"]').clear().type('uni');
    cy.get('.icon.button:first').click();
    cy.get('tr td').first().should('have.text', 'uniquename');
  });

  it('Should show error from backend when add Group fails', () => {
    cy.intercept('POST', '**groups', {
      statusCode: 400,
      body: {
        message: 'Error from backend.',
      },
    }).as('saveGroup');
    cy.visit('/controlpanel/groups');
    // when I added a group from controlPanel
    cy.get('Button[id="toolbar-add"]').click();
    cy.get('input[id="field-title"]').clear().type('demo-title');
    cy.get('input[id="field-description"]').clear().type('Demo group');
    cy.get('input[id ="field-groupname"]').clear().type('uniquename');
    cy.get('input[id="field-email"]').clear().type('test@gmail.com');
    cy.get('button[title="Save"]').click(-50, -50, { force: true });
    cy.wait('@saveGroup').then((intercepted) => {
      cy.contains(intercepted.response.body.message);
    });
  });

  it('Should delete a group from controlPanel', () => {
    cy.visit('/controlpanel/groups');
    cy.waitForResourceToLoad('@navigation');
    cy.waitForResourceToLoad('@breadcrumbs');
    cy.waitForResourceToLoad('@actions');
    cy.waitForResourceToLoad('@types');
    cy.waitForResourceToLoad('@groups');

    // select first group with name, delete it and search if its exists or not!
    cy.get('div[role="listbox"]').first().click();
    cy.get('div[role="option"]').first().click();
    cy.contains('Delete Group');
    cy.get('button.ui.primary.button').should('have.text', 'OK').click();
    cy.get('input[id="group-search-input"]').clear().type('Administrators');
    cy.get('.icon.button:first').click();
    cy.getIfExists('.groupname').should('not.have.text', 'Administrators');
  });

  it('Should update group roles', () => {
    cy.visit('/controlpanel/groups');
    cy.waitForResourceToLoad('@navigation');
    cy.waitForResourceToLoad('@breadcrumbs');
    cy.waitForResourceToLoad('@actions');
    cy.waitForResourceToLoad('@types');

    cy.get('[data-group="groups"] input[type="checkbox"')
      .first()
      .check({ force: true });
    cy.get('Button[id="toolbar-save"]').click();
    cy.reload();
    cy.get('[data-group="groups"] div.checkbox')
      .first()
      .should('have.class', 'checked');
  });
});
