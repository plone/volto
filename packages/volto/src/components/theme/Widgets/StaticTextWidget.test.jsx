import React from 'react';
import renderer from 'react-test-renderer';
import StaticTextWidget from './StaticTextWidget';

describe('StaticTextWidget', () => {
  it('renders an empty static text view widget component', () => {
    const component = renderer.create(<StaticTextWidget />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a static text view widget component', () => {
    const component = renderer.create(
      <StaticTextWidget
        className="metadata"
        value={{ data: '<b>Foo bar</b>' }}
      />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a static text view widget component with children', () => {
    const component = renderer.create(
      <StaticTextWidget className="metadata" value={{ data: '<b>Foo bar</b>' }}>
        {(child) => <strong>{child}</strong>}
      </StaticTextWidget>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
