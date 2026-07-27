import { slateBeforeEach } from '../../../support/helpers';

describe('Block Tests', () => {
  beforeEach(slateBeforeEach);

  it('should save typed content in the Slate editor', () => {
    cy.getSlateEditorAndType('Hello Slate World');
    cy.getSlateEditorAndType('{enter}');

    // Save
    cy.toolbarSave();

    // then the page view should contain our changes
    cy.contains('Hello Slate World');
  });
});
