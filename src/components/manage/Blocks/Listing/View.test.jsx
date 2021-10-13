import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import View from './View';

jest.mock('./ListingBody', () => jest.fn(() => <div className="theblock" />));

test('renders a view image component for the listing block', () => {
  const component = renderer.create(
    <Router>
      <View
        data={{
          '@type': 'listing',
          query: [
            {
              i: 'review_state',
              o: 'plone.app.querystring.operation.selection.any',
              v: ['private'],
            },
          ],
        }}
        properties={{ is_folderish: true }}
        block="123u12u3"
      />
    </Router>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
