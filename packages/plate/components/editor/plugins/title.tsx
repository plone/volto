import { ElementApi, PathApi } from 'platejs';
import {
  PlateElement,
  type PlateElementProps,
  type TPlateEditor,
  createPlatePlugin,
  toPlatePlugin,
} from 'platejs/react';
import { BlockInnerContainer } from '../../ui/block-inner-container';
import { useMetadataTextBinding } from './metadata-text-binding';

export const TITLE_BLOCK_TYPE = 'title';
const TITLE_PLACEHOLDER = 'Type the title...';

const isTitleNode = (node: unknown) =>
  ElementApi.isElement(node) && node.type === TITLE_BLOCK_TYPE;

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

const isPathInside = (path: number[], ancestorPath: number[]) =>
  ancestorPath.every((segment, index) => path[index] === segment);

const isSelectionInside = (selection: any, path: number[]) => {
  if (!selection) return false;

  return (
    isPathInside(selection.anchor.path, path) &&
    isPathInside(selection.focus.path, path)
  );
};

const setTitleNodeText = (
  editor: TPlateEditor,
  titlePath: number[],
  titleNode: unknown,
  value: string,
) => {
  editor.tf.replaceNodes(
    {
      ...(titleNode as object),
      children: [{ text: value }],
    } as any,
    { at: titlePath },
  );
};

function TitleMetadataSync() {
  useMetadataTextBinding({
    field: 'title',
    getState: (editor) => {
      const titleEntry = getTitleNodeEntry(editor.children as unknown[]);

      if (!titleEntry) {
        return {
          isActive: false,
          value: null,
        };
      }

      const titlePath = [titleEntry.index];

      return {
        isActive: isSelectionInside(editor.selection, titlePath),
        value: getNodeText(titleEntry.node),
      };
    },
    writeToEditor: (editor, value) => {
      const titleEntry = getTitleNodeEntry(editor.children as unknown[]);

      if (!titleEntry) return;

      setTitleNodeText(editor, [titleEntry.index], titleEntry.node, value);
    },
  });

  return null;
}

export function TitleBlockElement(props: PlateElementProps) {
  const showPlaceholder = getNodeText(props.element) === '';

  return (
    <PlateElement
      as="h1"
      className="font-heading relative mt-[1.6em] pb-1 text-4xl font-bold"
      {...props}
    >
      <BlockInnerContainer className="relative">
        {showPlaceholder ? (
          <span
            aria-hidden="true"
            contentEditable={false}
            className={`
              pointer-events-none absolute inset-x-0 top-1/2 z-0 -translate-y-1/2
              text-muted-foreground/80 select-none
            `}
          >
            {TITLE_PLACEHOLDER}
          </span>
        ) : null}
        <span className="relative z-10">{props.children}</span>
      </BlockInnerContainer>
    </PlateElement>
  );
}

export const BaseTitleBlockPlugin = createPlatePlugin({
  key: TITLE_BLOCK_TYPE,
  handlers: {
    onKeyDown: ({ editor, event }: any) => {
      const nativeEvent = (event as any)?.nativeEvent ?? event;
      if (!nativeEvent || nativeEvent.key !== 'Enter') return;
      if (!editor.selection || !editor.api.isCollapsed()) return;

      const currentEntry = editor.api.block({ highest: true });
      if (!currentEntry) return;

      const [currentNode, currentPath] = currentEntry;
      if (
        !ElementApi.isElement(currentNode) ||
        currentNode.type !== TITLE_BLOCK_TYPE
      ) {
        return;
      }

      event.preventDefault();
      editor.tf.insertNodes(
        editor.api.create.block({
          type: 'p',
          children: [{ text: '' }],
        }) as any,
        {
          at: PathApi.next(currentPath as number[]),
          select: true,
        },
      );
    },
  },
  node: {
    component: TitleBlockElement,
    isElement: true,
    type: TITLE_BLOCK_TYPE,
  },
  extendEditor: ({ editor }) => {
    const insertBreak = editor.tf.insertBreak;
    const normalizeNode = editor.normalizeNode as (entry: any) => void;

    editor.tf.insertBreak = () => {
      const blockEntry = editor.api.block({ highest: true });
      if (blockEntry) {
        const [node, path] = blockEntry;
        if (ElementApi.isElement(node) && node.type === TITLE_BLOCK_TYPE) {
          editor.tf.insertNodes(
            editor.api.create.block({
              type: 'p',
              children: [{ text: '' }],
            }) as any,
            {
              at: PathApi.next(path),
              select: true,
            },
          );
          return;
        }
      }

      insertBreak();
    };

    editor.normalizeNode = (entry: any) => {
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

export const TitleBlock = toPlatePlugin(BaseTitleBlockPlugin as any).configure({
  render: {
    afterEditable: TitleMetadataSync,
  },
});
