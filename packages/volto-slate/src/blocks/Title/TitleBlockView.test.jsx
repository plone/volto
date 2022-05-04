import React from 'react';
import renderer from 'react-test-renderer';
import View from './TitleBlockView';

test('renders a view title component', () => {
  const component = renderer.create(
    <View
      properties={{ title: 'My Title' }}
      formFieldName="title"
      className="documentFirstHeading"
    />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});

test('renders a view description component', () => {
  const component = renderer.create(
    <View
      properties={{ description: 'My Description' }}
      formFieldName="description"
      className="documentDescription"
    />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
