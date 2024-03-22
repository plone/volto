import { slateBeforeEach } from '../../../support/commands';

describe('Block Tests', () => {
  beforeEach(slateBeforeEach);

  it('should create 4 slate blocks, first 3 with mouse, the last with an Enter in the third block', () => {
    cy.getSlate().focus().click().type('Hello Slate World').type('{enter}');

    // Save
    cy.toolbarSave();

    // then the page view should contain our changes
    cy.contains('Hello Slate World');
  });
});
