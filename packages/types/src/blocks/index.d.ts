import type { Content } from '../content';
import type {
  AvailableBlocks,
  BlockExtension,
  BlocksConfigData,
} from '../config/Blocks';
import type { IntlShape } from 'react-intl';
import type { Location, History } from 'history';

export interface BlocksFormData {
  '@type': AvailableBlocks;
  variation?: string;
}

export interface BlockViewProps {
  blocksConfig: BlocksConfigData;
  content: Content; // WTF? Drilled down by withBlockExtensions?
  data: BlocksFormData;
  extensions: {}; // Needs to be defined
  id: string;
  location: Location;
  history: History;
  intl: IntlShape;
  metadata?: Content;
  properties: Content;
  token: string; // Drilled down by withBlockExtensions?
  variation: BlockExtension;
  path: string;
  className: string;
  style: Record<`--${string}`, string>;
}

type SearchMetadataResultItem = {};

export interface BlockEditProps {
  allowedBlocks: string[];
  block: string;
  blockNode: React.ReactNode; // This is a ref in fact, needs to be typed well
  blocksConfig: BlocksConfigData;
  closeObjectBrowser: () => void;
  contentType: string;
  data: BlocksFormData;
  detached: boolean;
  editable: boolean;
  extensions: {}; // Needs to be defined
  formDescription: string;
  formTitle: string;
  handleKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
    block: string,
    node: React.ReactNode, // this is in fact a ref
    options: {
      disableEnter: boolean;
      disableArrowUp: boolean;
      disableArrowDown: boolean;
    },
  ) => void;
  id: string;
  index: number;
  intl: IntlShape;
  isObjectBrowserOpen: boolean;
  manage: boolean;
  metadata: Content;
  multiSelected: boolean;
  navRoot: Content;
  onAddBlock: (type: string, index: number) => string;
  onChangeBlock: (id: string, newData: any) => void;
  onChangeField: (id: string, newData: any) => void;
  onChangeFormData: (newFormData: any) => void; // Not really FormData, the `data` inside the blocks settings
  onDeleteBlock: (id: string, selectPrev: boolean) => void;
  onFocusNextBlock: (
    currentBlock: string,
    blockNode: React.ReactNode,
    isMultipleSelection: boolean,
  ) => void;
  onFocusPreviousBlock: (
    currentBlock: string,
    blockNode: React.ReactNode,
    isMultipleSelection: boolean,
  ) => void;
  onInsertBlock: (id: string, value: any, current: any) => string; // Not sure what current is
  onMoveBlock: (dragIndex: number, hoverIndex: number) => void;
  onMutateBlock: (id: string, value: any) => void;
  onSelectBlock: (
    id: string,
    isMultipleSelection: boolean,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => void;
  openObjectBrowser: (options: {
    mode: 'image' | 'link' | 'multiple';
    onSelectItem: (
      url: string,
      item: Content | SearchMetadataResultItem,
    ) => void;
    dataName: string;
    overlay: boolean;
    propDataName: string;
    searchableTypes: string[];
    selectableTypes: string[];
    maximumSelectionSize: number;
    currentPath: string;
  }) => void;
  pathname: string;
  properties: Content;
  selected: Boolean;
  setSidebarTab: boolean | 0 | 1;
  showBlockChooser: boolean;
  showRestricted: boolean;
  type: string;
  variation: BlockExtension;
  path: string;
  className: string;
  style: Record<`--${string}`, string>;
  content: Content;
  history: History;
  location: Location;
  token: string;
  errors: Record<string, Array<string>>;
  blocksErrors: Record<string, Record<string, Array<string>>>;
}
