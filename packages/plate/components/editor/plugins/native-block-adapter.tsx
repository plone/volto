/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { BlockSelectionPlugin } from '@platejs/selection/react';
import { isDeepEqual } from '@plone/helpers';
import config from '@plone/registry';
import {
  createSlatePlugin,
  ElementApi,
  PathApi,
  type SlateEditor,
  type TElement,
} from 'platejs';
import {
  PlateElement,
  toPlatePlugin,
  useEditorRef,
  useReadOnly,
  useSelected,
  type PlateElementProps,
} from 'platejs/react';

type NativeBlockElement = TElement & {
  id?: string;
  '@type'?: string;
  [key: string]: unknown;
};

type NativeBlockData = Record<string, unknown> & {
  '@type': string;
};

function toBlockData(element: NativeBlockElement): NativeBlockData | null {
  const blockType = element['@type'];
  if (!blockType || typeof blockType !== 'string') return null;

  const rest = { ...element } as Record<string, unknown>;
  delete rest.id;
  delete rest.type;
  delete rest.children;

  return {
    ...rest,
    '@type': blockType,
  };
}

function fromBlockData(data: NativeBlockData): Partial<NativeBlockElement> {
  const rest = { ...data } as Record<string, unknown>;
  delete rest.id;
  delete rest.type;
  delete rest.children;
  return rest;
}

function getBlockConfig(blockType: string) {
  return config?.blocks?.blocksConfig?.[blockType];
}

function getBlockId(element: NativeBlockElement, path: number[]) {
  const explicitId = element?.id;
  return explicitId ? String(explicitId) : path.join('-');
}

export function NativeBlockAdapterElement(
  props: PlateElementProps<NativeBlockElement>,
) {
  const { children: _children, element, ...restProps } = props;
  const baseAttributes = {
    ...restProps.attributes,
    contentEditable: false,
  };
  void _children;
  const editor = useEditorRef<SlateEditor>();
  const readOnly = useReadOnly();
  const selected = useSelected();

  const path = React.useMemo(
    () => editor.api.findPath(element),
    [editor, element],
  );
  const pathRef = React.useRef(path);
  pathRef.current = path;

  if (!path) return null;

  const blockData = React.useMemo(() => toBlockData(element), [element]);
  const blockType = blockData?.['@type'];
  const block = blockType ? getBlockConfig(blockType) : null;

  if (!blockData || !block) {
    return (
      <PlateElement
        {...restProps}
        attributes={baseAttributes}
        element={element}
      >
        {_children}
      </PlateElement>
    );
  }

  const blockId = React.useMemo(
    () => getBlockId(element, path),
    [element, path],
  );
  const Edit = block.edit;
  const View = block.view;

  const handleSetBlock = React.useCallback(
    (data: NativeBlockData) => {
      const mapped = fromBlockData(data);
      const current = editor.api.node(pathRef.current)?.[0] as
        | NativeBlockElement
        | undefined;
      const next = current
        ? ({ ...current, ...mapped } as NativeBlockElement)
        : mapped;

      if (!isDeepEqual(current, next)) {
        editor.tf.setNodes(mapped as any, { at: pathRef.current });
      }
    },
    [editor],
  );

  const handleChangeBlock = React.useCallback(
    (_block: string, data: NativeBlockData) => {
      handleSetBlock(data);
    },
    [handleSetBlock],
  );

  const handleSelectBlock = React.useCallback(() => {
    const currentPath = editor.api.findPath(element);
    if (!currentPath) return;

    const elementId = (element as any)?.id;
    if (elementId) {
      editor.getApi(BlockSelectionPlugin).blockSelection.set(String(elementId));
    }

    editor.tf.focus();
    editor.tf.select(currentPath);
  }, [editor, element]);

  const interactiveAttributes = {
    ...baseAttributes,
  };

  const className = [
    restProps.className,
    selected && 'rounded-sm outline-2 outline-quanta-sapphire',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <PlateElement
      {...restProps}
      attributes={interactiveAttributes}
      element={element}
      className={className}
    >
      {readOnly ? (
        View ? (
          <View data={blockData} />
        ) : null
      ) : Edit ? (
        <Edit
          data={blockData}
          block={blockId}
          selected={selected}
          setBlock={handleSetBlock}
          onChangeBlock={handleChangeBlock}
          onSelectBlock={handleSelectBlock}
          blocksConfig={config.blocks.blocksConfig}
          blocksErrors={{}}
          navRoot={config.settings?.navRootPath}
          contentType={blockData['@type']}
        />
      ) : View ? (
        <View data={blockData} />
      ) : null}
    </PlateElement>
  );
}

