import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, useIntl } from 'react-intl';
import cx from 'classnames';
import { Message } from 'semantic-ui-react';

import { LeadImageSidebar, SidebarPortal } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';
import imageBlockSVG from '@plone/volto/components/manage/Blocks/Image/block-image.svg';

const messages = defineMessages({
  ImageBlockInputPlaceholder: {
    id: "Upload a lead image in the 'Lead Image' content field.",
    defaultMessage: "Upload a lead image in the 'Lead Image' content field.",
  },
});

const Edit = React.memo((props) => {
  const intl = useIntl();
  const { data, properties, selected } = props;

  const placeholder = useMemo(
    () =>
      data.placeholder ||
      intl.formatMessage(messages.ImageBlockInputPlaceholder),
    [data, intl],
  );

  return (
    <div
      className={cx(
        'block image align',
        {
          center: !Boolean(data.align),
        },
        data.align,
      )}
    >
      {!properties.image && (
        <Message>
          <center>
            <img src={imageBlockSVG} alt="" />
            <div className="message-text">{placeholder}</div>
          </center>
        </Message>
      )}
      {properties.image && (
        <img
          className={cx({ 'full-width': data.align === 'full' })}
          src={
            properties.image.data
              ? `data:${properties.image['content-type']};base64,${properties.image.data}`
              : flattenToAppURL(properties.image.download)
          }
          alt={data.image_caption || ''}
        />
      )}
      <SidebarPortal selected={selected}>
        <LeadImageSidebar {...props} />
      </SidebarPortal>
    </div>
  );
});
Edit.propTypes = {
  properties: PropTypes.objectOf(PropTypes.any).isRequired,
  selected: PropTypes.bool.isRequired,
  block: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  pathname: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
  openObjectBrowser: PropTypes.func.isRequired,
};

export default Edit;
