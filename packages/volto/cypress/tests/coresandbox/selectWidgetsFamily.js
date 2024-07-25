context('Select widgets family Acceptance Tests', () => {
  describe('Select', () => {
    beforeEach(() => {
      cy.intercept('GET', `/**/*?expand*`).as('content');
      cy.intercept('GET', '/**/@types/example').as('schema');
      cy.intercept('POST', '/**/').as('create');

      // given a logged in editor and a page in edit mode
      cy.autologin();
      cy.visit('/');
      cy.wait('@content');

      // We always add a new example content type, fill the required
      cy.navigate('/add?type=example');
      cy.wait('@schema');

      cy.get('#field-title').type('An Example');
    });

    it('As editor I interact with `choice_field` -> Select (inline list of fixed choices)', function () {
      // choice_field = schema.Choice(
      //     title=u"Choice field",
      //     description=u"zope.schema.Choice",
      //     values=[u"One", u"Two", u"Three"],
      //     required=True
      //     )

      cy.findAllByText('Choice and Multiple Choice fields').click();
      cy.wait(500); // We allow the Select component to lazy load

      cy.get('.react-select__placeholder')
        .should('be.visible')
        .contains('Select');

      // We select the choice 'One' of the field
      cy.get('#field-choice_field').click();
      cy.findAllByText('One').click();
      cy.get(
        '#field-choice_field > .react-select__control > .react-select__value-container',
      ).contains('One');

      // We change the tab, and back, and the value is still there
      cy.findAllByText('Date and time fields').click();
      cy.wait(500);
      cy.findAllByText('Choice and Multiple Choice fields').click();
      cy.get(
        '#field-choice_field > .react-select__control > .react-select__value-container',
      ).contains('One');

      // We save, edit again, and the value set is there
      cy.get('#toolbar-save').click();

      cy.wait('@create');
      cy.wait('@content');

      cy.findByLabelText('Edit').click();

      cy.wait('@schema');

      cy.wait(1000);
      cy.findByText('Choice and Multiple Choice fields').click();
      cy.get(
        '#field-choice_field > .react-select__control > .react-select__value-container',
      ).contains('One');
    });

    it('As editor I interact with `choice_field_select` -> Select (vocabulary-based list of fixed choices)', function () {
      // choice_field_select = schema.Choice(
      //     title=u"Choicefield with select2 widget",
      //     description=u"zope.schema.Choice",
      //     vocabulary="plone.app.vocabularies.PortalTypes",
      //     required=False,
      // )

      cy.findByText('Choice and Multiple Choice fields').click();
      cy.wait(500); // We allow the Select component to lazy load

      cy.get('.react-select__placeholder')
        .should('be.visible')
        .contains('Select');

      // We select the choice 'Folder' of the field
      cy.get('#field-choice_field_select').click();
      cy.findByText('Folder').click();
      cy.get(
        '#field-choice_field_select > .react-select__control > .react-select__value-container',
      ).contains('Folder');

      // We change the tab, and back, and the value is still there
      cy.findByText('Date and time fields').click();
      cy.wait(500);
      cy.findAllByText('Choice and Multiple Choice fields').click();
      cy.get(
        '#field-choice_field_select > .react-select__control > .react-select__value-container',
      ).contains('Folder');

      // We save, edit again, and the value set is there
      cy.get('#toolbar-save').click();

      cy.wait('@create');
      cy.wait('@content');

      cy.findByLabelText('Edit').click();

      cy.wait('@schema');

      // On edit, the blocks editor flashes for a moment, fooling Cypress
      // If we solve it and not show it by this moment we would be able to
      // remove it
      cy.wait(1000);
      cy.findByText('Choice and Multiple Choice fields').click();
      cy.get(
        '#field-choice_field_select > .react-select__control > .react-select__value-container',
      ).contains('Folder');

      // We reset (force a no-value) in the field by clearing it (x)
      cy.get(
        '#field-choice_field_select .react-select__clear-indicator',
      ).click();
      cy.get(
        '#field-choice_field_select > .react-select__control > .react-select__value-container',
      )
        .contains('Folder')
        .should('not.exist');
    });

    it('As editor I interact with `list_field_voc_unconstrained` -> Array Createable (vocabulary-based list of choices but not constrained to them)', function () {
      // list_field_voc_unconstrained = schema.List(
      //     title=u"List field with values from vocabulary but not constrained to them.",
      //     description=u"zope.schema.List",
      //     value_type=schema.TextLine(),
      //     required=False,
      //     missing_value=[],
      // )
      // directives.widget(
      //     "list_field_voc_unconstrained",
      //     AjaxSelectFieldWidget,
      //     vocabulary="plone.app.vocabularies.PortalTypes",
      //     pattern_options={
      //         "closeOnSelect": False,  # Select2 option to leave dropdown open for multiple selection
      //     },
      // )
      cy.findByText('Choice and Multiple Choice fields').click();
      cy.wait(500); // We allow the Select component to lazy load

      cy.get('.react-select__placeholder')
        .should('be.visible')
        .contains('Select');

      // We select the choice 'Folder' of the field
      cy.get('#field-list_field_voc_unconstrained').click();
      cy.findByText('Folder').click();
      cy.get(
        '#field-list_field_voc_unconstrained > .react-select__control > .react-select__value-container',
      ).contains('Folder');

      // We type a random word
      cy.get('#field-list_field_voc_unconstrained')
        .click()
        .type('RandomTyping{enter}');
      cy.get(
        '#field-list_field_voc_unconstrained > .react-select__control > .react-select__value-container',
      ).contains('RandomTyping');

      // We change the tab, and back, and the value is still there
      cy.findByText('Date and time fields').click();
      cy.wait(500);
      cy.findAllByText('Choice and Multiple Choice fields').click();
      cy.get(
        '#field-list_field_voc_unconstrained > .react-select__control > .react-select__value-container',
      ).contains('Folder');
      cy.get(
        '#field-list_field_voc_unconstrained > .react-select__control > .react-select__value-container',
      ).contains('RandomTyping');

      // We save, edit again, and the value set is there
      cy.get('#toolbar-save').click();

      cy.wait('@create');
      cy.wait('@content');

      cy.findByLabelText('Edit').click();

      cy.wait('@schema');

      // On edit, the blocks editor flashes for a moment, fooling Cypress
      // If we solve it and not show it by this moment we would be able to
      // remove it
      cy.wait(1000);
      cy.findByText('Choice and Multiple Choice fields').click();
      cy.wait(1000);
      cy.get(
        '#field-list_field_voc_unconstrained > .react-select__control > .react-select__value-container',
      ).contains('Folder');
      cy.get(
        '#field-list_field_voc_unconstrained > .react-select__control > .react-select__value-container',
      ).contains('RandomTyping');

      // We reset (force a no-value) in the field by clearing it (x)
      cy.get(
        '#field-list_field_voc_unconstrained .react-select__clear-indicator',
      ).click();
      cy.get(
        '#field-list_field_voc_unconstrained > .react-select__control > .react-select__value-container',
      )
        .contains('Folder')
        .should('not.exist');
    });

    it('As editor I interact with `list_field_voc_huge` -> Array (huge vocabulary-based list of choices)', function () {
      // list_field_voc_huge = schema.List(
      //     title=u"List field with values from a huge vocabulary",
      //     description=u"zope.schema.List",
      //     value_type=schema.Choice(
      //         vocabulary="plone.volto.coresandbox.vocabularies.huge",
      //     ),
      //     required=False,
      //     missing_value=[],
      // )
      // directives.widget(
      //     "list_field_voc_huge",
      //     frontendOptions={"widget": "autocomplete"},
      // )

      cy.findByText('Choice and Multiple Choice fields').click();
      cy.wait(500); // We allow the Select component to lazy load

      cy.get('.react-select__placeholder')
        .should('be.visible')
        .contains('Select');

      // We select the field and no query is sent
      cy.get('#field-list_field_voc_huge').click();
      cy.contains('Type text');
      cy.get('#field-list_field_voc_huge').type('10');
      cy.contains('Type text');

      // When we type the third character
      cy.get('#field-list_field_voc_huge').type('100');
      cy.contains('Option 100');

      // Let's select it
      cy.get('#field-list_field_voc_huge').type('100{enter}');
      cy.findByText('Option 100').click();

      cy.get(
        '#field-list_field_voc_huge > .react-select__control > .react-select__value-container',
      ).contains('Option 100');

      // We change the tab, and back, and the value is still there
      cy.findByText('Date and time fields').click();
      cy.wait(500);
      cy.findAllByText('Choice and Multiple Choice fields').click();
      // On an add form, the value kept is the token, so going back (remounting) the
      // field, means the token is shown, not the display name. Since we have no means to get the
      // title back unless we make another request. This is known and a side effect of unmounting/mounting
      // on the Tab component. A workaround would be to maintain the tabs mounted
      cy.get(
        '#field-list_field_voc_huge > .react-select__control > .react-select__value-container',
      ).contains('Option 100');

      // We save, edit again, and the value set is there
      cy.get('#toolbar-save').click();

      cy.wait('@create');
      cy.wait('@content');

      cy.findByLabelText('Edit').click();

      cy.wait('@schema');

      // On edit, the blocks editor flashes for a moment, fooling Cypress
      // If we solve it and not show it by this moment we would be able to
      // remove it
      cy.wait(1000);
      cy.findByText('Choice and Multiple Choice fields').click();
      cy.wait(1000);
      cy.get(
        '#field-list_field_voc_huge > .react-select__control > .react-select__value-container',
      ).contains('Option 100');

      // We reset (force a no-value) in the field by clearing it (x)
      cy.get(
        '#field-list_field_voc_huge .react-select__clear-indicator',
      ).click();
      cy.get(
        '#field-list_field_voc_huge > .react-select__control > .react-select__value-container',
      )
        .contains('Option 100')
        .should('not.exist');
    });

    it('As editor I interact with `available_languages` -> Array (vocabulary-based list of choices)', function () {
      // available_languages = schema.List(
      //     title=_(u'heading_available_languages',
      //             default=u'Available languages'),
      //     description=_(u'description_available_languages',
      //                   default=u'The languages in which the site should be '
      //                           u'translatable.'),
      //     required=True,
      //     default=['en'],
      //     missing_value=[],
      //     value_type=schema.Choice(
      //         vocabulary='plone.app.vocabularies.AvailableContentLanguages'
      //     )
      // )
      cy.findByText('Other fields').click();

      // We select the choice 'Catalan' of the field by typing it
      cy.wait(1000);
      cy.get('#field-available_languages').click().type('Català{enter}');
      cy.get(
        '#field-available_languages > .react-select__control > .react-select__value-container',
      ).contains('Català');
    });
  });
});