export const BaseNativeBlockAdapterPlugin = createSlatePlugin({
  // TODO: Find a better key for this plugin. Maybe just `block`?
  // It is used in conversions too.
  key: 'unknown',
  handlers: {
    onKeyDown: ({ editor, event }) => {
      const nativeEvent = (event as any)?.nativeEvent ?? event;
      if (!nativeEvent) return;
      if (!editor.selection || !editor.api.isCollapsed()) return;

      const currentEntry = editor.api.block({ highest: true });
      if (!currentEntry) return;

      const [currentNode, currentPath] = currentEntry;
      const currentIsNativeUnknown =
        ElementApi.isElement(currentNode) && currentNode.type === 'unknown';

      if (nativeEvent.key === 'Enter' && currentIsNativeUnknown) {
        event.preventDefault();

        const nextPath = PathApi.next(currentPath as number[]);
        const nextNode = editor.api.node(nextPath)?.[0];

        if (ElementApi.isElement(nextNode) && nextNode.type !== 'unknown') {
          editor.tf.focus();
          editor.tf.select([...nextPath, 0]);
          editor.tf.collapse({ edge: 'start' });
          return;
        }

        editor.tf.insertNodes(
          editor.api.create.block({
            type: 'p',
            children: [{ text: '' }],
          }),
          {
            at: nextPath,
            select: true,
          },
        );
        return;
      }

      if (nativeEvent.key === 'ArrowUp' && currentIsNativeUnknown) {
        event.preventDefault();

        let previousPath: number[] | undefined;
        try {
          previousPath = PathApi.previous(currentPath as number[]);
        } catch {
          return;
        }
        if (!previousPath) return;

        const previousNode = editor.api.node(previousPath)?.[0];
        editor.tf.focus();
        if (
          ElementApi.isElement(previousNode) &&
          previousNode.type === 'unknown'
        ) {
          editor.tf.select(previousPath);
          return;
        }
        editor.tf.select([...previousPath, 0]);
        editor.tf.collapse({ edge: 'end' });
        return;
      }

      if (nativeEvent.key === 'ArrowDown' && currentIsNativeUnknown) {
        event.preventDefault();

        const nextPath = PathApi.next(currentPath as number[]);
        const nextNode = editor.api.node(nextPath)?.[0];
        if (!nextNode) return;

        editor.tf.focus();
        if (ElementApi.isElement(nextNode) && nextNode.type === 'unknown') {
          editor.tf.select(nextPath);
          return;
        }
        editor.tf.select([...nextPath, 0]);
        editor.tf.collapse({ edge: 'start' });
        return;
      }

      if (nativeEvent.key === 'ArrowDown') {
        let nextPath: number[] | undefined;
        try {
          nextPath = PathApi.next(currentPath as number[]);
        } catch {
          return;
        }

        if (!nextPath) return;

        const nextNode = editor.api.node(nextPath)?.[0];
        if (ElementApi.isElement(nextNode) && nextNode.type === 'unknown') {
          event.preventDefault();
          editor.tf.focus();
          editor.tf.select(nextPath);
        }
        return;
      }

      if (nativeEvent.key !== 'ArrowUp') return;

      let previousPath: number[] | undefined;
      try {
        previousPath = PathApi.previous(currentPath as number[]);
      } catch {
        return;
      }

      if (!previousPath) return;

      const previousNode = editor.api.node(previousPath)?.[0];
      if (
        ElementApi.isElement(previousNode) &&
        previousNode.type === 'unknown'
      ) {
        event.preventDefault();
        editor.tf.focus();
        editor.tf.select(previousPath);
      }
    },
  },
  node: {
    component: NativeBlockAdapterElement,
    isVoid: true,
    isElement: true,
    type: 'unknown',
  },
  extendEditor: ({ editor }) => {
    const insertBreak = editor.tf.insertBreak;

    editor.tf.insertBreak = () => {
      const blockEntry = editor.api.block({ highest: true });
      if (blockEntry) {
        const [node, path] = blockEntry;
        if (ElementApi.isElement(node) && node.type === 'unknown') {
          const nextPath = PathApi.next(path);
          const nextNode = editor.api.node(nextPath)?.[0];

          if (ElementApi.isElement(nextNode) && nextNode.type !== 'unknown') {
            editor.tf.focus();
            editor.tf.select([...nextPath, 0]);
            editor.tf.collapse({ edge: 'start' });
            return;
          }

          editor.tf.insertNodes(
            editor.api.create.block({
              type: 'p',
              children: [{ text: '' }],
            }),
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

    return editor;
  },
});

export const NativeBlockAdapterPlugin = toPlatePlugin(
  BaseNativeBlockAdapterPlugin,
);
