/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { isDeepEqual } from '@plone/helpers';
import config from '@plone/registry';
import { createSlatePlugin, type SlateEditor, type TElement } from 'platejs';
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
  const { element } = props;
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
      <PlateElement {...props} contentEditable={false}>
        {props.children}
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
    editor.tf.select(pathRef.current);
  }, [editor]);

  return (
    <PlateElement {...props} contentEditable={false}>
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
      {props.children}
    </PlateElement>
  );
}

export const BaseNativeBlockAdapterPlugin = createSlatePlugin({
  key: 'unknown',
  node: {
    component: NativeBlockAdapterElement,
    isElement: true,
    type: 'unknown',
  },
});

export const NativeBlockAdapterPlugin = toPlatePlugin(
  BaseNativeBlockAdapterPlugin,
);
