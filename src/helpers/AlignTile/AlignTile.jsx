import React from 'react';
import { Icon } from '@plone/volto/components';
import { Button } from 'semantic-ui-react';
import imageLeftSVG from '@plone/volto/icons/image-left.svg';
import imageRightSVG from '@plone/volto/icons/image-right.svg';
import imageFitSVG from '@plone/volto/icons/image-fit.svg';
import imageFullSVG from '@plone/volto/icons/image-full.svg';

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
    <div>
      <Button.Group>
        <Button
          icon
          basic
          aria-label="Left"
          onClick={() => onAlignTile('left')}
          active={data.align === 'left'}
        >
          <Icon name={imageLeftSVG} size="24px" />
        </Button>
      </Button.Group>
      <Button.Group>
        <Button
          icon
          basic
          aria-label="Right"
          onClick={() => onAlignTile('right')}
          active={data.align === 'right'}
        >
          <Icon name={imageRightSVG} size="24px" />
        </Button>
      </Button.Group>
      <Button.Group>
        <Button
          icon
          basic
          aria-label="Center"
          onClick={() => onAlignTile('center')}
          active={data.align === 'center' || !data.align}
        >
          <Icon name={imageFitSVG} size="24px" />
        </Button>
      </Button.Group>
      <Button.Group>
        <Button
          icon
          basic
          aria-label="Full"
          onClick={() => onAlignTile('full')}
          active={data.align === 'full'}
        >
          <Icon name={imageFullSVG} size="24px" />
        </Button>
      </Button.Group>
    </div>
  );
};

export default AlignTile;
