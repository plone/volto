import React from 'react';
import renderer from 'react-test-renderer';
import View from './View';

test('renders a view image component', () => {
  const component = renderer.create(
    <View
      data={{}}
      properties={{
        image: {
          download: 'http://127.0.0.1:3000/image.png',
          width: 400,
          height: 400,
          scales: {
            preview: {
              download:
                'http://127.0.0.1:3000/image.png/@@images/image/image-400.png',
              width: 400,
              height: 400,
            },
          },
        },
      }}
    />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
