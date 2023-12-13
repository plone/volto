import { SidebarPortal } from '@plone/volto/components';
import { withBlockExtensions } from '@plone/volto/helpers';
import AnnounceData from './data';
import AnnounceView from './view';

const AnnounceEdit = (props) => {
  const { data, onChangeBlock, block, selected } = props;
  return (
    <>
      <AnnounceView {...props} />
      <SidebarPortal selected={selected}>
        <AnnounceData
          key={block}
          {...props}
          data={data}
          block={block}
          onChangeBlock={onChangeBlock}
        />
      </SidebarPortal>
    </>
  );
};

export default withBlockExtensions(AnnounceEdit);
