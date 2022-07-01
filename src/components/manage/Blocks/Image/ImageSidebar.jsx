import React from 'react';
import { useDispatch } from 'react-redux';
import { getContent } from '@plone/volto/actions';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { useIntl, FormattedMessage } from 'react-intl';
import { BlockDataForm, Icon } from '@plone/volto/components';
import { isInternalURL, flattenToAppURL } from '@plone/volto/helpers';
import { ImageSchema } from './schema';
import imageSVG from '@plone/volto/icons/image.svg';

const ImageSidebar = (props) => {
  const { data, block, onChangeBlock } = props;
  const intl = useIntl();
  const schema = ImageSchema({ formData: data, intl });
  const href = flattenToAppURL(data.url);
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (href && !data.rights) {
      dispatch(getContent(flattenToAppURL(href), null, block)).then((resp) => {
        onChangeBlock(block, {
          ...data,
          ...(!data.rights && { rights: resp.rights }),
        });
      });
    }
    if (!href) {
      onChangeBlock(block, {
        ...data,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [href]);
  return (
    <>
      <header className="header pulled">
        <h2>
          <FormattedMessage id="Image" defaultMessage="Image" />
        </h2>
      </header>

      <Segment className="sidebar-metadata-container" secondary attached>
        {data.url ? (
          <>
            {data.url.split('/').slice(-1)[0]}
            {isInternalURL(data.url) && (
              <img
                src={`${flattenToAppURL(data.url)}/@@images/image/mini`}
                alt={data.alt}
              />
            )}
            {!isInternalURL(data.url) && (
              <img src={data.url} alt={data.alt} style={{ width: '50%' }} />
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
          });
        }}
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
