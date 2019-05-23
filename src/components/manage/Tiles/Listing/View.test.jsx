import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import { settings } from '~/config';

import { View } from './View';

const props = {
  data: {
    selectedItem: '/test',
  },
  getContent: () => {},
  resetContent: () => {},
  tile: 'test',
  contentSubrequests: {
    test: {
      data: {
        '@id': `${settings.apiUrl}/test`,
        image: {
          scales: {
            mini: {
              download: `${settings.apiUrl}/test/image.jpeg`,
            },
          },
        },
        title: 'Test',
        description: 'Summary',
      },
    },
  },
};

test('renders a summary box view component', () => {
  const component = renderer.create(
    <MemoryRouter>
      <View {...props} />
    </MemoryRouter>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
