import { SidebarPortal, BlockDataForm } from '@plone/volto/components';
import { redirectBlockSchema } from './schema';
import { useIntl } from 'react-intl';
import ViewRedirectBlock from './View';

const EditRedirectBlock = (props) => {
  const { block, data, onChangeBlock, selected } = props;
  const intl = useIntl();
  const schema = redirectBlockSchema({ ...props, intl });
  return (
    <>
      <ViewRedirectBlock data={data} />
      <SidebarPortal selected={selected}>
        <BlockDataForm
          schema={schema}
          title={schema.title}
          onChangeField={(id, value) => {
            onChangeBlock(block, {
              ...data,
              [id]: value,
            });
          }}
          formData={data}
          block={block}
        />
      </SidebarPortal>
    </>
  );
};

export default EditRedirectBlock;
