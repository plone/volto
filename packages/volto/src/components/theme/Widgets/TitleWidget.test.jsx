import React from 'react';
import renderer from 'react-test-renderer';
import TitleWidget from './TitleWidget';

describe('TitleWidget', () => {
  it('renders an empty title view widget component', () => {
    const component = renderer.create(<TitleWidget />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a title view widget component', () => {
    const component = renderer.create(
      <TitleWidget className="metadata" value="Foo bar" />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a title view widget component with children', () => {
    const component = renderer.create(
      <TitleWidget className="metadata" value="Foo bar">
        {(child) => <strong>{child}</strong>}
      </TitleWidget>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
