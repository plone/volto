import React from 'react';
import { Icon } from '../components';
import { Button } from 'semantic-ui-react';
import imageLeftSVG from '../icons/image-left.svg';
import imageRightSVG from '../icons/image-right.svg';
import imageFitSVG from '../icons/image-fit.svg';
import imageFullSVG from '../icons/image-full.svg';

const AlignTile = ({ align, onChangeTile, data, tile }) => {
  /**
   * Align tile handler
   * @method onAlignTile
   * @param {string} align Alignment option
   * @returns {undefined}
   */
  function onAlignTile(align) {
    onChangeTile(tile, {
      ...data,
      align,
    });
  }

  return (
    <>
      <Button.Group>
        <Button
          icon
          basic
          onClick={() => onAlignTile('left')}
          active={align === 'left'}
        >
          <Icon name={imageLeftSVG} size="24px" />
        </Button>
      </Button.Group>
      <Button.Group>
        <Button
          icon
          basic
          onClick={() => onAlignTile('right')}
          active={align === 'right'}
        >
          <Icon name={imageRightSVG} size="24px" />
        </Button>
      </Button.Group>
      <Button.Group>
        <Button
          icon
          basic
          onClick={() => onAlignTile('center')}
          active={align === 'center' || !align}
        >
          <Icon name={imageFitSVG} size="24px" />
        </Button>
      </Button.Group>
      <Button.Group>
        <Button
          icon
          basic
          onClick={() => onAlignTile('full')}
          active={align === 'full'}
        >
          <Icon name={imageFullSVG} size="24px" />
        </Button>
      </Button.Group>
      <div className="separator" />
    </>
  );
};

export default AlignTile;
