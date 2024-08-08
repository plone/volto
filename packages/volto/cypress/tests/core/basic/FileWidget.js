describe('FileWidget Test', () => {
  beforeEach(() => {
    cy.autologin();
    cy.visit('/');
  });

  it('As editor I am able to see the preview of uploading image', () => {
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-news-item').click();
    cy.get('input[id="field-image"]').attachFile('image.png', {
      subjectType: 'input',
    });
    cy.get('#field-image-image').should('have.attr', 'src');
  });
});
