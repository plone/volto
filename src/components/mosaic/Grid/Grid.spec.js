import { expect } from 'chai';
import React from 'react';
import { renderIntoDocument } from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import { wrap } from 'react-stateless-wrapper';

import { Grid as GridFunction } from 'components';

const Grid = wrap(GridFunction);

describe('Grid component', () => {
  it('should render a grid', () => {
    const renderer = renderIntoDocument(
      <Grid rows={[]} />
    );
    const grid = ReactDOM.findDOMNode(renderer);

    expect(grid.className).to.equal('grid');
  });
});
