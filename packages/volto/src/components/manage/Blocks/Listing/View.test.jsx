import React from 'react';
import renderer from 'react-test-renderer';
import View from './View';

vi.mock('./ListingBody', () => ({
  default: () => <div className="theblock" />,
}));

test('renders a view image component for the listing block', () => {
  const component = renderer.create(
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
    />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
