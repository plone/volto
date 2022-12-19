describe('Blocks Tests', () => {
  beforeEach(() => {
    // given a logged in editor and a page in edit mode
    cy.autologin();
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-page',
      contentTitle: 'My Page',
    });
    cy.visit('/my-page');
    cy.waitForResourceToLoad('@navigation');
    cy.waitForResourceToLoad('@breadcrumbs');
    cy.waitForResourceToLoad('@actions');
    cy.waitForResourceToLoad('@types');
    cy.waitForResourceToLoad('my-page');
  });

  it('Add hero block', () => {
    cy.intercept('PATCH', '/**/my-page').as('save');
    cy.intercept('GET', '/**/my-page').as('content');
    cy.intercept('GET', '/**/my-page/@types/*').as('schema');

    const block = 'hero';
    // const expectedFile = 'broccoli.jpg';
    const expectedTitle = 'Volto';
    const expectedDescription = 'React-based front-end for the Plone';

    // Edit
    cy.navigate('/my-page/edit');
    cy.wait('@schema');

    cy.addNewBlock('hero');

    // cy.fixture(expectedFile).then(fileContent => {
    //   cy.get(`.block.${block} [data-cy="dropzone]`).upload(
    //     { fileContent, expectedFile, mimeType: 'application/json' },
    //     { subjectType: 'drag-n-drop' },
    //   );
    // });
    cy.get(
      `.block.${block} .title-editor > .public-DraftStyleDefault-block`,
    ).type(`${expectedTitle}`);
    cy.get(
      `.block.${block} .description-editor > .public-DraftStyleDefault-block`,
    ).type(`${expectedDescription}`);

    // Save
    cy.get('#toolbar-save').click();
    cy.wait('@save');
    cy.wait('@content');

    //View
    cy.get(`.${block}-body h1`).contains(`${expectedTitle}`);
    cy.get(`.${block}-body p`).contains(`${expectedDescription}`);
  });
});
