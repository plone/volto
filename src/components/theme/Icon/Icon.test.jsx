import React from 'react';
import renderer from 'react-test-renderer';
import Icon from './Icon';

test('Renders icon', () => {
  const component = renderer.create(
    <Icon
      size="14px"
      color="#007bc1"
      className="my-icon"
      title="My Icon"
      name={{
        attributes: {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 36 36',
        },
        content: 'Accessibility',
      }}
    />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
