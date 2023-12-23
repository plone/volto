const init = () => {
  cy.intercept('GET', `/**/*?expand*`).as('content');
  cy.intercept('GET', `/**/@controlpanels/usergroup`).as('usergroup');

  cy.autologin();
  cy.createUser({
    username: 'bob',
    fullname: 'Bob Dabolina',
  });
  cy.createUser({
    username: 'editor',
    fullname: 'Peet Editor',
  });
  cy.createUser({
    username: 'max',
    fullname: 'Max Fröhlich',
  });
  cy.createGroup({
    groupname: 'teachers',
    title: 'teachers',
    users: ['max'],
  });
  cy.createGroup({
    groupname: 'editors',
    title: 'editors',
    users: ['editor'],
  });
  cy.createGroup({
    groupname: 'cooks',
    title: 'cooks',
  });
  cy.visit('/');
  cy.wait('@content');
};

describe('User Group Membership Control Panel test for NOT many users and many groups', () => {
  beforeEach(() => {
    init();
  });
  it('Should update group membership for: one user and one group', () => {
    cy.visit('/controlpanel/usergroupmembership');
    cy.wait('@usergroup');

    cy.get('.usergroupmembership').then(($segmentUsergroupmembership) => {
      if ($segmentUsergroupmembership.hasClass('upgrade-info')) {
        // Panel not supported.
      } else {
        cy.get('#source-row-max div.checkbox_cooks input').check({
          force: true,
        });
        cy.reload();
        cy.get('#source-row-max div.checkbox_cooks input').should('be.checked');
      }
    });
  });
  it('I can search for a user and show his groups', () => {
    cy.visit('/controlpanel/usergroupmembership');
    cy.wait('@usergroup');

    cy.get('.usergroupmembership').then(($segmentUsergroupmembership) => {
      if ($segmentUsergroupmembership.hasClass('upgrade-info')) {
        // Panel not supported.
      } else {
        // Show user
        cy.get('#user-search-input').type('fröhlich');
        cy.contains('Max');

        // Show membership of group "Administrators"
        cy.get('input[id="group-search-input"]').type('Adm');
        cy.contains('Administrators');
        cy.get('.label-options').should('not.contain', 'teachers');

        // Show also groups membersip of groups of users
        cy.get('input[name="addJoinedGroups"]').check({
          force: true,
        });
        cy.get('.label-options').contains('teachers');
      }
    });
  });
});

describe('User Group Membership Control Panel test for MANY users and MANY groups', () => {
  beforeEach(() => {
    init();
    // many users, many groups
    cy.visit('/controlpanel/usergroup');
    cy.wait('@usergroup');

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

  it('Should not show users and groups if many of them', () => {
    cy.visit('/controlpanel/usergroupmembership');
    cy.wait('@usergroup');

    cy.get('.usergroupmembership').then(($segmentUsergroupmembership) => {
      if ($segmentUsergroupmembership.hasClass('upgrade-info')) {
        // Panel not supported.
      } else {
        cy.contains('Please search for users');
      }
    });
  });

  it('I can search for a user and show his groups', () => {
    cy.visit('/controlpanel/usergroupmembership');
    cy.wait('@usergroup');

    cy.get('.usergroupmembership').then(($segmentUsergroupmembership) => {
      if ($segmentUsergroupmembership.hasClass('upgrade-info')) {
        // Panel not supported.
      } else {
        // Show user
        cy.get('#user-search-input').type('fröhlich').type('{enter}');
        cy.contains('Max');

        cy.get('input[name="addJoinedGroups"]').check({
          force: true,
        });
        cy.get('.label-options').contains('teachers');

        // Show users of group "Editors"
        cy.get('form.search_users button').click();
        cy.get('#groupfilter-search-input').type('edit').type('{enter}');
        cy.waitForResourceToLoad('@groups');
        cy.get('input[name="filter_option_editors"]').check({
          force: true,
        });
        cy.contains('Peet Editor');
      }
    });
  });

  afterEach(() => {
    // not many users, not many groups
    cy.visit('/controlpanel/usergroup');
    cy.wait('@usergroup');

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
});
