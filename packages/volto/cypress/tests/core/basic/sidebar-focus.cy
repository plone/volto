import { slateBeforeEach } from '../../../support/volto-slate';

describe('FileWidget Test', () => {
  beforeEach(slateBeforeEach);

  it('After removing value of widget the focus should be removed from the field', () => {
    cy.get('#field-creators').get('.react-select__multi-value__remove').click();
    cy.getSlateEditorAndType(
      'Test if all the text will be in this slate block',
    ).contains('Test if all the text will be in this slate block');
  });
});
