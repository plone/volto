import React from 'react';
import renderer from 'react-test-renderer';
import View from './View';

test('renders a view image component', () => {
  const component = renderer.create(
    <View
      data={{}}
      properties={{
        image: {
          download: 'image.png',
        },
      }}
    />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
