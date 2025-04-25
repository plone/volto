describe('Contact Form Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('renders contact Form', function () {
    cy.get('a:contains("Contact")').click();
    cy.get('input[name="name"]').type('Myname');
    cy.get('input[name="from"]').type('admin@admin.com');
    cy.get('input[name="subject"]').type('Loreum Ipsium');
    cy.get('textarea[name="message"]').type(
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    );

    cy.get('button[class="ui basic primary right floated button"]').click();
  });
});
