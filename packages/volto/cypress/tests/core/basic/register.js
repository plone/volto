describe('Register Tests', () => {
  beforeEach(() => {
    cy.enableSelfRegister();
    cy.intercept('GET', '@userschema').as('userschema');
  });
  it('Registration form is built according to the schema of the backend', function () {
    let userschema = {};

    cy.visit('/register');
    cy.wait('@userschema').then((res) => {
      userschema = res.response.body;
      Object.keys(userschema.properties).forEach((item) => {
        cy.get(`#fieldset-undefined-field-label-${item}`).should(
          'have.text',
          userschema.properties[item].title,
        );
        cy.get(`.field-wrapper-${item} .help`).should(
          'have.text',
          userschema.properties[item].description,
        );
      });
    });
  });
});
