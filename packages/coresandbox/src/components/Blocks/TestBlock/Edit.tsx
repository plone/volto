import SidebarPortal from '@plone/volto/components/manage/Sidebar/SidebarPortal';
import Data from './Data';
import type { BlockEditProps } from '@plone/types';

const TestBlockEdit = (props: BlockEditProps) => {
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

export default TestBlockEdit;
