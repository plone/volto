import { expect } from 'chai';
import React from 'react';
import { renderIntoDocument } from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import { wrap } from 'react-stateless-wrapper';

import { Row as RowFunction } from 'components';

const Row = wrap(RowFunction);

describe('Row component', () => {
  it('should render a row', () => {
    const renderer = renderIntoDocument(
      <Row tiles={[]} />
    );
    const row = ReactDOM.findDOMNode(renderer);

    expect(row.className).to.contain('row');
  });
});
