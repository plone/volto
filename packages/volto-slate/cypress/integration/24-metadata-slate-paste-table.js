import { slateJsonBeforeEach, slateJsonAfterEach } from '../support';

describe('Metadata Slate JSON Tests: Paste table', () => {
  beforeEach(slateJsonBeforeEach);
  afterEach(slateJsonAfterEach);

  it('As editor I can paste table copied from csv', function () {
    cy.get('.slate-editor [contenteditable=true]').pasteClipboard(
      `
 <p><div><table class="slate-table"><thead><tr><th>Character</th><th>UTF-8 Hex Equivalent</th></tr></thead><tbody><tr><td>+</td><td><a href="" rel="noopener noreferrer">0x2B</a></td></tr><tr><td>#</td><td><a href="" rel="noopener noreferrer">0x23</a></td></tr><tr><td>%</td><td><a href="" rel="noopener noreferrer">0x25</a></td></tr></tbody></table> </div></p>
        `,
    );
    cy.toolbarSave();

    cy.get('[id="page-document"] table').should('have.length', 1);
  });

  it('As editor I can delete table copied to editor', function () {
    cy.get('.slate-editor [contenteditable=true]').pasteClipboard(
      `<p><div><table class="slate-table"><thead><tr><th>Character</th><th>UTF-8 Hex Equivalent</th></tr></thead><tbody><tr><td>+</td><td><a href="" rel="noopener noreferrer">0x2B</a></td></tr><tr><td>#</td><td><a href="" rel="noopener noreferrer">0x23</a></td></tr><tr><td>%</td><td><a href="" rel="noopener noreferrer">0x25</a></td></tr></tbody></table> </div></p>
        `,
    );
    cy.get('[id="page-edit"] table').click();
    cy.get(
      '.slate-inline-toolbar .button-wrapper a[title="Delete table"]',
    ).click();

    cy.toolbarSave();

    cy.get('[id="page-document"] table').should('not.exist');
  });
});
