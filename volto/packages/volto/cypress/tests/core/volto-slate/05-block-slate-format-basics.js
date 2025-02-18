import { slateBeforeEach } from '../../../support/helpers';

describe('Block Tests: Basic text format', () => {
  beforeEach(slateBeforeEach);

  it('Bold', function () {
    // Complete chained commands
    cy.getSlateEditorAndType('Colorless green ideas sleep furiously.');

    // Bold
    cy.setSlateSelection('Colorless', 'green');
    cy.clickSlateButton('Bold');

    // Un-bold
    cy.setSlateSelection('Colorless');
    cy.clickSlateButton('Bold');

    // Bold
    cy.setSlateSelection('Colorless');
    cy.clickSlateButton('Bold');

    // Save
    cy.toolbarSave();

    // then the page view should contain our changes
    cy.get('[id="page-document"] strong').contains('Colorless');
  });

  it('Italic', function () {
    // Complete chained commands
    cy.getSlateEditorAndType('Colorless green ideas sleep furiously.');

    // Italic
    cy.setSlateSelection('Colorless', 'green');
    cy.clickSlateButton('Italic');

    // Un-italic
    cy.setSlateSelection('Colorless');
    cy.clickSlateButton('Italic');

    // Italic
    cy.setSlateSelection('Colorless');
    cy.clickSlateButton('Italic');

    // Save
    cy.toolbarSave();

    // then the page view should contain our changes
    cy.get('[id="page-document"] em').contains('Colorless');
  });

  // it('Underline', function () {
  //   // Complete chained commands
  //   cy.getSlateEditorAndType('Colorless green ideas sleep furiously.');

  //   // cy.pause();

  //   // Underline
  //   cy.setSlateSelection('Colorless', 'green');
  //   cy.clickSlateButton('Underline');

  //   // Un-Underline
  //   cy.setSlateSelection('Colorless');
  //   cy.clickSlateButton('Underline');

  //   // Underline
  //   cy.setSlateSelection('Colorless');
  //   cy.clickSlateButton('Underline');

  //   // Save
  //   cy.toolbarSave();

  //   // then the page view should contain our changes
  //   cy.get('[id="page-document"] u').contains('Colorless');
  // });

  // it('Strikethrough', function () {
  //   // Complete chained commands
  //   cy.getSlateEditorAndType('Colorless green ideas sleep furiously.');

  //   // Strikethrough
  //   cy.setSlateSelection('Colorless', 'green');
  //   cy.clickSlateButton('Strikethrough');

  //   // Un-Strikethrough
  //   cy.setSlateSelection('Colorless');
  //   cy.clickSlateButton('Strikethrough');

  //   // Strikethrough
  //   cy.setSlateSelection('Colorless');
  //   cy.clickSlateButton('Strikethrough');

  //   // Save
  //   cy.toolbarSave();

  //   // then the page view should contain our changes
  //   cy.get('[id="page-document"] del').contains('Colorless');
  // });

  it('Heading (h2)', function () {
    // Complete chained commands
    cy.getSlateEditorAndType('Colorless green ideas sleep furiously.');

    // Title
    cy.setSlateSelection('Colorless', 'green');
    cy.clickSlateButton('Title');

    // Un-Title
    cy.setSlateSelection('Colorless');
    cy.clickSlateButton('Title');

    // Title
    cy.setSlateSelection('Colorless');
    cy.clickSlateButton('Title');

    // Save
    cy.toolbarSave();

    // then the page view should contain our changes
    cy.get('[id="page-document"] h2').contains('Colorless');
  });

  it('Heading (h2) - if previous format is set, it gets removed', function () {
    // Complete chained commands
    cy.getSlateEditorAndType('Colorless green ideas sleep furiously.');

    cy.setSlateSelection('Colorless');
    cy.clickSlateButton('Bold');

    // Title
    cy.setSlateSelection('Colorless', 'green');
    cy.clickSlateButton('Title');

    // Save
    cy.toolbarSave();

    // then the page view should contain our changes
    cy.get('[id="page-document"] h2').children().should('have.length', 1);
    cy.get('[id="page-document"] h2').contains('Colorless');
  });

  it('SubHeading (h3)', function () {
    // Complete chained commands
    cy.getSlateEditorAndType('Colorless green ideas sleep furiously.');

    // Subtitle
    cy.setSlateSelection('Colorless', 'green');
    cy.clickSlateButton('Subtitle');

    // Un-Subtitle
    cy.setSlateSelection('Colorless');
    cy.clickSlateButton('Subtitle');

    // Subtitle
    cy.setSlateSelection('Colorless');
    cy.clickSlateButton('Subtitle');

    // Save
    cy.toolbarSave();

    // then the page view should contain our changes
    cy.get('[id="page-document"] h3').contains('Colorless');
  });

  it('SubHeading (h3) - if previous format is set, it gets removed', function () {
    // Complete chained commands
    cy.getSlateEditorAndType('Colorless green ideas sleep furiously.');

    cy.setSlateSelection('Colorless');
    cy.clickSlateButton('Bold');

    // Title
    cy.setSlateSelection('Colorless', 'green');
    cy.clickSlateButton('Subtitle');

    // Save
    cy.toolbarSave();

    // then the page view should contain our changes
    cy.get('[id="page-document"] h3').children().should('have.length', 1);
    cy.get('[id="page-document"] h3').contains('Colorless');
  });

  // it('Heading 4', function () {
  //   // Complete chained commands
  //   cy.getSlateEditorAndType('Colorless green ideas sleep furiously.');

  //   // Heading 4
  //   cy.setSlateSelection('Colorless', 'green');
  //   cy.clickSlateButton('Heading 4');

  //   // Un-Heading 4
  //   cy.setSlateSelection('Colorless');
  //   cy.clickSlateButton('Heading 4');

  //   // Heading 4
  //   cy.setSlateSelection('Colorless');
  //   cy.clickSlateButton('Heading 4');

  //   // Save
  //   cy.toolbarSave();

  //   // then the page view should contain our changes
  //   cy.get('[id="page-document"] h4').contains('Colorless');
  // });

  it('Blockquote', function () {
    // Complete chained commands
    cy.getSlateEditorAndType('Colorless green ideas sleep furiously.');

    // Blockquote
    cy.setSlateSelection('sleep', 'furiously');
    cy.clickSlateButton('Blockquote');

    // Un-Blockquote
    cy.setSlateSelection('furiously');
    cy.clickSlateButton('Blockquote');

    // Blockquote
    cy.setSlateSelection('furiously');
    cy.clickSlateButton('Blockquote');

    // Save
    cy.toolbarSave();

    // then the page view should contain our changes
    cy.get('[id="page-document"] blockquote').contains('furiously');
  });

  // it('Superscript', function () {
  //   // Complete chained commands
  //   cy.getSlateEditorAndType('Colorless green ideas sleep furiously.');

  //   // Superscript
  //   cy.setSlateSelection('Colorless', 'green');
  //   cy.clickSlateButton('Superscript');

  //   // Un-Superscript
  //   cy.setSlateSelection('Colorless');
  //   cy.clickSlateButton('Superscript');

  //   // Superscript
  //   cy.setSlateSelection('Colorless');
  //   cy.clickSlateButton('Superscript');

  //   // Save
  //   cy.toolbarSave();

  //   // then the page view should contain our changes
  //   cy.get('[id="page-document"] sup').contains('Colorless');
  // });

  // it('Subscript', function () {
  //   // Complete chained commands
  //   cy.getSlateEditorAndType('Colorless green ideas sleep furiously.');

  //   // Subscript
  //   cy.setSlateSelection('sleep', 'furiously');
  //   cy.clickSlateButton('Subscript');

  //   // Un-Subscript
  //   cy.setSlateSelection('furiously');
  //   cy.clickSlateButton('Subscript');

  //   // Subscript
  //   cy.setSlateSelection('furiously');
  //   cy.clickSlateButton('Subscript');

  //   // Save
  //   cy.toolbarSave();

  //   // then the page view should contain our changes
  //   cy.get('[id="page-document"] sub').contains('furiously');
  // });
});
