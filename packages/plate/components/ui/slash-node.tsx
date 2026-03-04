import * as React from 'react';

import type { PlateEditor, PlateElementProps } from 'platejs/react';

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
  PlusSquareIcon,
  PilcrowIcon,
  Quote,
  SparklesIcon,
  SquareSplitVertical,
  Square,
  Table,
  TableOfContentsIcon,
} from 'lucide-react';
import { type TComboboxInputElement, ElementApi, KEYS, PathApi } from 'platejs';
import { PlateElement } from 'platejs/react';
import { insertBlock } from '../editor/transforms';
import {
  getBlocksApi,
  getIntl,
  splitEditorAtCursor,
} from '../editor/plugins/split-utils';
import { TITLE_BLOCK_TYPE } from '../editor/plugins/title';

import {
  InlineCombobox,
  InlineComboboxContent,
  InlineComboboxEmpty,
  InlineComboboxGroup,
  InlineComboboxGroupLabel,
  InlineComboboxInput,
  InlineComboboxItem,
} from './inline-combobox';

type Group = {
  group: string;
  items: {
    icon: React.ReactNode;
    value: string;
    onSelect: (editor: PlateEditor, value: string) => void;
    className?: string;
    focusEditor?: boolean;
    keywords?: string[];
    label?: string;
  }[];
};

const addNewBlock = {
  focusEditor: true,
  icon: <PlusSquareIcon />,
  keywords: ['block', 'add', 'insert'],
  label: 'New block',
  value: 'action_new_block',
  onSelect: (editor: PlateEditor) => {
    const api = getBlocksApi(editor);
    if (!api?.onInsertBlock) return;

    setTimeout(() => {
      const newId = api.onInsertBlock(api.id, { '@type': 'slate' });
      api.onSelectBlock?.(newId ?? api.id);
    }, 0);
  },
};

const baseGroups: Group[] = [
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
        onSelect: (editor: PlateEditor, value: string) => {
          insertBlock(editor, value);
        },
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
      onSelect: (editor, value) => {
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
      onSelect: (editor, value) => {
        insertBlock(editor, value);
      },
    })),
  },
];

const filteredBlocksConfig = (blocksConfig: Record<string, any>) =>
  Object.entries(blocksConfig ?? {}).filter(([, block]) => {
    // Check if the block is well formed (has at least id and title)
    const blockIsWellFormed = Boolean(block?.title && block?.id);
    if (!blockIsWellFormed) return false;
    if (typeof block?.restricted === 'boolean' && block.restricted)
      return false;
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

const useSplitEditorAtCursor = (editor: PlateEditor) => {
  const split = React.useCallback(() => {
    splitEditorAtCursor(editor);
  }, [editor]);

  return {
    split,
    enabled: Boolean(editor) && config.settings.editorMode !== 'somersault',
  };
};

export function SlashInputElement(
  props: PlateElementProps<TComboboxInputElement>,
) {
  const { editor, element } = props;
  const { split, enabled: canSplit } = useSplitEditorAtCursor(editor);
  const intl = React.useMemo(() => getIntl(editor), [editor]);
  const blocks = React.useMemo(() => {
    const blocksConfig = config?.blocks?.blocksConfig;
    if (!blocksConfig) return [];

    return filteredBlocksConfig(blocksConfig).map(([id, block]: any) => {
      const format =
        intl?.formatMessage?.bind(intl) ||
        ((msg: any) => msg?.defaultMessage ?? msg?.id ?? String(msg));

      const label =
        typeof block.title === 'string' ? block.title : format(block.title);
      // const iconNode = block.icon ? (
      //   <Icon name={block.icon} size="16px" />
      // ) : (
      //   <Square />
      // );
      const Icon = block.icon ? block.icon : Square;
      return {
        icon: <Icon />,
        keywords: [id, label?.toString()?.toLowerCase?.()].filter(Boolean),
        label,
        value: `volto_${id}`,
        onSelect: (plateEditor: PlateEditor) => {
          if (config.settings.editorMode === 'somersault') {
            insertSomersaultNativeBlock(plateEditor, id);
            return;
          }

          const api = getBlocksApi(plateEditor);
          if (!api?.onInsertBlock) return;

          setTimeout(() => {
            const newId = api.onInsertBlock(api.id, { '@type': id });
            api.onSelectBlock?.(newId ?? api.id);
          }, 0);
        },
      };
    });
  }, [intl]);

  const hasTitleBlock = editor.children.some(
    (child) => ElementApi.isElement(child) && child.type === TITLE_BLOCK_TYPE,
  );

  const groups = React.useMemo(() => {
    const allowNewBlock = config.settings.editorMode !== 'somersault';
    const addGroupItem = (
      groups: Group[],
      groupName: Group['group'],
      item: { value: string } & Group['items'][number],
    ) =>
      groups.map((group) =>
        group.group === groupName
          ? {
              ...group,
              items: group.items.some(
                (existing) => existing.value === item.value,
              )
                ? group.items
                : [...group.items, item],
            }
          : group,
      );

    let nextGroups = baseGroups;
    if (allowNewBlock) {
      nextGroups = addGroupItem(nextGroups, 'Actions', addNewBlock);
    }
    if (!hasTitleBlock) {
      const titleBlockItem = {
        icon: <BookA />,
        keywords: ['title', 'page title', 'h1'],
        label: 'Title',
        value: TITLE_BLOCK_TYPE,
        onSelect: (editor: PlateEditor, value: string) => {
          insertBlock(editor, value);
        },
      };

      nextGroups = addGroupItem(nextGroups, 'Text blocks', titleBlockItem);
    }
    if (canSplit) {
      const splitItem = {
        icon: <SquareSplitVertical />,
        keywords: ['split', 'divide', 'new block'],
        label: 'Split editor here',
        value: 'action_split_editor',
        onSelect: split,
      };

      nextGroups = addGroupItem(nextGroups, 'Actions', splitItem);
    }

    if (blocks.length) {
      nextGroups = [
        ...nextGroups,
        {
          group: 'Blocks',
          items: blocks,
        },
      ];
    }

    return nextGroups;
  }, [canSplit, hasTitleBlock, split, blocks]);

  return (
    <PlateElement {...props} as="span">
      <InlineCombobox element={element} trigger="/">
        <InlineComboboxInput />

        <InlineComboboxContent>
          <InlineComboboxEmpty>No results</InlineComboboxEmpty>

          {groups.map(({ group, items }) => (
            <InlineComboboxGroup key={group}>
              <InlineComboboxGroupLabel>{group}</InlineComboboxGroupLabel>

              {items.map(
                ({ focusEditor, icon, keywords, label, value, onSelect }) => (
                  <InlineComboboxItem
                    key={value}
                    value={value}
                    onClick={() => onSelect(editor, value)}
                    label={label}
                    focusEditor={focusEditor}
                    group={group}
                    keywords={keywords}
                  >
                    <div className="mr-2 text-muted-foreground">{icon}</div>
                    {label ?? value}
                  </InlineComboboxItem>
                ),
              )}
            </InlineComboboxGroup>
          ))}
        </InlineComboboxContent>
      </InlineCombobox>

      {props.children}
    </PlateElement>
  );
}
