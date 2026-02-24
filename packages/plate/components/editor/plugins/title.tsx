import { useEffect, useMemo, useRef } from 'react';
import { atom, type PrimitiveAtom } from 'jotai';
import { useFieldFocusedAtom } from '@plone/helpers';
import config from '@plone/registry';
import { createSlatePlugin, ElementApi } from 'platejs';
import {
  PlateElement,
  type PlateElementProps,
  toPlatePlugin,
  useEditorRef,
  useEditorSelector,
} from 'platejs/react';
import { BLOCK_WIDTH_VALUES } from './block-width-plugin';

export const TITLE_BLOCK_TYPE = 'volto_title';
const LEGACY_TITLE_BLOCK_TYPE = 'title';

type TitleData = {
  title?: string;
};

const fallbackFormAtom = atom<TitleData>({ title: '' });

const isTitleNode = (node: unknown) =>
  ElementApi.isElement(node) &&
  (node.type === TITLE_BLOCK_TYPE || node.type === LEGACY_TITLE_BLOCK_TYPE);

const getTitleNodeEntry = (nodes: unknown[]) => {
  for (let index = 0; index < nodes.length; index += 1) {
    if (isTitleNode(nodes[index])) {
      return {
        index,
        node: nodes[index],
      };
    }
  }

  return null;
};

const getNodeText = (node: unknown): string => {
  if (!node || typeof node !== 'object') return '';
  if ('text' in node && typeof node.text === 'string') return node.text;
  if (!('children' in node) || !Array.isArray(node.children)) return '';

  return node.children.map((child) => getNodeText(child)).join('');
};

type SyncAction = 'none' | 'atom-to-editor' | 'editor-to-atom';

export function getTitleSyncAction({
  previousAtomTitle,
  previousEditorTitle,
  atomTitle,
  editorTitle,
}: {
  previousAtomTitle: string;
  previousEditorTitle: string | null;
  atomTitle: string;
  editorTitle: string | null;
}): SyncAction {
  if (editorTitle === null) return 'none';

  const atomChanged = previousAtomTitle !== atomTitle;
  const editorChanged = previousEditorTitle !== editorTitle;
  const titleNodeJustAppeared =
    previousEditorTitle === null && editorTitle !== null;
  const shouldInitializeFromAtom =
    titleNodeJustAppeared && editorTitle === '' && atomTitle !== '';

  if (shouldInitializeFromAtom) return 'atom-to-editor';
  if (atomChanged && editorTitle !== atomTitle) return 'atom-to-editor';
  if (editorChanged && !atomChanged && editorTitle !== atomTitle) {
    return 'editor-to-atom';
  }

  return 'none';
}

function TitleMetadataSync() {
  const editor = useEditorRef();
  const previousEditorTitleRef = useRef<string | null>(null);
  const previousAtomTitleRef = useRef('');
  const formAtom = useMemo(() => {
    try {
      return config
        .getUtility({
          name: 'formAtom',
          type: 'atom',
        })
        ?.method?.() as PrimitiveAtom<TitleData> | undefined;
    } catch {
      return undefined;
    }
  }, []);
  const [titleValue, setTitleValue] = useFieldFocusedAtom<TitleData, 'title'>(
    formAtom ?? fallbackFormAtom,
    'title',
  );
  const editorTitle = useEditorSelector((editor) => {
    const titleEntry = getTitleNodeEntry(editor.children as unknown[]);
    return titleEntry ? getNodeText(titleEntry.node) : null;
  }, []);

  const hasFormAtom = !!formAtom;
  const normalizedTitle = titleValue ?? '';

  useEffect(() => {
    if (!hasFormAtom) {
      previousEditorTitleRef.current = editorTitle;
      previousAtomTitleRef.current = normalizedTitle;
      return;
    }

    const action = getTitleSyncAction({
      previousAtomTitle: previousAtomTitleRef.current,
      previousEditorTitle: previousEditorTitleRef.current,
      atomTitle: normalizedTitle,
      editorTitle,
    });

    if (action === 'atom-to-editor') {
      const titleEntry = getTitleNodeEntry(editor.children as unknown[]);
      if (titleEntry) {
        editor.tf.replaceNodes(
          {
            ...(titleEntry.node as object),
            children: [{ text: normalizedTitle }],
          },
          { at: [titleEntry.index] },
        );
      }
    }

    if (action === 'editor-to-atom' && editorTitle !== null) {
      setTitleValue(editorTitle);
    }

    previousEditorTitleRef.current = editorTitle;
    previousAtomTitleRef.current = normalizedTitle;
  }, [editor, editorTitle, hasFormAtom, normalizedTitle, setTitleValue]);

  return null;
}

export function TitleBlockElement(props: PlateElementProps) {
  return (
    <PlateElement
      as="h1"
      className="font-heading mt-[1.6em] pb-1 text-4xl font-bold"
      {...props}
    >
      {props.children}
    </PlateElement>
  );
}

export const BaseTitleBlockPlugin = createSlatePlugin({
  key: TITLE_BLOCK_TYPE,
  node: {
    component: TitleBlockElement,
    isElement: true,
    type: TITLE_BLOCK_TYPE,
  },
  options: {
    blockWidth: {
      defaultWidth: BLOCK_WIDTH_VALUES.default,
      widths: [BLOCK_WIDTH_VALUES.default],
    },
  },
  extendEditor: ({ editor }) => {
    const normalizeNode = editor.normalizeNode as (entry: any) => void;

    editor.normalizeNode = (entry) => {
      const [, path] = entry;

      if (path.length === 0) {
        const titleIndexes = editor.children.reduce<number[]>(
          (acc, child, index) => {
            if (
              ElementApi.isElement(child) &&
              child.type === TITLE_BLOCK_TYPE
            ) {
              acc.push(index);
            }

            return acc;
          },
          [],
        );

        if (titleIndexes.length > 1) {
          // Keep the first Title block and drop all additional instances.
          titleIndexes
            .slice(1)
            .reverse()
            .forEach((index) => {
              editor.tf.removeNodes({ at: [index] });
            });
          return;
        }
      }

      normalizeNode(entry);
    };

    return editor;
  },
});

export const TitleBlock = toPlatePlugin(BaseTitleBlockPlugin).configure({
  render: {
    afterEditable: TitleMetadataSync,
  },
});
