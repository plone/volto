context('Actions', () => {
  beforeEach(() => {
    cy.autologin();
  });

  it('As a site administrator i can change the default language', function() {
    cy.visit('/');
    cy.get('#toolbar-personal').click();
    cy.get('.pastanaga-menu-list ul > :nth-child(3) > a').click();
    cy.get(
      ':nth-child(3) > .six > .row > :nth-child(2) > a > .ui > .content',
    ).click();
    cy.get(':nth-child(1) > .pointing > :nth-child(2)').click();

    cy.get('.css-hnwiky > .css-1dvrfad').click();
    cy.get('#react-select-2-option-18 > div').click();

    // cy.get(':nth-child(n) > .css-4clspr > .css-19bqh2r > path').click();

    cy.get('.css-1bd20dz > .css-1dvrfad').click();
    cy.get('#react-select-3-option-18 > div').click();
    cy.get(':nth-child(2) > .css-10ku62j').click();
    cy.get('#react-select-3-option-13 > div').click();

    // cy.get(
    //   '#general-default_language > .ui > :nth-child(1) > .four > .wrapper',
    // ).click();

    // the following commands fail because the elements are covered by another element <label>
    // cy.get('[name=field-use_combined_language_codes]').check();
    // cy.get('[name=field-display_flags]').check();
    // cy.get('[name=field-always_show_selector]').check();

    cy.get('.primary > .icon').click();
    cy.reload();
    cy.get(':nth-child(1) > .pointing > :nth-child(2)').click();

    cy.get('.css-xp4uvy.react-select__single-value').contains('Deutsch');
    // cy.get('.css-10ku62j.react-select__multi-value__label').contains('Bislama');
    // cy.get('.css-10ku62j.react-select__multi-value__label').contains('Corsu');
    cy.get('.css-10ku62j.react-select__multi-value__label').contains('Deutsch');
    cy.get('.css-10ku62j.react-select__multi-value__label').contains('Català');
    cy.get('.css-10ku62j.react-select__multi-value__label').contains('English');

    // cy.get(':nth-child(1) > .pointing > :nth-child(3)').click();
    // cy.get('#field-use_content_negotiation').click();
  });
});
