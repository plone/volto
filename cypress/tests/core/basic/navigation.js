describe('Navigation', () => {
  beforeEach(() => {
    cy.intercept('GET', `/**/*?expand*`).as('content');
    cy.autologin();
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-page',
      contentTitle: 'My Page',
    });
    cy.visit('/');
    cy.wait('@content');
  });
  it('Given an private page, when I logout it is not present in nav anymore', function () {
    cy.findByLabelText('Personal tools').click();
    cy.get('#toolbar-logout').click();
    cy.wait(1000);
    cy.get('#navigation a.item').contains('My Page').should('not.exist');
  });
});

describe('Navigation menu', () => {
  context('menu hamburger', () => {
    beforeEach(() => {
      cy.intercept('GET', `/**/*?expand*`).as('content');
      cy.visit('/');
      cy.wait('@content');
    });
    const hambClass =
      'nav.navigation .hamburger-wrapper.mobile.tablet.only button.hamburger';
    it('iphone-xr', () => {
      cy.viewport('iphone-xr');
      cy.get(hambClass).should('be.visible');
      cy.get(hambClass).click();
      cy.get(`${hambClass}.is-active`).should('be.visible');
      cy.get('nav.navigation a.item.active').contains('Home');
      cy.isInViewport(`${hambClass}.is-active`);

      cy.get('body')
        .invoke('css', 'overflow')
        .then((ov) => {
          expect(ov).to.eq('hidden');
        });
      cy.get('nav .ui.pointing.secondary.stackable.menu')
        .invoke('css', 'flex-direction')
        .then((ov) => {
          expect(ov).to.eq('column');
        });
    });

    it('ipad-mini', () => {
      cy.viewport('ipad-mini');
      cy.get(hambClass).should('be.visible');
      cy.get(hambClass).click();
      cy.get(`${hambClass}.is-active`).should('be.visible');
      cy.get('nav.navigation a.item.active').contains('Home');
      cy.isInViewport(`${hambClass}.is-active`);

      cy.get('body')
        .invoke('css', 'overflow')
        .then((ov) => {
          expect(ov).to.eq('hidden');
        });
    });
  });
});
