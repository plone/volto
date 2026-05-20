import type { ReactNode } from 'react';
import cx from 'clsx';
import type { RenderBlocksProps } from './RenderBlocks';
import type { BlocksFormData } from '@plone/types';
import {
  getStyleFieldDefinitionsFromRegistry,
  resolveStyleFields,
} from '@plone/helpers';
import { getBlockStyleFieldConfigs } from '../helpers';

type BlockWrapperProps = Partial<RenderBlocksProps> & {
  children: ReactNode;
  data: BlocksFormData;
};

const BlockWrapper = (props: BlockWrapperProps) => {
  const { blocksConfig, children, data } = props;
  const category =
    blocksConfig?.[data['@type'] as keyof typeof blocksConfig]?.category;
  const { style } = resolveStyleFields({
    data,
    fieldConfigs: getBlockStyleFieldConfigs(data, blocksConfig),
    container: undefined,
    resolveDefinitions: getStyleFieldDefinitionsFromRegistry,
  });
  // TODO: Bring in the StyleWrapper helpers for calculating classes
  const classNames = undefined;

  return (
    <div
      className={cx(
        'block',
        'block-' + data['@type'],
        {
          ['category-' + category]: category,
        },
        classNames,
      )}
      style={style}
    >
      <div className="block-inner-container">{children}</div>
    </div>
  );
};

export default BlockWrapper;
