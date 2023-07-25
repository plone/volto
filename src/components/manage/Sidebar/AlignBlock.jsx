import { defineMessages, useIntl } from 'react-intl';
import { Icon } from '@plone/volto/components';
import { Button } from 'semantic-ui-react';
import imageLeftSVG from '@plone/volto/icons/image-left.svg';
import imageRightSVG from '@plone/volto/icons/image-right.svg';
import imageFitSVG from '@plone/volto/icons/image-fit.svg';
import imageWideSVG from '@plone/volto/icons/image-wide.svg';
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
  wide: {
    id: 'Wide',
    defaultMessage: 'Wide',
  },
  full: {
    id: 'Full',
    defaultMessage: 'Full',
  },
});

const AlignBlock = ({
  align,
  onChangeBlock,
  data,
  block,
  actions = ['left', 'right', 'center', 'full'],
}) => {
  const intl = useIntl();

  const ICON_MAP = {
    left: imageLeftSVG,
    right: imageRightSVG,
    center: imageFitSVG,
    wide: imageWideSVG,
    full: imageFullSVG,
  };

  function onAlignBlock(align) {
    onChangeBlock(block, {
      ...data,
      align,
    });
  }

  return (
    <div className="align-buttons">
      {actions.map((action) => (
        <Button.Group key={action}>
          <Button
            icon
            basic
            aria-label={intl.formatMessage(messages[action])}
            onClick={() => onAlignBlock(action)}
            active={
              (action === 'center' && !data.align) || data.align === action
            }
          >
            <Icon name={ICON_MAP[action]} size="24px" />
          </Button>
        </Button.Group>
      ))}
    </div>
  );
};

export default AlignBlock;
