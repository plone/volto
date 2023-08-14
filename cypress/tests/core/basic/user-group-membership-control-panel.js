const init = () => {
  cy.autologin();
  cy.intercept('GET', `/**/*?expand*`).as('content');
  cy.intercept('GET', `/**/@controlpanels/usergroup`).as('usergroup');

  cy.visit('/');
  cy.wait('@content');
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
};

describe('User Group Membership Control Panel test for NOT many users and many groups', () => {
  beforeEach(() => {
    init();
  });
  it('Should update group membership for: one user and one group', () => {
    cy.visit('/controlpanel/usergroupmembership');
    cy.wait(2000);
    cy.wait('@usergroup');

    cy.get('.usergroupmembership').then(($segmentUsergroupmembership) => {
      if ($segmentUsergroupmembership.hasClass('upgrade-info')) {
        // Panel not supported.
      } else {
        cy.get('div.checkbox_cooks input').check({
          force: true,
        });
        cy.reload();
        cy.get('div.checkbox_cooks input').should('be.checked');
      }
    });
  });
  it('I can search for a user and show his groups', () => {
    cy.visit('/controlpanel/usergroupmembership');
    cy.wait(2000);
    cy.wait('@usergroup');

    cy.get('.usergroupmembership').then(($segmentUsergroupmembership) => {
      if ($segmentUsergroupmembership.hasClass('upgrade-info')) {
        // Panel not supported.
      } else {
        // Show user
        cy.get('#controlpanel_filterUsers').type('fröhlich');
        cy.contains('Max');

        // Check groups
        cy.get('#group-search-input').click();
        cy.contains('teachers');

        // Show membership of group "Administrators"
        cy.get('#group-search-input').type('Administrators');
        cy.contains('Administrators');
        cy.should('not.contain', 'teachers');
      }
    });
  });
});

describe('User Group Membership Control Panel test for MANY users and MANY groups', () => {
  beforeEach(() => {
    // many users, many groups
    // cy.autologin();
    init();

    cy.visit('/controlpanel/usergroup');
    cy.get('input[name="field-many_groups"]').check({
      force: true,
    });
    cy.get('input[name="field-many_users"]').check({
      force: true,
    });
    cy.get('#toolbar-save').click();
    // cy.get('.content-area').then(($content_area) => {
    //   console.log($content_area);
    //   if ($content_area.text().indexOf('Settings') > -1) {
    //     cy.get('input[name="field-many_groups"]').check({
    //       force: true,
    //     });
    //     cy.get('input[name="field-many_users"]').check({
    //       force: true,
    //     });
    //     cy.get('#toolbar-save').click();
    //   }
    // });
  });

  it('Should not show users and groups if many of them', () => {
    cy.visit('/controlpanel/usergroupmembership');
    cy.wait(2000);
    cy.wait('@usergroup');

    cy.get('.usergroupmembership').then(($segmentUsergroupmembership) => {
      if ($segmentUsergroupmembership.hasClass('upgrade-info')) {
        // Panel not supported.
      } else {
        cy.contains('Please search for users or use the filters.');
      }
    });
  });

  it('I can search for a user and show his groups', () => {
    cy.visit('/controlpanel/usergroupmembership');
    cy.wait(2000);

    cy.get('.usergroupmembership').then(($segmentUsergroupmembership) => {
      if ($segmentUsergroupmembership.hasClass('upgrade-info')) {
        // Panel not supported.
      } else {
        // Show user
        cy.get('#controlpanel_filterUsers').type('fröhlich');
        cy.contains('Max');

        // Check groups
        cy.get('#group-search-input').click();
        cy.contains('teachers');

        // Show membership of group "Administrators"
        cy.get('#group-search-input').type('Administrators');
        cy.contains('Administrators');
        cy.should('not.contain', 'teachers');
      }
    });
  });
  afterEach(() => {
    // not many users, not many groups
    cy.visit('/controlpanel/usergroup');
    cy.wait('@usergroup');
    cy.wait(2000);

    cy.get('.content-area').then(($content_area) => {
      if ($content_area.text().indexOf('Settings') > -1) {
        cy.get('input[name="field-many_groups"]').uncheck({
          force: true,
        });
        cy.get('input[name="field-many_users"]').uncheck({
          force: true,
        });
        cy.get('#toolbar-save').click();
      }
    });
  });
});
