import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';
import { Button, Input, Message } from 'semantic-ui-react';
import cx from 'classnames';
import { isEqual } from 'lodash';
import { Icon, SidebarPortal, VideoSidebar } from '@plone/volto/components';
import clearSVG from '@plone/volto/icons/clear.svg';
import aheadSVG from '@plone/volto/icons/ahead.svg';
import videoBlockSVG from '@plone/volto/components/manage/Blocks/Video/block-video.svg';
import Body from '@plone/volto/components/manage/Blocks/Video/Body';
import { withBlockExtensions } from '@plone/volto/helpers';
import { compose } from 'redux';

const messages = defineMessages({
  VideoFormDescription: {
    id: 'Specify a youtube video or playlist url',
    defaultMessage: 'Specify a youtube video or playlist url',
  },
  VideoBlockInputPlaceholder: {
    id: 'Type a Video (YouTube, Vimeo or mp4) URL',
    defaultMessage: 'Type a Video (YouTube, Vimeo or mp4) URL',
  },
});

const Edit = (props) => {
  const { data, selected, block, onChangeBlock, intl } = props;
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (data.url) {
      setUrl(data.url);
    }
  }, [data.url]);

  const onChangeUrl = useCallback((e) => {
    setUrl(e.target.value);
  }, []);

  const onSubmitUrl = useCallback(() => {
    onChangeBlock(block, {
      ...data,
      url: url,
    });
  }, [url, onChangeBlock, block, data]);

  const resetSubmitUrl = useCallback(() => {
    setUrl('');
  }, []);

  const onKeyDownVariantMenuForm = useCallback((e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      onSubmitUrl();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      // TODO: Do something on ESC key
    }
  }, [onSubmitUrl]);

  const placeholder = data.placeholder || intl.formatMessage(messages.VideoBlockInputPlaceholder);

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
            <div className="toolbar-inner">
              <Input
                onKeyDown={onKeyDownVariantMenuForm}
                onChange={onChangeUrl}
                placeholder={placeholder}
                value={url}
                onClick={(e) => e.stopPropagation()}
              />
              {url && (
                <Button.Group>
                  <Button
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

const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.selected === nextProps.selected &&
    isEqual(prevProps.data, nextProps.data)
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

export default compose(injectIntl, withBlockExtensions)(React.memo(Edit, areEqual));
