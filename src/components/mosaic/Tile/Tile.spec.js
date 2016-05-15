import { expect } from 'chai';
import React from 'react';
import { renderIntoDocument } from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import { wrap } from 'react-stateless-wrapper';

import { Tile as TileFunction } from 'components';

const Tile = wrap(TileFunction);

describe('Tile component', () => {
  it('should render a tile', () => {
    const renderer = renderIntoDocument(
      <Tile content="Content" width="4" />
    );
    const tile = ReactDOM.findDOMNode(renderer);

    expect(tile.textContent).to.equal('Content');
    expect(tile.className).to.contain('col-xs-4');
  });
});
