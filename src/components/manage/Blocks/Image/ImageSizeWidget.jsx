import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Button } from 'semantic-ui-react';

const messages = defineMessages({
  small: {
    id: 'Left',
    defaultMessage: 'Left',
  },
  medium: {
    id: 'Right',
    defaultMessage: 'Right',
  },
  large: {
    id: 'Center',
    defaultMessage: 'Center',
  },
});

const ImageSizeWidget = ({ onChangeBlock, data, block }) => {
  /**
   * Image size handler
   * @method onImageSize
   * @param {string} size Size option
   * @returns {undefined}
   */
  function onImageSize(size) {
    onChangeBlock(block, {
      ...data,
      size,
    });
  }

  const intl = useIntl();

  return (
    <div>
      <Button.Group>
        <Button
          icon
          basic
          aria-label={intl.formatMessage(messages.small)}
          onClick={() => onImageSize('s')}
          active={data.size === 's'}
        >
          <div className="image-sizes-text">S</div>
        </Button>
      </Button.Group>
      <Button.Group>
        <Button
          icon
          basic
          aria-label={intl.formatMessage(messages.medium)}
          onClick={() => onImageSize('m')}
          active={data.size === 'm'}
        >
          <div className="image-sizes-text">M</div>
        </Button>
      </Button.Group>
      <Button.Group>
        <Button
          icon
          basic
          aria-label={intl.formatMessage(messages.large)}
          onClick={() => onImageSize('x')}
          active={data.size === 'x' || !data.size}
        >
          <div className="image-sizes-text">L</div>
        </Button>
      </Button.Group>
    </div>
  );
};

export default ImageSizeWidget;
