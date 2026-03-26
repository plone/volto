import * as React from 'react';

import type { PlateEditor } from 'platejs/react';

import { AIChatPlugin } from '@platejs/ai/react';
import { SuggestionPlugin } from '@platejs/suggestion/react';
import config from '@plone/registry';
import {
  BookA,
  ChevronRightIcon,
  Code2,
  Columns3Icon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ImageIcon,
  LightbulbIcon,
  ListIcon,
  ListOrdered,
  PilcrowIcon,
  Quote,
  SparklesIcon,
  Square,
  Table,
  TableOfContentsIcon,
} from 'lucide-react';
import { KEYS, PathApi } from 'platejs';

import { insertBlock } from '../transforms';
import { TITLE_BLOCK_TYPE } from './title';

export type SlashMenuItem = {
  icon: React.ReactNode;
  value: string;
  onSelect: (editor: PlateEditor, value: string) => void;
  className?: string;
  description?: string;
  focusEditor?: boolean;
  keywords?: string[];
  label?: string;
};

export type SlashMenuGroup = {
  group: string;
  items: SlashMenuItem[];
};

export type SlashMenuContext = {
  hasTitleBlock: boolean;
  intl?: {
    formatMessage?: (...args: any[]) => any;
  } | null;
};

export type SlashMenuConfig = {
  groups?: SlashMenuGroup[];
  getGroups?: (
    editor: PlateEditor,
    context: SlashMenuContext,
  ) => SlashMenuGroup[];
  extendGroups?: (
    groups: SlashMenuGroup[],
    editor: PlateEditor,
    context: SlashMenuContext,
  ) => SlashMenuGroup[];
};

const filteredBlocksConfig = (blocksConfig: Record<string, any>) =>
  Object.entries(blocksConfig ?? {}).filter(([, block]) => {
    const blockIsWellFormed = Boolean(block?.title && block?.id);
    if (!blockIsWellFormed) return false;
    if (typeof block?.restricted === 'boolean' && block.restricted) {
      return false;
    }
    return true;
  });

const insertSomersaultNativeBlock = (
  editor: PlateEditor,
  nativeBlockType: string,
) => {
  editor.tf.withoutNormalizing(() => {
    const block = editor.api.block();
    if (!block) return;

    editor.tf.insertNodes(
      editor.api.create.block({
        type: 'unknown',
        '@type': nativeBlockType,
      }),
      {
        at: PathApi.next(block[1]),
        select: true,
      },
    );

    if (block[0].type !== 'unknown') {
      editor.getApi(SuggestionPlugin).suggestion.withoutSuggestions(() => {
        editor.tf.removeNodes({ previousEmptyBlock: true });
      });
    }
  });
};

const addGroupItem = (
  groups: SlashMenuGroup[],
  groupName: SlashMenuGroup['group'],
  item: SlashMenuItem,
) =>
  groups.map((group) =>
    group.group === groupName
      ? {
          ...group,
          items: group.items.some((existing) => existing.value === item.value)
            ? group.items
            : [...group.items, item],
        }
      : group,
  );

