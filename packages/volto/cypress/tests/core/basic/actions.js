describe('actions Tests', () => {
  beforeEach(() => {
    cy.autologin();
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-page-1',
      contentTitle: 'My Page-1',
      allow_discussion: true,
    });
    cy.visit('/contents');
  });
  it('copy', function () {
    cy.get('tr[aria-label="/my-page-1"]').within(() => {
      cy.get('svg[class="icon dropdown-popup-trigger"]').click();
    });
    cy.get('a[class="item right-dropdown icon-align"]').eq(2).click();
    cy.get('button[class="ui button icon item"]').click();
    cy.visit('/contents');
    cy.get('tr[aria-label="/copy_of_my-page-1"]').within(() => {
      cy.get('a[class="icon-align-name"]').should(
        'have.attr',
        'href',
        '/copy_of_my-page-1/contents',
      );
    });
  });
  it('delete', function () {
    cy.get('tr[aria-label="/my-page-1"]').within(() => {
      cy.get('button[class="ui basic icon button"]').click({ multiple: true });
    });
    cy.get('button[class="ui button icon item"]').eq(6).click();
    cy.get('button[class="ui primary button"]').findByText('Delete').click();
    cy.visit('/contents');
    cy.get('tr').should('not.contain', '/my-page-1');
  });
  it('cut', function () {
    cy.get('tr[aria-label="/my-page-1"]').within(() => {
      cy.get('svg[class="icon dropdown-popup-trigger"]').click();
    });
    cy.get('a[class="item right-dropdown icon-align"]').eq(1).click();
    cy.get('button[class="ui button icon item"]').click();
    cy.visit('/contents');
    cy.get('tr[aria-label="/my-page-1"]').within(() => {
      cy.get('a[class="icon-align-name"]').should(
        'have.attr',
        'href',
        '/my-page-1/contents',
      );
    });
  });
  it('rename', function () {
    cy.get('tr[aria-label="/my-page-1"]').within(() => {
      cy.get('button[class="ui basic icon button"]').click({ multiple: true });
    });
    cy.get('button[class="ui button icon item"]').eq(0).click();
    cy.get('#field-0_title').clear().type('my-page-rename');
    cy.get('#field-0_id').clear().type('my-page-rename');
    cy.get(
      'button[class="ui basic circular primary right floated button"]',
    ).click();
    cy.get('tr[aria-label="/my-page-rename"]').within(() => {
      cy.get('a[class="icon-align-name"]').should(
        'have.attr',
        'href',
        '/my-page-rename/contents',
      );
    });
  });
});
