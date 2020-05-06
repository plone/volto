import React from 'react';
import renderer from 'react-test-renderer';
import UrlWidget from './UrlWidget';

test('renders an url widget component', () => {
  const component = renderer.create(
    <UrlWidget
      id="test-url"
      title="My Url"
      onChange={() => {}}
      onBlur={() => {}}
      onClick={() => {}}
    />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
