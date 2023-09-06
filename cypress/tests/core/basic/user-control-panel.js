describe('User Control Panel Test', () => {
  beforeEach(() => {
    cy.intercept('GET', `/**/*?expand*`).as('content');
    // given a logged in editor
    // and a folder that contains a document
    // and the folder contents view
    cy.autologin();
    cy.visit('/');
    cy.wait('@content');
  });
  it('Should add User to controlPanel', () => {
    cy.visit('/controlpanel/users');

    // when I added a user from controlPanel
    cy.get('Button[id="add-user"]').click();
    cy.get('input[id="field-username"]').clear().type('testuser0');
    cy.get('input[id="field-fullname"]').clear().type('test user 0');
    cy.get('input[id ="field-email"]').clear().type('testuser0@example.com');
    cy.get('input[id="field-password"]').clear().type('test@test');
    cy.get('button[title="Save"]').click(-50, -50, { force: true });
    // Create 3 more users with different usernames and fullnames
    for (let i = 1; i < 3; i++) {
      cy.get('Button[id="toolbar-add"]').click();
      cy.get('input[id="field-username"]')
        .clear()
        .type('testuser' + i);
      cy.get('input[id="field-fullname"]')
        .clear()
        .type('test user ' + i);
      cy.get('input[id ="field-email"]')
        .clear()
        .type('testuser' + i + '@example.com');
      cy.get('input[id="field-password"]').clear().type('test@test');
      cy.get('button[title="Save"]').click(-50, -50, { force: true });
    }

    // Check total users added
    cy.get('tbody[data-user="users"] tr').should('have.length', 4); //Contains the 2 users already created row as well

    // Check if the user added is present in the list
    // user with user id containing 0
    cy.get('input[id="user-search-input"]').clear().type('0');
    cy.get('.icon.button:first').click();
    cy.get('.fullname').should('have.text', 'test user 0');
    // user with user id containing 3
    cy.get('input[id="user-search-input"]').clear().type('2');
    cy.get('.icon.button:first').click();
    cy.get('.fullname').should('have.text', 'test user 2');
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

  it('Should edit and delete User from controlPanel', () => {
    cy.visit('/controlpanel/users');

    for (let i = 0; i < 3; i++) {
      cy.get('Button[id="toolbar-add"]').click();
      cy.get('input[id="field-username"]')
        .clear()
        .type('testuser' + i);
      cy.get('input[id="field-fullname"]')
        .clear()
        .type('test user ' + i);
      cy.get('input[id ="field-email"]')
        .clear()
        .type('testuser' + i + '@example.com');
      cy.get('input[id="field-password"]').clear().type('test@test');
      cy.get('button[title="Save"]').click(-50, -50, { force: true });
    }

    //Select user and update the fullname
    cy.get('tbody[data-user="users"] tr:nth-of-type(3) > td.fullname').should(
      'have.text',
      'test user 1',
    );
    cy.get(
      'tbody[data-user="users"] tr:nth-of-type(3) div[role="listbox"]',
    ).click();
    cy.get(
      'tbody[data-user="users"] tr:nth-of-type(3) div[role="option"][data-key^="edit-"]',
    ).click({
      force: true,
    });
    cy.get('input[id="field-fullname"]').clear().type('test user 1 updated');
    cy.get('button[title="Save"]').click(-50, -50, { force: true });
    cy.get('input[id="user-search-input"]').clear().type('1');
    cy.get('.icon.button:first').click();
    cy.get('.fullname').should('have.text', 'test user 1 updated');

    // select test user 0 with name, delete it and search if its exists or not!
    cy.get('input[id="user-search-input"]').clear();
    cy.get('.icon.button:first').click();
    cy.get('tbody[data-user="users"] > tr:nth-of-type(3) > td.fullname').should(
      'have.text',
      'test user 1 updated',
    );
    cy.get(
      'tbody[data-user="users"] tr:nth-of-type(3) div[role="listbox"]',
    ).click();
    cy.get(
      'tbody[data-user="users"] tr:nth-of-type(3) div[role="option"][data-key^="delete-"]',
    ).click({
      force: true,
    });
    cy.contains('Delete User');
    cy.get('button.ui.primary.button').should('have.text', 'OK').click();
    cy.get('input[id="user-search-input"]').clear().type('0');
    cy.get('.icon.button:first').click();
    cy.getIfExists('.fullname').should('not.have.text', 'test user 0');

    cy.get('input[id="user-search-input"]').clear();
    cy.get('.icon.button:first').click();
  });

  it('Should update user roles', () => {
    cy.visit('/controlpanel/users');
    for (let i = 0; i < 2; i++) {
      cy.get('Button[id="toolbar-add"]').click();
      cy.get('input[id="field-username"]')
        .clear()
        .type('testuser' + i);
      cy.get('input[id="field-fullname"]')
        .clear()
        .type('test user ' + i);
      cy.get('input[id ="field-email"]')
        .clear()
        .type('testuser' + i + '@example.com');
      cy.get('input[id="field-password"]').clear().type('test@test');
      cy.get('button[title="Save"]').click(-50, -50, { force: true });
    }
    //Select user and update a role from the checkbox
    cy.get('tbody[data-user="users"] tr:nth-of-type(3) input[type="checkbox"]')
      .first()
      .check({ force: true });

    cy.get('Button[id="toolbar-save"]').click();
    cy.reload();

    cy.get('tbody[data-user="users"] tr:nth-of-type(3) input[type="checkbox"]')
      .first()
      .parent()
      .should('have.class', 'checked');
  });
});
describe('User Control Panel test for  many users', () => {
  beforeEach(() => {
    cy.intercept('GET', `/**/*?expand*`).as('content');

    cy.autologin();

    cy.visit('/');
    cy.wait('@content');
  });

  it('Should not show users if the many_users option in enabled', () => {
    cy.intercept(
      {
        method: 'GET',
        url: '**/usergroup',
      },
      {
        statusCode: 200,
        body: {
          data: {
            many_users: true,
            many_groups: false,
          },
        },
      },
    ).as('manyUsers');
    cy.visit('/controlpanel/users');
    cy.wait('@manyUsers').then((intercepted) => {
      if (expect(intercepted.response.body.data.many_users).to.equal(true)) {
        cy.get('.ui.secondary.attached.menu div.menu').should('be.empty');
      }
    });
  });
  it('In the case of many users, It should show a user only when it is searched by a username ', () => {
    cy.intercept(
      {
        method: 'GET',
        url: '**/usergroup',
      },
      {
        statusCode: 200,
        body: {
          data: {
            many_users: true,
            many_groups: false,
          },
        },
      },
    ).as('manyUsers');
    cy.visit('/controlpanel/users');
    cy.wait('@manyUsers').then((interception) => {
      if (expect(interception.response.body.data.many_users).to.equal(true)) {
        cy.get('input[id="user-search-input"]').clear();
        cy.get('.icon.button:first').click();
        cy.contains('Too many users found.');
      }
    });
  });
});
