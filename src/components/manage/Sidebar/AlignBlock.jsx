import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import { Icon } from '@plone/volto/components';
import { Button } from 'semantic-ui-react';
import imageLeftSVG from '@plone/volto/icons/image-left.svg';
import imageRightSVG from '@plone/volto/icons/image-right.svg';
import imageFitSVG from '@plone/volto/icons/image-fit.svg';
import imageFullSVG from '@plone/volto/icons/image-full.svg';

const messages = defineMessages({
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
});

const AlignBlock = ({ align, onChangeBlock, data, intl, block }) => {
  /**
   * Align block handler
   * @method onAlignBlock
   * @param {string} align Alignment option
   * @returns {undefined}
   */
  function onAlignBlock(align) {
    onChangeBlock(block, {
      ...data,
      align,
    });
  }

  return (
    <div>
      <Button.Group>
        <Button
          icon
          basic
          aria-label={intl.formatMessage(messages.left)}
          onClick={() => onAlignBlock('left')}
          active={data.align === 'left'}
        >
          <Icon name={imageLeftSVG} size="24px" />
        </Button>
      </Button.Group>
      <Button.Group>
        <Button
          icon
          basic
          aria-label={intl.formatMessage(messages.right)}
          onClick={() => onAlignBlock('right')}
          active={data.align === 'right'}
        >
          <Icon name={imageRightSVG} size="24px" />
        </Button>
      </Button.Group>
      <Button.Group>
        <Button
          icon
          basic
          aria-label={intl.formatMessage(messages.center)}
          onClick={() => onAlignBlock('center')}
          active={data.align === 'center' || !data.align}
        >
          <Icon name={imageFitSVG} size="24px" />
        </Button>
      </Button.Group>
      <Button.Group>
        <Button
          icon
          basic
          aria-label={intl.formatMessage(messages.full)}
          onClick={() => onAlignBlock('full')}
          active={data.align === 'full'}
        >
          <Icon name={imageFullSVG} size="24px" />
        </Button>
      </Button.Group>
    </div>
  );
};

export default injectIntl(AlignBlock);
