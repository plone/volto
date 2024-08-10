describe('Add Content Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', `/**/*?expand*`).as('content');
    // give a logged in editor and the site root
    cy.autologin();
    cy.visit('/');
    cy.wait('@content');
  });

  it('As editor I can change the view to Listing View', function () {
    cy.visit('/events');
    cy.get('#toolbar-more').click();
    cy.findByText('Listing view').click();
    cy.visit('/events');
    cy.wait('@content');
    cy.wait(2000);
    cy.get('main').contains('Event').should('be.visible');
  });

  it('As editor I can change the view to Summary View', function () {
    cy.visit('/events');
    cy.get('#toolbar-more').click();
    cy.findByText('Listing view').click();
    cy.findByText('Summary view').click();
    cy.visit('/events');
    cy.wait('@content');
    cy.wait(2000);
    cy.get('main').contains('Event').should('be.visible');
  });
  it('As editor I can change the view to Tabular View', function () {
    cy.visit('/events');
    cy.get('#toolbar-more').click();
    cy.findByText('Listing view').click();
    cy.findByText('Tabular view').click();
    cy.visit('/events');
    cy.wait('@content');
    cy.wait(2000);
    cy.get('main').contains('Event').should('be.visible');
  });
  it('As editor I can change the view to Album View', function () {
    cy.visit('/events');
    cy.get('#toolbar-more').click();
    cy.findByText('Listing view').click();
    cy.findByText('Album view').click();
    cy.visit('/events');
    cy.wait('@content');
    cy.wait(2000);
    cy.get('main').contains('Event').should('be.visible');
  });
});
