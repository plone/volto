describe('Content Rules', () => {
  beforeEach(() => {
    cy.autologin();
    cy.visit('/controlpanel/rules');
  });

  it('shows workflow states outside the scrolling modal body', () => {
    const ruleTitle = 'Workflow state dropdown test';
    cy.contains('button', 'Add content rule').click();
    cy.get('#page-rule-add input[type="text"]')
      .first()
      .should('be.enabled')
      .type(ruleTitle);
    cy.get('#page-rule-add .react-select__dropdown-indicator').click();
    cy.contains('.react-select__option', 'Object modified').click();
    cy.contains('button', /^Save$/).click();

    cy.intercept('GET', '**/@controlpanels/content-rules/*', (req) => {
      req.continue(({ body }) => {
        const condition = body.addable_conditions.find(
          ({ title }) => title === 'Workflow state',
        );
        condition['@schema'].properties.wf_states.items.choices = [
          ['private', 'Private'],
          ['pending', 'Pending review'],
          ['published', 'Published'],
        ];
      });
    });
    cy.contains('tr', ruleTitle).contains('button', 'Configure').click();

    cy.contains('h4', /^Condition:/)
      .parent()
      .within(() => {
        cy.get('.ui.dropdown').click();
        cy.contains('.item', /^Workflow state$/).click();
        cy.contains('button', /^Add$/).click();
      });
    cy.get('.ui.modal[role="dialog"]:visible').within(() => {
      cy.get('#field-wf_states .react-select__control').click();
      cy.get('.react-select__menu').should('be.visible');
      cy.get('.scrolling.content .react-select__menu').should('not.exist');
      cy.contains('.react-select__option', /^Published\b/).click();
      cy.get('#field-wf_states').should('contain.text', 'Published');
      cy.get('button[aria-label="Save"]').click();
    });

    cy.get('.ui.modal[role="dialog"]:visible').should('not.exist');
    cy.contains('.card', 'Workflow state').should('be.visible');
  });
});
