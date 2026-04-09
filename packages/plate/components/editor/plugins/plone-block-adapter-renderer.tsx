import React from 'react';
import config from '@plone/registry';
import { createSlatePlugin, type TElement } from 'platejs';
import { toPlatePlugin, type PlateElementProps } from 'platejs/react';
import { BlockInnerContainer } from '../../ui/block-inner-container';

type NativeBlockElement = TElement & {
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

function getBlockConfig(blockType: string) {
  const blocksConfig = config?.blocks?.blocksConfig as unknown | undefined;
  return (blocksConfig as Record<string, unknown> | undefined)?.[blockType] as
    | {
        view?: React.ComponentType<any>;
      }
    | undefined;
}

function PloneBlockAdapterRendererElement(
  props: PlateElementProps<NativeBlockElement>,
) {
  const blockData = React.useMemo(
    () => toBlockData(props.element),
    [props.element],
  );
  const blockType = blockData?.['@type'];
  const block = blockType ? getBlockConfig(blockType) : null;
  const View = block?.view;

  if (!blockData || !View) {
    return <div {...props.attributes}>{props.children}</div>;
  }

  return (
    <div {...props.attributes}>
      <BlockInnerContainer>
        <View data={blockData} />
      </BlockInnerContainer>
    </div>
  );
}

export const BasePloneBlockAdapterRendererPlugin = createSlatePlugin({
  key: 'unknown',
  node: {
    component: PloneBlockAdapterRendererElement,
    isVoid: true,
    isElement: true,
    type: 'unknown',
  },
});

export const PloneBlockAdapterRendererPlugin = toPlatePlugin(
  BasePloneBlockAdapterRendererPlugin,
);
