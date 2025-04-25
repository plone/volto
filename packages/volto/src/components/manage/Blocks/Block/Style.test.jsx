import React from 'react';
import renderer from 'react-test-renderer';

import Style from './Style';

test('renders a Style wrapper component', () => {
  const component = renderer.create(
    <Style
      data={{ url: 'image', alt: 'alternate text', align: 'full', size: 'l' }}
      block="1234"
      pathname="/news"
      onChangeBlock={() => {}}
      openObjectBrowser={() => {}}
      resetSubmitUrl={() => {}}
    >
      Hello world
    </Style>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
