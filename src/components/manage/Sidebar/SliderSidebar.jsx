import React, { useState } from 'react';
import { Segment, List, Grid } from 'semantic-ui-react';
import { Icon, TextWidget } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';
import TileModal from '@plone/volto/components/manage/Tiles/TileModal/TileModal';

import clearSVG from '@plone/volto/icons/clear.svg';
import { Button } from 'semantic-ui-react';

import addSVG from '@plone/volto/icons/add.svg';
import folderSVG from '@plone/volto/icons/folder.svg';
import imageFitSVG from '@plone/volto/icons/image-fit.svg';
import imageFullSVG from '@plone/volto/icons/image-full.svg';

import { v4 as uuid } from 'uuid';

const SliderSidebar = props => {
  function addNewCard(e) {
    e.stopPropagation();
    const newCardsState = [
      ...props.data.cards,
      {
        id: uuid(),
        url: '',
      },
    ];
    if (props.data.cards.length < 4) {
      props.onChangeTile(props.tile, {
        ...props.data,
        cards: newCardsState,
      });
    }
  }

  /**
   * Align tile handler
   * @method onAlignTile
   * @param {string} align Alignment option
   * @returns {undefined}
   */
  function onAlignTile(align) {
    props.onChangeTile(props.tile, {
      ...props.data,
      align,
    });
  }

  return (
    <Segment.Group raised>
      <header className="header pulled">
        <h2>Slider</h2>
        <button onClick={props.closeSidebar}>
          <Icon name={clearSVG} size="24px" color="#786Ec5D" />
        </button>
      </header>

      <Segment className="sidebar-metadata-container">
        <Button.Group>
          <Button
            icon
            basic
            onClick={() => onAlignTile('center')}
            active={props.data.align === 'center' || !props.data.align}
          >
            <Icon name={imageFitSVG} size="24px" />
          </Button>
        </Button.Group>
        <Button.Group>
          <Button
            icon
            basic
            onClick={() => onAlignTile('full')}
            active={props.data.align === 'full'}
          >
            <Icon name={imageFullSVG} size="24px" />
          </Button>
        </Button.Group>
        <Button.Group>
          <Button
            icon
            basic
            onClick={addNewCard}
            disabled={props.data.cards.length >= 4}
          >
            <Icon name={addSVG} size="24px" />
          </Button>
        </Button.Group>
      </Segment>
    </Segment.Group>
  );
};

export default SliderSidebar;
