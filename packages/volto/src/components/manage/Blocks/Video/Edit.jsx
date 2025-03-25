import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, useIntl } from 'react-intl';
import { Button, Input, Message } from 'semantic-ui-react';
import cx from 'classnames';

import Icon from '@plone/volto/components/theme/Icon/Icon';
import SidebarPortal from '@plone/volto/components/manage/Sidebar/SidebarPortal';
import VideoSidebar from '@plone/volto/components/manage/Blocks/Video/VideoSidebar';
import clearSVG from '@plone/volto/icons/clear.svg';
import aheadSVG from '@plone/volto/icons/ahead.svg';
import videoBlockSVG from '@plone/volto/components/manage/Blocks/Video/block-video.svg';
import Body from '@plone/volto/components/manage/Blocks/Video/Body';
import { withBlockExtensions } from '@plone/volto/helpers/Extensions';
import config from '@plone/volto/registry';

const messages = defineMessages({
  VideoFormDescription: {
    id: 'Specify a youtube video or playlist url',
    defaultMessage: 'Specify a youtube video or playlist url',
  },
  VideoBlockInputPlaceholder: {
    id: 'Type a valid URL',
    defaultMessage: 'Type a valid URL',
  },
  allowedURLs: {
    id: 'YouTube, Vimeo, Peertube ({instances}) instance or mp4 URL allowed',
    defaultMessage:
      'YouTube, Vimeo, Peertube ({instances}) instance or mp4 URL allowed',
  },
});

const Edit = (props) => {
  const { data, block, onChangeBlock, selected } = props;
  const intl = useIntl();
  const [url, setUrl] = useState('');

  const onChangeUrl = ({ target }) => {
    setUrl(target.value);
  };

  const onSubmitUrl = useCallback(() => {
    onChangeBlock(block, {
      ...data,
      url: url,
    });
  }, [onChangeBlock, block, data, url]);

  const resetSubmitUrl = () => {
    setUrl('');
  };

  const onKeyDownVariantMenuForm = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
        onSubmitUrl();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        // TODO: Do something on ESC key
      }
    },
    [onSubmitUrl],
  );
  const peertubeInstances =
    config.blocks.blocksConfig.video.allowedPeertubeInstances;
  const placeholder = useMemo(
    () =>
      data.placeholder ||
      intl.formatMessage(messages.VideoBlockInputPlaceholder, {
        instances: peertubeInstances.join(', '),
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [intl, data],
  );

  return (
    <div
      className={cx(
        'block video align',
        {
          selected: selected,
          center: !Boolean(data.align),
        },
        data.align,
      )}
    >
      {data.url ? (
        <Body data={data} isEditMode={true} />
      ) : (
        <Message>
          <center>
            <img src={videoBlockSVG} alt="" />
            <p>
              {intl.formatMessage(messages.allowedURLs, {
                instances: peertubeInstances.join(', '),
              })}
            </p>
            <div className="toolbar-inner">
              <Input
                onKeyDown={onKeyDownVariantMenuForm}
                onChange={onChangeUrl}
                placeholder={placeholder}
                value={url}
                // Prevents propagation to the Dropzone and the opening
                // of the upload browser dialog
                onClick={(e) => e.stopPropagation()}
              />
              {url && (
                <Button.Group>
                  <Button
                    type="button"
                    basic
                    className="cancel"
                    onClick={(e) => {
                      e.stopPropagation();
                      setUrl('');
                    }}
                  >
                    <Icon name={clearSVG} size="30px" />
                  </Button>
                </Button.Group>
              )}
              <Button.Group>
                <Button
                  type="button"
                  basic
                  primary
                  onClick={(e) => {
                    e.stopPropagation();
                    onSubmitUrl();
                  }}
                >
                  <Icon name={aheadSVG} size="30px" />
                </Button>
              </Button.Group>
            </div>
          </center>
        </Message>
      )}
      <SidebarPortal selected={selected}>
        <VideoSidebar {...props} resetSubmitUrl={resetSubmitUrl} />
      </SidebarPortal>
    </div>
  );
};

Edit.propTypes = {
  selected: PropTypes.bool.isRequired,
  block: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  onChangeBlock: PropTypes.func.isRequired,
  onSelectBlock: PropTypes.func.isRequired,
  onDeleteBlock: PropTypes.func.isRequired,
  onFocusPreviousBlock: PropTypes.func.isRequired,
  onFocusNextBlock: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
};

export default withBlockExtensions(Edit);
