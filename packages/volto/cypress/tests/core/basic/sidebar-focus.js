import { slateBeforeEach } from '../../../support/volto-slate';
describe('FileWidget Test', () => {
  beforeEach(slateBeforeEach);

  it('As editor I am able to see the preview of uploading image', () => {
    cy.get('#field-creators').get('.react-select__multi-value__remove').click();
    cy.getSlateEditorAndType(
      'Test if all the text will be in this slate block',
    ).contains('Test if all the text will be in this slate block');
  });
});
