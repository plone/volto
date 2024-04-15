import React from 'react';
import renderer from 'react-test-renderer';

import ImageWidget from './ImageWidget';

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn().mockReturnValue({
    pathname: '/route',
    search: '',
    hash: '',
    state: null,
    key: '5nvxpbdafa',
    location: '/route',
  }),
}));

test('renders an image sizes widget component', () => {
  const component = renderer.create(
    <ImageWidget id="image" title="Image" fieldSet="default" data={''} />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
