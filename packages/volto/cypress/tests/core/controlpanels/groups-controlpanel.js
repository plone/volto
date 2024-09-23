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

    cy.wait('@addGroup');
    // then the group section must contains a groupname when I searched the
    // same with the same groupname
    cy.get('input[id="group-search-input"]').clear().type('uni');
    cy.get('.icon.zoom').click();
    cy.waitForResourceToLoad('@navigation');
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
    cy.get('td:nth-child(1) > .checkbox').first().click();
    cy.get('button.ui.item').should('not.have.class', 'disabled').click();
    cy.contains('Delete Group');
    cy.get('button.ui.primary.button').should('have.text', 'OK').click();
    cy.get('input[id="group-search-input"]').clear().type('Administrators');
    cy.get('.icon.zoom').click();
    cy.getIfExists('.groupname').should('not.have.text', 'Administrators');
  });

  it('Should update group roles', () => {
    cy.intercept('PATCH', `**/++api++/@groups/Administrators`).as('editGroup');
    cy.visit('/controlpanel/groups');

    cy.get('td:nth-child(3) > .checkbox').first().click();
    cy.get('Button[id="toolbar-save"]').click();

    cy.wait('@editGroup');
    cy.reload();
    cy.waitForResourceToLoad('@groups');
    cy.get('td:nth-child(3) > .checkbox')
      .first()
      .should('have.class', 'checked');

    // cy.get('[data-group="groups"] div.checkbox')
    //   .first()
    //   .should('have.class', 'checked');
  });
});

describe('Groups Control Panel test for many groups', () => {
  beforeEach(() => {
    cy.intercept('GET', `/**/*?expand*`).as('content');
    cy.autologin();

    cy.createGroup({
      groupname: 'editors',
      title: 'editors',
      users: ['editor'],
    });

    cy.visit('/');
    cy.wait('@content');
    cy.visit('/controlpanel/usergroup');

    cy.get('.content-area').then(($content_area) => {
      if ($content_area.text().indexOf('Settings') > -1) {
        cy.get('input[name="field-many_groups"]').check({
          force: true,
        });
        cy.get('input[name="field-many_users"]').check({
          force: true,
        });
        cy.get('#toolbar-save').click();
      }
    });
  });
  afterEach(() => {
    cy.intercept('GET', `/**/*?expand*`).as('content');
    // not many users, not many groups
    cy.visit('/controlpanel/usergroup');

    cy.get('.content-area').then(($content_area) => {
      if ($content_area.text().indexOf('Settings') > -1) {
        cy.get('input[name="field-many_groups"]').check({
          force: true,
        });
        cy.get('input[name="field-many_users"]').check({
          force: true,
        });
        cy.get('#toolbar-save').click();
      }
    });
  });

  // it('Should not show groups if the many_groups option in enabled', () => {
  //   interceptGroups();
  //   cy.wait('@manyGroups').then((interception) => {
  //     if (expect(interception.response.body.data.many_groups).to.equal(true)) {
  //       cy.get('.ui.secondary.attached.menu div.menu').should('be.empty');
  //     }
  //   });
  // });

  // it('In the case of many groups, It should show a group only when it is searched by a groupname ', () => {
  //   interceptGroups();
  //   cy.wait('@manyGroups').then((interception) => {
  //     if (expect(interception.response.body.data.many_groups).to.equal(true)) {
  //       cy.get('input[id="group-search-input"]').clear().type('editors');
  //       cy.get('.icon.button:first').click();
  //       cy.get('[data-group="groups"] td')
  //         .first()
  //         .should('have.text', 'editors');
  //     }
  //   });
  // });
});
