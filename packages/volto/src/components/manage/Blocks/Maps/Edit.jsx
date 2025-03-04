import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Message } from 'semantic-ui-react';
import { defineMessages, FormattedMessage, useIntl } from 'react-intl';
import cx from 'classnames';
import { withBlockExtensions } from '@plone/volto/helpers/Extensions';
import { compose } from 'redux';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import SidebarPortal from '@plone/volto/components/manage/Sidebar/SidebarPortal';
import MapsSidebar from '@plone/volto/components/manage/Blocks/Maps/MapsSidebar';
import clearSVG from '@plone/volto/icons/clear.svg';
import aheadSVG from '@plone/volto/icons/ahead.svg';
import mapsBlockSVG from '@plone/volto/components/manage/Blocks/Maps/block-maps.svg';

const messages = defineMessages({
  MapsBlockInputPlaceholder: {
    id: 'Enter map Embed Code',
    defaultMessage: 'Enter map Embed Code',
  },
  left: {
    id: 'Left',
    defaultMessage: 'Left',
  },
  right: {
    id: 'Right',
    defaultMessage: 'Right',
  },
  center: {
    id: 'Center',
    defaultMessage: 'Center',
  },
  full: {
    id: 'Full',
    defaultMessage: 'Full',
  },
  GoogleMapsEmbeddedBlock: {
    id: 'Google Maps Embedded Block',
    defaultMessage: 'Google Maps Embedded Block',
  },
});

const Edit = React.memo((props) => {
  const intl = useIntl();
  const [url, setUrl] = useState('');
  const [error, setError] = useState(null);

  const { onChangeBlock, data, block, selected } = props;
  const onChangeUrl = ({ target }) => {
    setUrl(target.value);
  };

  const onSubmitUrl = useCallback(() => {
    onChangeBlock(block, {
      ...data,
      url: getSrc(url),
    });
  }, [onChangeBlock, block, data, url]);

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

  const getSrc = (embed) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(embed, 'text/html');
    const iframe = doc.getElementsByTagName('iframe');
    if (iframe.length === 0) {
      setError(true);
      return '';
    }
    setError(false);
    return iframe[0].src;
  };

  const resetSubmitUrl = () => {
    setUrl('');
  };

  const placeholder = useMemo(
    () =>
      data.placeholder ||
      intl.formatMessage(messages.MapsBlockInputPlaceholder),
    [data, intl],
  );

  return (
    <div
      className={cx(
        'block maps align',
        {
          center: !Boolean(data.align),
        },
        data.align,
      )}
    >
      {data.url ? (
        <div
          className={cx('maps-inner', {
            'full-width': data.align === 'full',
          })}
        >
          <iframe
            title={intl.formatMessage(messages.GoogleMapsEmbeddedBlock)}
            src={data.url}
            className="google-map"
            frameBorder="0"
            allowFullScreen
          />
        </div>
      ) : (
        <Message>
          <center>
            <img src={mapsBlockSVG} alt="" />
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
            <div className="message-text">
              <FormattedMessage
                id="Please enter the Embed Code provided by Google Maps -> Share -> Embed map. It should contain the <iframe> code on it."
                defaultMessage="Please enter the Embed Code provided by Google Maps -> Share -> Embed map. It should contain the <iframe> code on it."
              />
              {error && (
                <div style={{ color: 'red' }}>
                  <FormattedMessage
                    id="Embed code error, please follow the instructions and try again."
                    defaultMessage="Embed code error, please follow the instructions and try again."
                  />
                </div>
              )}
            </div>
          </center>
        </Message>
      )}
      {!selected && <div className="map-overlay" />}
      <SidebarPortal selected={selected}>
        <MapsSidebar {...props} resetSubmitUrl={resetSubmitUrl} />
      </SidebarPortal>
    </div>
  );
});

Edit.propTypes = {
  selected: PropTypes.bool.isRequired,
  block: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  pathname: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
  onSelectBlock: PropTypes.func.isRequired,
  onDeleteBlock: PropTypes.func.isRequired,
  onFocusPreviousBlock: PropTypes.func.isRequired,
  onFocusNextBlock: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
};
export default compose(withBlockExtensions)(Edit);
