describe('Groups Control Panel Test', () => {
  beforeEach(() => {
    cy.intercept('GET', `/**/*?expand*`).as('content');
    // given a logged in editor
    // and a folder that contains a document
    // and the folder contents view
    cy.autologin();
    cy.visit('/');
    cy.wait('@content');
  });

  it('Should add a new group to controlPanel', () => {
    cy.intercept('POST', '/plone/++api++/@groups').as('addGroup');
    cy.visit('/controlpanel/groups');

    cy.waitForResourceToLoad('@groups');

    // when I added a group from controlPanel
    cy.get('Button[id="toolbar-add"]').click();
    cy.get('input[id="field-title"]').clear().type('demo-title');
    cy.get('input[id="field-description"]').clear().type('Demo group');
    cy.get('input[id ="field-groupname"]').clear().type('uniquename');
    cy.get('input[id="field-email"]').clear().type('test@gmail.com');
    cy.get('button[title="Save"]').click(-50, -50, { force: true });

    cy.waitForResourceToLoad('@groups');
    cy.contains('uniquename');
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

    // select first group with name, delete it and search if its exists or not!
    cy.get('div[role="listbox"]').first().click();
    cy.get('div[role="option"][data-key^="onDelete-"]').first().click();
    cy.contains('Delete Group');
    cy.get('button.ui.primary.button').should('have.text', 'OK').click();
    cy.get('input[id="group-search-input"]').clear().type('Administrators');
    cy.get('.icon.button:first').click();
    cy.getIfExists('.groupname').should('not.have.text', 'Administrators');
  });

  it('Should update group roles', () => {
    cy.intercept('PATCH', `**/++api++/@groups/Administrators`).as('editGroup');
    cy.visit('/controlpanel/groups');

    cy.get('[data-group="groups"] input[type="checkbox"')
      .first()
      .check({ force: true });
    cy.get('Button[id="toolbar-save"]').click();

    cy.wait('@editGroup');
    cy.reload();
    cy.waitForResourceToLoad('@groups');

    cy.get('[data-group="groups"] div.checkbox')
      .first()
      .should('have.class', 'checked');
  });

  it('Should edit group details', () => {
    cy.intercept('PATCH', `**/++api++/@groups/Administrators`).as('editGroup');
    cy.visit('/controlpanel/groups');

    cy.get('div[role="listbox"]').first().click();
    cy.get('div[role="option"][data-key^="onEdit-"]').first().click();
    cy.get('input[id="field-title"]').clear().type('admin-title');
    cy.get('input[id="field-description"]').clear().type('Is Admin');
    cy.get('input[id="field-email"]').clear().type('admin@gmail.com');

    cy.get('button[title="Save"]').click(-50, -50, { force: true });

    cy.wait('@editGroup');
    cy.reload();
    cy.waitForResourceToLoad('@groups');

    // cy.get('input[id="group-search-input"]').clear().type('Admininstrators');
    // cy.get('.icon.button:first').click();
    cy.get('div[role="listbox"]').first().click();
    cy.get('div[role="option"][data-key^="onEdit-"]').first().click();
    cy.get('input[id="field-title"]').should('have.value', 'admin-title');
    cy.get('input[id="field-description"]').should('have.value', 'Is Admin');
  });
});

describe('Groups Control Panel test for many groups', () => {
  beforeEach(() => {
    cy.intercept('GET', `/**/*?expand*`).as('content');
    cy.intercept('GET', `/**/@controlpanels/usergroup`).as('usergroup');
    cy.autologin();

    cy.createGroup({
      groupname: 'editors',
      title: 'editors',
      users: ['editor'],
    });

    cy.visit('/');
    cy.wait('@content');

    cy.visit('/controlpanel/usergroup');
    cy.get('input[name="field-many_groups"]').check({
      force: true,
    });
    cy.get('input[name="field-many_users"]').check({
      force: true,
    });
    cy.get('#toolbar-save').click();
  });

  it('Should not show groups if the many_groups option in enabled', () => {
    cy.visit('/controlpanel/groups');
    cy.contains('Search groups by title');
  });

  it('In the case of many groups, It should show a group only when it is searched by a groupname ', () => {
    cy.visit('/controlpanel/groups');
    cy.get('input[id="group-search-input"]').clear().type('editors');
    cy.get('.icon.button:first').click();
    cy.get('[data-group="groups"] td').first().should('have.text', 'editors');
  });

  it('Should show message if blank search is done', () => {
    cy.visit('/controlpanel/groups');
    cy.get('input[id="group-search-input"]').clear();
    cy.get('.icon.button:first').click();
    cy.contains('Too many groups found.');
  });

  afterEach(() => {
    cy.visit('/controlpanel/usergroup');
    cy.get('input[name="field-many_groups"]').uncheck({
      force: true,
    });
    cy.get('input[name="field-many_users"]').uncheck({
      force: true,
    });
    cy.get('#toolbar-save').click();
  });
});
