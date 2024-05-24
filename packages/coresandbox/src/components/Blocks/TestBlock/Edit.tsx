import { SidebarPortal } from '@plone/volto/components';
import Data from './Data';
import type { BlockEditProps } from '@plone/types';

const TextBlockEdit = (props: BlockEditProps) => {
  const { selected } = props;

  return (
    <>
      <div>Test Block Edit</div>
      <SidebarPortal selected={selected}>
        <Data {...props} />
      </SidebarPortal>
    </>
  );
};

export default TextBlockEdit;
