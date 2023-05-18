import React from 'react';
import PropTypes from 'prop-types';
import { isString } from 'lodash';
import { Segment, Button } from 'semantic-ui-react';
import { useIntl, FormattedMessage } from 'react-intl';
import { BlockDataForm, Icon, Image } from '@plone/volto/components';
import { ImageSchema } from './schema';
import imageSVG from '@plone/volto/icons/image.svg';
import clearSVG from '@plone/volto/icons/clear.svg';

const ImageSidebar = (props) => {
  const { data, block, onChangeBlock } = props;
  const intl = useIntl();
  const schema = ImageSchema({ formData: data, intl });
  return (
    <>
      <header className="header pulled">
        <h2>
          <FormattedMessage id="Image" defaultMessage="Image" />
        </h2>
      </header>

      <Segment className="sidebar-metadata-container" secondary attached>
        <>
          <div>
            {(data.url?.['@id'] ?? data.url).split('/').slice(-1)[0]}
            <Button
              basic
              className="cancel"
              onClick={(e) => {
                e.stopPropagation();
                onChangeBlock(block, {
                  ...data,
                  url: undefined,
                  image_scales: undefined,
                });
              }}
            >
              <Icon name={clearSVG} size="30px" />
            </Button>
          </div>
          {isString(data.url) ? (
            <img src={data.url} alt={data.alt} style={{ width: '50%' }} />
          ) : (
            <Image
              item={data.url}
              alt={data.alt}
              loading="lazy"
              style={{ width: '50%' }}
            />
          )}
        </>
        ) : (
        <>
          <FormattedMessage
            id="No image selected"
            defaultMessage="No image selected"
          />
          <Icon name={imageSVG} size="100px" color="#b8c6c8" />
        </>
        )}
      </Segment>
      <BlockDataForm
        schema={schema}
        title={schema.title}
        onChangeField={(id, value) => {
          onChangeBlock(block, {
            ...data,
            [id]: value,
            image_scales: id === 'url' ? undefined : data.image_scales,
          });
        }}
        onChangeBlock={onChangeBlock}
        formData={data}
        block={block}
      />
    </>
  );
};

ImageSidebar.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
};

export default ImageSidebar;
