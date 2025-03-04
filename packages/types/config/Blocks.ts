import type { GetContentResponse } from '../content/get';
import type { BlockViewProps } from '../Blocks/View';

export interface BlocksConfig {
  [key: string]: BlockConfigBase | undefined;
  title?: BlockConfigBase;
  description?: BlockConfigBase;
  slate?: SlateBlock;
}

interface BlockConfigBase {
  /**
   * The programmatic id of the block
   */
  id: string;
  /**
   * // The display name of the block (translatable)
   */
  title: string;
  /**
   * The icon used in the block chooser
   */
  icon: string;
  /**
   * The group of the block
   */
  group: string;
  /**
   * The view mode component
   */
  view: React.ComponentType<BlockViewProps>;
  /**
   * The edit mode component
   */
  edit: React.ComponentType;
  /**
   * The group (blocks can be grouped, displayed in the chooser)
   */
  schema?: object;
  /**
   * The group of the block
   */
  blockSchema?: (args: {
    props: unknown;
    intl: unknown;
  }) => Record<string, unknown>;
  /**
   * If the block is restricted, it won't show in the chooser.
   * The function signature is `({properties, block})` where `properties` is
   * the current object data and `block` is the block being evaluated in `BlockChooser`.
   */
  restricted: (args: {
    properties: GetContentResponse;
    block: BlockConfigBase; // TODO: This has to be extendable
  }) => boolean;
  /**
   * A meta group `most used`, appearing at the top of the chooser
   */
  mostUsed: false;
  /**
   * Set this to true if the block manages its own focus
   */
  blockHasOwnFocusManagement: true;
  /**
   * The sidebar tab you want to be selected when selecting the block
   */
  sidebarTab: 0;
  /**
   * A block can have an schema enhancer function with the signature: (schema) => schema
   * It can be either be at block level (it's applied always), at a variation level
   * or both. It's up to the developer to make them work nicely (not conflict) between them
   */
  schemaEnhancer: (args: {
    schema: JSONSchema;
    formData: BlockConfigBase; // Not sure, if so, has to be extendable
    intl: unknown;
  }) => JSONSchema;
}

interface SlateBlock extends BlockConfigBase {
  /**
   * Returns true if the provided block data represents a value for the current block.
   * Required for alternate default block types implementations.
   */
  blockHasValue: (data: BlockConfigBase) => boolean;
  /**
   *
   */
  tocEntry: (block: BlockConfigBase) => object;
}

export interface ContainerBlock extends BlockConfigBase {
  /**
   * A custom `EditBlockWrapper` component to use by the container
   */
  EditBlockWrapper: React.ComponentType;
  /**
   * A custom `TemplateChooser` component to use by the container
   */
  TemplateChooser: React.ComponentType;
  /**
   * The available templates for the TemplateChooser generator
   */
  templates: (type: string) => (intl: unknown) => TemplateDefaultBlocksData;
  /**
   * Maximum number of blocks in the container
   */
  maxLength: number;
  /**
   * List of the `id`s of the allowed blocks in the container
   */
  allowedBlocks: string[];
}

// interface ExtendedObject extends ArbitraryObject {
//   baz: { someProp: string };
// }

// const myObject: ExtendedObject = {};

// // Add properties one by one
// myObject.foo = 'hello';
// myObject.bar = 42;
// myObject.baz = { someProp: 'someValue' };

type JSONSchemaFieldsets = {
  id: string;
  title: string;
  fields: string[];
};

type JSONSchema = {
  title: string;
  fieldsets: JSONSchemaFieldsets[];
  properties: object;
  required: string[];
};

type BlocksData = {
  blocks: {
    [key: string]: object;
  };
  blocks_layout: {
    items: string[];
  };
};

interface TemplateDefaultBlocksData {
  image: string;
  id: string;
  title: string;
  blocksData: BlocksData;
}
