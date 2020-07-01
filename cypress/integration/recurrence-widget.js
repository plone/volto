if (Cypress.env('API') === 'plone') {
  const createEvent = () => {
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-event').click();
    cy.get('#field-title').type('Test recurrence');

    cy.get('input#start-date').type('{selectall}05/04/2020{esc}'); //May,4 2020
    cy.get('input#end-date').type('{selectall}05/16/2020{esc}'); //May,16 2020
  };

  const openRecurrenceModal = () => {
    cy.get('#default-recurrence .button.edit-recurrence').click();
    cy.get('.modal .occurences .list > .item').should('have.length', 13);
  };

  const saveEvent = () => {
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/test-recurrence');
    if (Cypress.env('API') === 'plone') {
      cy.get('.navigation .item.active').should('have.text', 'Test recurrence');
    } else {
      cy.contains('Test recurrence');
    }
  };

  describe('Test recurrence widget', () => {
    beforeEach(() => {
      // give a logged in editor and the site root
      cy.autologin();
      cy.visit('/');
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
      cy.waitForResourceToLoad('?fullobjects');

      createEvent();
      openRecurrenceModal();
    });

    it.skip('Test the default. Daily recurrence', function () {
      //test interval
      cy.get('.modal #interval').type('{selectall}2');
      cy.get('.modal .occurences .list > .item').should('have.length', 7);
      cy.get('.modal #interval').type('{selectall}3');
      cy.get('.modal .occurences .list > .item').should('have.length', 5);
      cy.get('.modal #interval').type('{selectall}1');
      cy.get('.modal .occurences .list > .item').should('have.length', 13);

      //test recurrence end after N recurrences
      cy.get('.modal #recurrenceEndsCount').check({ force: true });
      cy.get('.modal #count').type('{selectall}3');
      cy.get('.modal .occurences .list > .item').should('have.length', 3);

      //return on 'end date'
      cy.get('.modal #recurrenceEndsUntil').check({ force: true });

      //test add date
      cy.get('.modal #field-addDate input').type('{selectall}05/20/2020');
      cy.get('.modal .occurences .list > .item').should('have.length', 14);

      //test exclude date
      cy.get(
        '.modal .occurences .list .item:last-of-type .exclude-button',
      ).click();
      cy.get('.modal .occurences .list .item:last-of-type .content').should(
        'have.class',
        'excluded',
      );

      //test re-add date
      cy.get(
        '.modal .occurences .list .item:last-of-type .include-button',
      ).click();
      cy.get('.modal .occurences .list .item:last-of-type .content').should(
        'not.have.class',
        'excluded',
      );

      //save recurrence
      cy.get('.modal .button.save').click();
      cy.get('#default-recurrence .occurences .list > .item').should(
        'have.length',
        14,
      );
    });

    it.skip('Test Monday and Friday recurrence', function () {
      //change freq

      cy.get('.modal .field#field-freq')
        .click()
        .type('Monday and Friday {enter}');
      cy.get('.modal .occurences .list > .item').should('have.length', 4);

      //test recurrence end after N recurrences
      cy.get('.modal #recurrenceEndsCount').check({ force: true });
      cy.get('.modal #count').type('{selectall}2');
      cy.get('.modal .occurences .list > .item').should('have.length', 2);

      //test exclude date
      cy.get(
        '.modal .occurences .list .item:last-of-type .exclude-button',
      ).click();
      cy.get('.modal .occurences .list .item:last-of-type .content').should(
        'have.class',
        'excluded',
      );

      //test re-add date
      cy.get(
        '.modal .occurences .list .item:last-of-type .include-button',
      ).click();
      cy.get('.modal .occurences .list .item:last-of-type .content').should(
        'not.have.class',
        'excluded',
      );

      //save recurrence
      cy.get('.modal .button.save').click();
      cy.get('#default-recurrence .occurences .list > .item').should(
        'have.length',
        2,
      );
    });

    it.skip('Test Weekday recurrence', function () {
      //change freq
      cy.get('.modal .field#field-freq').click().type('Weekday {enter}');
      cy.get('.modal .occurences .list > .item').should('have.length', 10);

      //test recurrence end after N recurrences
      cy.get('.modal #recurrenceEndsCount').check({ force: true });
      cy.get('.modal #count').type('{selectall}6');
      cy.get('.modal .occurences .list > .item').should('have.length', 6);
      cy.get('.modal .occurences .list .item:last-of-type .content').contains(
        'Monday',
      );

      //test exclude date
      cy.get(
        '.modal .occurences .list .item:last-of-type .exclude-button',
      ).click();
      cy.get('.modal .occurences .list .item:last-of-type .content').should(
        'have.class',
        'excluded',
      );

      //test re-add date
      cy.get(
        '.modal .occurences .list .item:last-of-type .include-button',
      ).click();
      cy.get('.modal .occurences .list .item:last-of-type .content').should(
        'not.have.class',
        'excluded',
      );

      //save recurrence
      cy.get('.modal .button.save').click();
      cy.get('#default-recurrence .occurences .list > .item').should(
        'have.length',
        6,
      );
    });

    it.skip('Test Weekly recurrence', function () {
      //change freq
      cy.get('.modal .field#field-freq').click().type('Weekly {enter}');
      cy.get('.modal .byday-field .ui.button.active').click(); //deactivate selected days

      cy.get('.modal .byday-field .ui.button').contains('Tue').click(); //select Tuesday
      cy.get('.modal .occurences .list > .item').should('have.length', 2);
      cy.get('.modal .byday-field .ui.button').contains('Wed').click(); //select Wednesday
      cy.get('.modal .occurences .list > .item').should('have.length', 4);

      //test recurrence end after N recurrences
      cy.get('.modal #recurrenceEndsCount').check({ force: true });
      cy.get('.modal #count').type('{selectall}6');
      cy.get('.modal .occurences .list > .item').should('have.length', 6);
      cy.get('.modal .occurences .list .item:last-of-type .content').contains(
        'Wednesday',
      );

      //test exclude date
      cy.get(
        '.modal .occurences .list .item:last-of-type .exclude-button',
      ).click();
      cy.get('.modal .occurences .list .item:last-of-type .content').should(
        'have.class',
        'excluded',
      );

      //test re-add date
      cy.get(
        '.modal .occurences .list .item:last-of-type .include-button',
      ).click();
      cy.get('.modal .occurences .list .item:last-of-type .content').should(
        'not.have.class',
        'excluded',
      );

      //save recurrence
      cy.get('.modal .button.save').click();
      cy.get('#default-recurrence .occurences .list > .item').should(
        'have.length',
        6,
      );
    });

    it.skip('Test Monthly recurrence', function () {
      //change freq
      cy.get('.modal .field#field-freq').click().type('Monthly {enter}');

      cy.get('.modal input#bymonthday').should('have.attr', 'value', '4');
      cy.get('.modal .occurences .list .item:last-of-type .content').contains(
        'Monday, May 4',
      );

      cy.get('.modal input#bymonthday').type('{selectall}6');
      cy.get('.modal .occurences .list .item:last-of-type .content').contains(
        'Wednesday, May 6,',
      );

      cy.get('.modal #monthly-byweekday').check({ force: true });

      cy.get('.modal #weekdayOfTheMonthIndex').click().type('First {enter}');
      cy.get('.modal #weekdayOfTheMonth').click().type('Sunday {enter}');
      cy.get('.modal .occurences .list > .item').should('have.length', 0);

      cy.get('.modal #weekdayOfTheMonth').click().type('Wednesday {enter}');
      cy.get('.modal .occurences .list > .item').should('have.length', 1);

      cy.get('.modal #until-date').type('{selectall}07/31/2020');
      cy.get('.modal .occurences .list > .item').should('have.length', 3);

      cy.get('.modal #recurrenceEndsCount').check({ force: true });
      cy.get('.modal .occurences .list > .item').should('have.length', 1);

      cy.get('.modal #count').type('{selectall}2');
      cy.get('.modal .occurences .list > .item').should('have.length', 2);
      cy.get('.modal #count').type('{selectall}6');
      cy.get('.modal .occurences .list > .item').should('have.length', 6);
      cy.get('.modal .occurences .list .item:last-of-type .content').contains(
        'Wednesday, October 7',
      );

      //test exclude date
      cy.get(
        '.modal .occurences .list .item:last-of-type .exclude-button',
      ).click();
      cy.get('.modal .occurences .list .item:last-of-type .content').should(
        'have.class',
        'excluded',
      );

      //test re-add date
      cy.get(
        '.modal .occurences .list .item:last-of-type .include-button',
      ).click();
      cy.get('.modal .occurences .list .item:last-of-type .content').should(
        'not.have.class',
        'excluded',
      );

      //test add-date
      cy.get('.modal #addDate-date').type('{selectall}10/08/2020');
      cy.get('.modal .occurences .list .item:last-of-type .content').contains(
        'Thursday, October 8',
      );

      //save recurrence
      cy.get('.modal .button.save').click();
      cy.get('#default-recurrence .occurences .list > .item').should(
        'have.length',
        6,
      );
    });

    it('Test Yearly recurrence', function () {
      //change freq
      cy.get('.modal .field#field-freq').click().type('Yearly {enter}');

      cy.get('.modal #until-date').type('{selectall}12/31/2030');
      cy.get('.modal .occurences .list > .item').should('have.length', 11);

      cy.get('.modal #interval').type('{selectall}2');
      cy.get('.modal .occurences .list > .item').should('have.length', 6);

      cy.get('.modal #interval').type('{selectall}3');
      cy.get('.modal .occurences .list > .item').should('have.length', 4);

      cy.get('.modal #interval').type('{selectall}2');

      cy.get('.modal input#bymonthday').type('{selectall}6');
      cy.get('.modal .occurences .list > .item').should('have.length', 6);
      cy.get('.modal .occurences .list .item:last-of-type .content').contains(
        'Monday, May 6, 2030',
      );

      cy.get('.modal .byyear-bymonthday #monthOfTheYear')
        .click()
        .type('January{enter}');
      cy.get('.modal .occurences .list > .item').should('have.length', 5);
      cy.get('.modal .occurences .list .item:first-of-type .content').contains(
        'Thursday, January 6, 2022',
      );
      cy.get('.modal .occurences .list .item:last-of-type .content').contains(
        'Sunday, January 6, 2030',
      );

      cy.get('.modal #yearly-byday').check({ force: true });
      cy.get('.modal .occurences .list > .item').should('have.length', 6);
      cy.get('.modal .occurences .list .item:first-of-type .content').contains(
        'Monday, May 4, 2020',
      );
      cy.get('.modal .occurences .list .item:last-of-type .content').contains(
        'Monday, May 6, 2030',
      );

      cy.get('.modal #weekdayOfTheMonthIndex').click().type('Third {enter}');
      cy.get('.modal .occurences .list > .item').should('have.length', 6);
      cy.get('.modal .occurences .list .item:first-of-type .content').contains(
        'Monday, May 18, 2020',
      );
      cy.get('.modal .occurences .list .item:last-of-type .content').contains(
        'Monday, May 20, 2030',
      );

      cy.get('.modal #weekdayOfTheMonth').click().type('Monday {enter}');
      cy.get('.modal .occurences .list > .item').should('have.length', 6);
      cy.get('.modal .occurences .list .item:first-of-type .content').contains(
        'Monday, May 18, 2020',
      );
      cy.get('.modal .occurences .list .item:last-of-type .content').contains(
        'Monday, May 20, 2030',
      );

      cy.get('.modal .byyear-byday #monthOfTheYear')
        .click()
        .type('January {enter}');
      cy.get('.modal .occurences .list > .item').should('have.length', 5);
      cy.get('.modal .occurences .list .item:first-of-type .content').contains(
        'Monday, January 17, 2022',
      );
      cy.get('.modal .occurences .list .item:last-of-type .content').contains(
        'Monday, January 21, 2030',
      );

      cy.get('.modal #recurrenceEndsCount').check({ force: true });
      cy.get('.modal #count').type('{selectall}3');
      cy.get('.modal .occurences .list > .item').should('have.length', 3);
      cy.get('.modal #count').type('{selectall}8');
      cy.get('.modal .occurences .list > .item').should('have.length', 8);

      //test exclude date
      cy.get(
        '.modal .occurences .list .item:last-of-type .exclude-button',
      ).click();
      cy.get('.modal .occurences .list .item:last-of-type .content').should(
        'have.class',
        'excluded',
      );

      //test re-add date
      cy.get(
        '.modal .occurences .list .item:last-of-type .include-button',
      ).click();
      cy.get('.modal .occurences .list .item:last-of-type .content').should(
        'not.have.class',
        'excluded',
      );

      //test add-date
      cy.get('.modal #addDate-date').type('{selectall}10/08/2040');
      cy.get('.modal .occurences .list .item:last-of-type .content').contains(
        'Monday, October 8, 2040',
      );

      //save recurrence
      cy.get('.modal .button.save').click();
      cy.get('#default-recurrence .occurences .list > .item').should(
        'have.length',
        9,
      );
    });

    afterEach(() => {
      //save event
      //  saveEvent();
    });
  });
}
