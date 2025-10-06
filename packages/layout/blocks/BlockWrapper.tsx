import type { ReactNode } from 'react';
import cx from 'clsx';
import type { RenderBlocksProps } from './RenderBlocks';
import type { BlocksFormData } from '@plone/types';

type BlockWrapperProps = Partial<RenderBlocksProps> & {
  children: ReactNode;
  data: BlocksFormData;
};

const BlockWrapper = (props: BlockWrapperProps) => {
  const { blocksConfig, children, data } = props;
  const category = blocksConfig?.[data['@type']]?.category;
  // TODO: Bring in the StyleWrapper helpers for calculating styles and classes
  const classNames = undefined;
  const style = undefined;

  return (
    <div
      className={cx(
        `
          block
          block-${data['@type']}
        `,
        { [`category-${category}`]: category },
        classNames,
      )}
      style={style}
    >
      <div className="block-inner-container">{children}</div>
    </div>
  );
};

export default BlockWrapper;
