import React from 'react';
import renderer from 'react-test-renderer';
import TextWidget from './TextWidget';

describe('TextWidget', () => {
  it('renders an empty text view widget component', () => {
    const component = renderer.create(<TextWidget />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a text view widget component', () => {
    const component = renderer.create(
      <TextWidget className="metadata" value="Foo bar" />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a text view widget component with children', () => {
    const component = renderer.create(
      <TextWidget className="metadata" value="Foo bar">
        {(child) => <strong>{child}</strong>}
      </TextWidget>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
