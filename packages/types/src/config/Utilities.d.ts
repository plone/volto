/**
 * Map utility "type" to its method signature.
 * Extend via module augmentation:
 * declare module '@plone/types' { interface UtilityTypeMap { foo: (id: string) => string } }
 */
export interface UtilityTypeMap {
  validator: ValidatorUtility;
  transform: (data: any) => any;
  fieldFactoryInitialData: (intl: any) => Record<string, any>;
  fieldFactoryProperties: (intl: any) => Record<string, any>;
  documentModel: () => DocumentModel;
}

/**
 * An item of the `@blocks-schema` endpoint: a block, or a native element of a
 * document model.
 */
export type BlocksSchemaItem = {
  '@id': string;
  id: string;
  title: string;
  kind: 'block' | 'element';
  description?: string;
  docs?: string;
  restricted?: boolean | 'context';
  [key: string]: unknown;
};

/**
 * What the `@blocks-schema` endpoint gives a document model to build its
 * items from.
 */
export type DocumentModelHelpers = {
  blocksConfig: Record<string, any>;
  /**
   * The content item of the request, as the block chooser sees it, if any.
   */
  context?: Record<string, any>;
  intl: any;
  /**
   * The summaries of the blocks offered for the content, or of the given
   * blocks, whether they are offered or not.
   */
  blocks: (keys?: string[]) => BlocksSchemaItem[];
  /**
   * The docs and schema of one block, if it is registered.
   */
  block: (key: string) => BlocksSchemaItem | undefined;
  /**
   * The summaries of the elements with docs, or of the given ones.
   */
  elements: (names?: string[]) => BlocksSchemaItem[];
  /**
   * The docs of one element, if it has them.
   */
  element: (name: string) => BlocksSchemaItem | undefined;
};

/**
 * How content stores its blocks, as the `@blocks-schema` endpoint announces
 * it in `document_model`. Register one as a `documentModel` utility, named by
 * its `id`. Its docs are the `*.block.md` file whose frontmatter has
 * `document_model: <id>`.
 */
export type DocumentModel = {
  id: string;
  /**
   * Increase it when the stored data changes in a way that clients of the
   * previous version can't read.
   */
  version: number;
  /**
   * The content types that use this document model. Content types that no
   * document model lists use `plone.blocks`.
   */
  types?: () => string[];
  items?: (helpers: DocumentModelHelpers) => BlocksSchemaItem[];
  item?: (
    id: string,
    helpers: DocumentModelHelpers,
  ) => BlocksSchemaItem | undefined;
};

export type ValidatorUtilityArgs = {
  value: any;
  field: Record<string, any>;
  formData: any;
  formatMessage: (...args: any[]) => any;
};

export type ValidatorUtility = (
  options: ValidatorUtilityArgs,
) => string | null | undefined;

type UtilityMethodFor<Type extends string> = Type extends keyof UtilityTypeMap
  ? UtilityTypeMap[Type]
  : (...args: any[]) => any;

export type Utility<Type extends string = string> = Record<
  string,
  { method: UtilityMethodFor<Type> }
>;

type UtilitiesByMap = {
  [Type in keyof UtilityTypeMap]: Utility<Type>;
};

export type UtilitiesConfig = UtilitiesByMap & Record<string, Utility>;