const createStaticGroups = (): SlashMenuGroup[] => [
  {
    group: 'Actions',
    items: [
      {
        focusEditor: false,
        icon: <SparklesIcon />,
        value: 'AI',
        onSelect: (editor) => {
          editor.getApi(AIChatPlugin).aiChat.show();
        },
      },
    ],
  },
  {
    group: 'Text blocks',
    items: [
      {
        icon: <PilcrowIcon />,
        keywords: ['paragraph'],
        label: 'Text',
        value: KEYS.p,
      },
      {
        icon: <ImageIcon />,
        keywords: ['img', 'picture', 'photo'],
        label: 'Image',
        value: KEYS.img,
      },
      {
        icon: <Heading1Icon />,
        keywords: ['title', 'h1'],
        label: 'Heading 1',
        value: KEYS.h1,
      },
      {
        icon: <Heading2Icon />,
        keywords: ['subtitle', 'h2'],
        label: 'Heading 2',
        value: KEYS.h2,
      },
      {
        icon: <Heading3Icon />,
        keywords: ['subtitle', 'h3'],
        label: 'Heading 3',
        value: KEYS.h3,
      },
      {
        icon: <ListIcon />,
        keywords: ['unordered', 'ul', '-'],
        label: 'Bulleted list',
        value: KEYS.ul,
      },
      {
        icon: <ListOrdered />,
        keywords: ['ordered', 'ol', '1'],
        label: 'Numbered list',
        value: KEYS.ol,
      },
      {
        icon: <Square />,
        keywords: ['checklist', 'task', 'checkbox', '[]'],
        label: 'To-do list',
        value: KEYS.listTodo,
      },
      {
        icon: <ChevronRightIcon />,
        keywords: ['collapsible', 'expandable'],
        label: 'Toggle',
        value: KEYS.toggle,
      },
      {
        icon: <Code2 />,
        keywords: ['```'],
        label: 'Code Block',
        value: KEYS.codeBlock,
      },
      {
        icon: <Table />,
        label: 'Table',
        value: KEYS.table,
      },
      {
        icon: <Quote />,
        keywords: ['citation', 'blockquote', 'quote', '>'],
        label: 'Blockquote',
        value: KEYS.blockquote,
      },
      {
        description: 'Insert a highlighted block.',
        icon: <LightbulbIcon />,
        keywords: ['note'],
        label: 'Callout',
        value: KEYS.callout,
      },
    ].map((item) => ({
      ...item,
      onSelect: (editor: PlateEditor, value: string) => {
        insertBlock(editor, value);
      },
    })),
  },
  {
    group: 'Advanced blocks',
    items: [
      {
        icon: <TableOfContentsIcon />,
        keywords: ['toc'],
        label: 'Table of contents',
        value: KEYS.toc,
      },
      {
        icon: <Columns3Icon />,
        label: '3 columns',
        value: 'action_three_columns',
      },
    ].map((item) => ({
      ...item,
      onSelect: (editor: PlateEditor, value: string) => {
        insertBlock(editor, value);
      },
    })),
  },
];

const createRegistryBlockItems = (
  intl?: SlashMenuContext['intl'],
): SlashMenuItem[] => {
  const blocksConfig = config?.blocks?.blocksConfig;
  if (!blocksConfig) return [];

  return filteredBlocksConfig(blocksConfig).map(([id, block]: any) => {
    const format =
      intl?.formatMessage?.bind(intl) ||
      ((msg: any) => msg?.defaultMessage ?? msg?.id ?? String(msg));

    const label =
      typeof block.title === 'string' ? block.title : format(block.title);
    const Icon = block.icon ? block.icon : Square;

    return {
      icon: <Icon />,
      keywords: [id, label?.toString()?.toLowerCase?.()].filter(Boolean),
      label,
      value: `block_${id}`,
      onSelect: (editor: PlateEditor) => {
        insertSomersaultNativeBlock(editor, id);
      },
    };
  });
};

export const getDefaultSlashMenuGroups = (
  editor: PlateEditor,
  context: SlashMenuContext,
): SlashMenuGroup[] => {
  let groups = createStaticGroups();

  if (!context.hasTitleBlock) {
    groups = addGroupItem(groups, 'Text blocks', {
      icon: <BookA />,
      keywords: ['title', 'page title', 'h1'],
      label: 'Title',
      value: TITLE_BLOCK_TYPE,
      onSelect: (nextEditor: PlateEditor, value: string) => {
        insertBlock(nextEditor, value);
      },
    });
  }

  const blocks = createRegistryBlockItems(context.intl);
  if (blocks.length) {
    groups = [
      ...groups,
      {
        group: 'Blocks',
        items: blocks,
      },
    ];
  }

  return groups;
};

export const resolveSlashMenuGroups = (
  editor: PlateEditor,
  config: SlashMenuConfig | undefined,
  context: SlashMenuContext,
): SlashMenuGroup[] => {
  const groups =
    config?.getGroups?.(editor, context) ??
    config?.groups ??
    getDefaultSlashMenuGroups(editor, context);

  return config?.extendGroups?.(groups, editor, context) ?? groups;
};
