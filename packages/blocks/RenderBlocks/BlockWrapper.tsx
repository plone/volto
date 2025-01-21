import type { ReactNode } from 'react';
import cx from 'clsx';
import type { RenderBlocksProps } from './RenderBlocks';

type BlockWrapperProps = RenderBlocksProps & {
  block: string;
  children: ReactNode;
};
const BlockWrapper = (props: BlockWrapperProps) => {
  const { block, blocksConfig, children, content } = props;
  const data = content.blocks?.[block];
  const category = blocksConfig?.[data['@type']]?.category;
  // TODO: Bring in the StyleWrapper helpers for calculating styles and classes
  const classNames = null;
  const style = null;

  return (
    <div
      className={cx(
        `block-${data['@type']}`,
        { [`category-${category}`]: category },
        classNames,
      )}
      style={style}
    >
      {children}
    </div>
  );
};

export default BlockWrapper;
