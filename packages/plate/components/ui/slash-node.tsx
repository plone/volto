import * as React from 'react';

import type { PlateEditor, PlateElementProps } from 'platejs/react';

import { AIChatPlugin } from '@platejs/ai/react';
import {
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
  SplitSquareHorizontalIcon,
  Square,
  Table,
  TableOfContentsIcon,
} from 'lucide-react';
import { type TComboboxInputElement, KEYS, PathApi } from 'platejs';
import { PlateElement } from 'platejs/react';
import config from '@plone/registry';
import { insertBlock } from '../editor/transforms';

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

const baseGroups: Group[] = [
  {
    group: 'AI',
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
    group: 'Basic blocks',
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
        onSelect: (editor, value) => {
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

const getBlocksApiHook = () => {
  try {
    const utility = config.getUtility({
      name: 'useBlocksApi',
      type: 'blocksApiContext',
    });
    return (utility as any)?.method as (() => any) | undefined;
  } catch (error) {
    return undefined;
  }
};

const useSplitEditorAtCursor = (editor: PlateEditor) => {
  const blocksApiHook = React.useMemo(() => getBlocksApiHook(), []);
  const blocksApi = blocksApiHook ? blocksApiHook() : null;
  const blocksApiRef = React.useRef(blocksApi);

  blocksApiRef.current = blocksApi;

  const split = React.useCallback(() => {
    const api = blocksApiRef.current;

    if (!api) return;
    if (!editor.selection || !editor.api.isCollapsed()) return;

    const slashType = editor.getType(KEYS.slashInput);

    // Remove the slash input node and its trailing space to avoid leaving
    // artifacts in either block.
    editor.tf.withoutNormalizing(() => {
      editor.tf.removeNodes({
        match: (node) => (node as any)?.type === slashType,
      });
      editor.tf.deleteBackward({ unit: 'character' });
    });

    const block = editor.api.block();

    if (!block) return;

    const blockPath = block[1];

    editor.tf.splitNodes({
      at: editor.selection,
      match: (node) => editor.api.isBlock(node),
      always: true,
    });

    const splitIndex = PathApi.next(blockPath)[0];
    const lower = editor.children.slice(splitIndex);

    if (!lower.length) return;

    editor.tf.withoutNormalizing(() => {
      while (editor.children.length > splitIndex) {
        editor.tf.removeNodes({ at: [splitIndex] });
      }
    });

    const { id, data, type, onInsertBlock, onSelectBlock } = api;
    const blockType = (data as any)['@type'] || type || 'slate';
    const upperData = { ...data, '@type': blockType, value: editor.children };
    const cleanLower = lower
      .map((node: any) => {
        if (Array.isArray(node?.children)) {
          const keptChildren = node.children.filter(
            (child: any) =>
              !(typeof child.text === 'string' && child.text.trim() === ''),
          );
          return keptChildren.length
            ? { ...node, children: keptChildren }
            : null;
        }
        return node;
      })
      .filter(Boolean);

    if (!cleanLower.length) return;
    const lowerData = {
      ...data,
      '@type': blockType,
      value: JSON.parse(JSON.stringify(cleanLower)),
    };

    // Defer to the next tick so Plate's pending change cycle completes first.
    setTimeout(() => {
      const newId = onInsertBlock(id, lowerData, upperData);
      if (onSelectBlock && newId) {
        onSelectBlock(newId);
      }
    }, 0);
  }, [blocksApiHook, editor]);

  return {
    split,
    enabled: Boolean(blocksApiHook),
  };
};

export function SlashInputElement(
  props: PlateElementProps<TComboboxInputElement>,
) {
  const { editor, element } = props;
  const { split, enabled: canSplit } = useSplitEditorAtCursor(editor);
  const groups = React.useMemo(() => {
    if (!canSplit) return baseGroups;

    return [
      {
        group: 'Volto',
        items: [
          {
            icon: <SplitSquareHorizontalIcon />,
            keywords: ['split', 'divide', 'new block'],
            label: 'Split editor here',
            value: 'action_split_editor',
            onSelect: split,
          },
        ],
      },
      ...baseGroups,
    ];
  }, [canSplit, split]);

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
