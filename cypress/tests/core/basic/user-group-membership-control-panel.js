describe('User Group Membership Control Panel Test', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.autologin();
    cy.createUser({
      username: 'bob-dabolina',
      fullname: 'Bob Dabolina',
    });
    cy.createGroup({ groupname: 'teachers', users: [] });
  });
  it('Should update group membership', () => {
    cy.visit('/controlpanel/usergroupmembership');
    cy.waitForResourceToLoad('@navigation');
    cy.waitForResourceToLoad('@breadcrumbs');
    cy.waitForResourceToLoad('@actions');
    cy.waitForResourceToLoad('@types');

    cy.get('input[name="member_-_bob-dabolina_-_teachers"]').check({
      force: true,
    });

    cy.reload();

    cy.get('input[name="member_-_bob-dabolina_-_teachers"]').should(
      'be.checked',
    );
  });

  // it('Should not show users and groups if many of them', () => {
  //   // TODO
  // });
});
