context('Actions', () => {
  beforeEach(() => {
    cy.autologin();
  });

  it('As a site administrator i can change the default language', function() {
    //Given
    cy.visit('/');
    cy.get('#toolbar-personal').click();
    cy.get('.pastanaga-menu-list li a')
      .contains('Site Setup')
      .click();
    cy.get('.controlpanel .segments .ui.icon .translate.icon').click();
    cy.get('#page-controlpanel .segments .menu a')
      .contains('General')
      .click();

    // When
    // Checkboxes
    cy.get('[name=field-use_combined_language_codes]').check();

    cy.get('[name=field-display_flags]').check({
      force: true,
    });
    cy.get('[name=field-always_show_selector]').check({
      force: true,
    });

    //Language Chooser
    cy.get(
      '#general-available_languages .css-1g6gooi .react-select__input input',
    )
      .click()
      .type('Deutsch {enter} Dansk {enter} Italiano {enter}');
    cy.get('#general-default_language .react-select__single-value')
      .click()
      .type('Deutsch {enter}');

    //Save
    cy.get('[title="Save"]').click();

    cy.get('.css-xp4uvy.react-select__single-value').contains('Deutsch');
    cy.get('.css-10ku62j.react-select__multi-value__label').contains(
      'Italiano',
    );
    cy.get('.css-10ku62j.react-select__multi-value__label').contains('Deutsch');
    cy.get('.css-10ku62j.react-select__multi-value__label').contains('Dansk');

    // cy.get(':nth-child(1) > .pointing > :nth-child(3)').click();
    // cy.get('#field-use_content_negotiation').click();
  });
});
