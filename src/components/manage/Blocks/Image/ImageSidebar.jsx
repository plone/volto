import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { BlockDataForm } from '@plone/volto/components';
import { ImageSchema } from './schema';

const ImageSidebar = (props) => {
  const { data, block, onChangeBlock } = props;
  const intl = useIntl();
  const schema = ImageSchema({ formData: data, intl });

  const dataAdapter = (data) => {
    if (data?.url && typeof data.url === 'object' && !Array.isArray(data.url)) {
      data.url = data.url[0]['@id'];
    }
    return data;
  };

  return (
    <BlockDataForm
      schema={schema}
      title={schema.title}
      onChangeField={(id, value) => {
        onChangeBlock(
          block,
          dataAdapter({
            ...data,
            [id]: value,
          }),
        );
      }}
      formData={data}
      block={block}
    />
  );
};

ImageSidebar.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
};

export default ImageSidebar;
