/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace Cypress {
    export interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      navigate(value: string): Chainable<JQuery<HTMLElement>>;
      getSlateEditorAndType(value: string): Chainable<JQuery<HTMLElement>>;
      setSlateSelection(value: string): Chainable<JQuery<HTMLElement>>;
      clickSlateButton(value: string): Chainable<JQuery<HTMLElement>>;
      autologin(): Chainable<JQuery<HTMLElement>>;
      createContent({
        contentType,
        contentId,
        contentTitle,
        path,
        bodyModifier,
        preview_image_link,
        transition,
      }: {
        contentType: string;
        contentId: string;
        contentTitle: string;
        path?: string;
        bodyModifier?: (body: any) => any;
        preview_image_link?: { '@id': string };
        transition?: string;
      }): Chainable<JQuery<HTMLElement>>;
      addNewBlock(value: string): Chainable<JQuery<HTMLElement>>;
      matchImage(): Chainable<JQuery<HTMLElement>>;
      injectAxe({
        axeCorePath,
      }: {
        axeCorePath: string;
      }): Chainable<JQuery<HTMLElement>>;
      checkA11y(
        context?: object | string,
        options?: object,
        violationCallback?: (violations: any[]) => void,
        skipFailures?: boolean,
      ): Chainable<JQuery<HTMLElement>>;
      checkAccessibility(): Chainable<JQuery<HTMLElement>>;
      getSlate(): Chainable<JQuery<HTMLElement>>;
      getPlateEditor(editableSelector?: string): Chainable<any>;
      plateSetSelection(
        at: any,
        options?: { editable?: string },
      ): Chainable<any>;
      plateFocus(options?: { editable?: string }): Chainable<any>;
      plateClickAtPath(
        path: number[],
        options?: { editable?: string },
      ): Chainable<any>;
      /** Click at a path and type text, keeping focus on that node. */
      plateTypeAtPath(
        path: number[],
        text: string,
        options?: {
          editable?: string;
          typeOptions?: Parameters<Cypress.Chainable['type']>[1];
        },
      ): Chainable<any>;
      /** Merge properties into a node at the given path. */
      plateSetNode(
        path: number[],
        newProperties: Record<string, any>,
        options?: { editable?: string },
      ): Chainable<any>;
      /** Get a Slate node at a path via the Plate Cypress adapter. */
      plateGetNode(
        path: number[],
        options?: { editable?: string },
      ): Chainable<any>;
      /** Get the DOM node for a Slate node at a given path. */
      plateGetDOMNode(
        path: number[],
        options?: { editable?: string },
      ): Chainable<any>;
    }
  }
}
export {};
