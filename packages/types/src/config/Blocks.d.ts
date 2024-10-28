import type { Content } from '../content';
import type { BlockViewProps, BlockEditProps } from '../blocks';
import type { IntlShape } from 'react-intl';
import { User } from '../services';
import { StyleDefinition } from '../blocks';

export interface BlocksConfig {
  blocksConfig: BlocksConfigData;
  groupBlocksOrder: { id: string; title: string };
  requiredBlocks: string[];
  initialBlocks: Record<string, string[]> | Record<string, object[]>;
  initialBlocksFocus: Record<string, string>;
  blocksThemes: StyleDefinition[];
  blocksWidths: StyleDefinition[];
}

export interface BlocksConfigData {
  title: BlockConfigBase;
  description: BlockConfigBase;
  slate: SlateBlock;
  text: BlockConfigBase;
  image: BlockConfigBase;
  leadimage: BlockConfigBase;
  listing: BlockConfigBase;
  video: BlockConfigBase;
  toc: BlockConfigBase;
  maps: BlockConfigBase;
  html: BlockConfigBase;
  table: BlockConfigBase;
  search: BlockConfigBase;
  gridBlock: BlockConfigBase;
  teaser: BlockConfigBase;
}

export type AvailableBlocks = keyof BlocksConfigData;

export interface BlockConfigBase {
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
  view?: React.ComponentType<BlockViewProps>;
  /**
   * The edit mode component
   */
  edit?: React.ComponentType<BlockEditProps>;
  /**
   * The group (blocks can be grouped, displayed in the chooser)
   */
  schema?: object;
  /**
   * The group of the block
   */
  blockSchema: (args: {
    props: unknown;
    intl: IntlShape;
  }) => Record<string, unknown>;
  /**
   * If the block is restricted, it won't show in the chooser.
   * The function signature is `({properties, block, navRoot, contentType})` where
   * `properties` is the current object data and `block` is the block being evaluated
   * in `BlockChooser`, `navRoot` is the nearest navigation root object and
   * `contentType` is the current content type.
   */
  restricted:
    | ((args: {
        properties: Content;
        block: BlockConfigBase; // TODO: This has to be extendable
        navRoot: Content;
        contentType: string;
        user: User;
      }) => boolean)
    | boolean;

  /**
   * A meta group `most used`, appearing at the top of the chooser
   */
  mostUsed: boolean;
  /**
   * Set this to true if the block manages its own focus
   */
  blockHasOwnFocusManagement?: boolean;
  /**
   * The sidebar tab you want to be selected when selecting the block
   */
  sidebarTab: boolean | 0 | 1;
  /**
   * A block can have an schema enhancer function with the signature: (schema) => schema
   * It can be either be at block level (it's applied always), at a variation level
   * or both. It's up to the developer to make them work nicely (not conflict) between them
   */
  schemaEnhancer?: (args: {
    schema: JSONSchema;
    formData: BlockConfigBase; // Not sure, if so, has to be extendable
    intl: IntlShape;
    navRoot: Content;
    contentType: string;
  }) => JSONSchema;
  /**
   * A block can define variations (it should include the stock, default one)
   */
  variations?: BlockExtension[];
  /**
   * A block can define extensions that enhance the default stock block
   */
  // TODO: Improve extensions shape
  extensions?: Record<string, BlockExtension>;
  blocksConfig?: Partial<BlocksConfigData>;
}

export interface BlockExtension {
  id: string;
  isDefault?: boolean;
  title: string;
  template?: React.ComponentType<any>;
  render?: React.ComponentType<any>;
  view?: React.ComponentType<any>;
  fullobjects?: boolean;
}

export interface SlateBlock extends BlockConfigBase {
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
  templates: (type: string) => (intl: IntlShape) => TemplateDefaultBlocksData;
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

export type JSONSchemaFieldsets = {
  id: string;
  title: string;
  fields: string[];
};

export type JSONSchema = {
  title: string;
  fieldsets: JSONSchemaFieldsets[];
  properties: object;
  required: string[];
};

export interface BlocksDataBlocks {
  '@type': string;
  styles?: any;
}

type BlocksDataBlocksType = BlocksDataBlocks & Record<string, any>;

export type BlocksData = {
  blocks: Record<string, BlocksDataBlocksType>;
  blocks_layout: {
    items: string[];
  };
};

export interface TemplateDefaultBlocksData {
  image: string;
  id: string;
  title: string;
  blocksData: BlocksData;
}
