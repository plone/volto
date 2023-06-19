describe('Contact Form Tests', () => {
    beforeEach(() => {
      cy.visit('/');
    });
    it('renders contact Form', function () {
      cy.get('a:contains("Contact")').click();
      cy.get('#fieldset-undefined-field-label-name').type('Myname');
      cy.get('#fieldset-undefined-field-label-from').type('admin@admin.com');
      cy.get('#fieldset-undefined-field-label-subject').type('Loreum Ipsium');
      cy.get('#fieldset-undefined-field-label-message').type(
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      );
      cy.get('button[class="ui basic primary right floated button"]').click();
    });
  });