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
 * How content stores its blocks, as the `@blocks-schema` endpoint announces
 * it in `document_model`. Register one as a `documentModel` utility, named by
 * its `id`. Its docs are the `*.block.md` file whose frontmatter has
 * `document_model: <id>`, and the docs of its elements also name it.
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
  /**
   * Limits the elements of the document model, which are the elements whose
   * docs name it in their `document_model` frontmatter, to these.
   */
  elements?: () => string[];
  /**
   * The blocks that content of this document model can hold, as keys of the
   * blocks configuration, whether the block chooser offers them or not.
   * Without it, the content can hold the blocks offered for it.
   */
  blocks?: () => string[];
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
