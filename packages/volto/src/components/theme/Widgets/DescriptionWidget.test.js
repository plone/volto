import React from 'react';
import renderer from 'react-test-renderer';
import DescriptionWidget from './DescriptionWidget';

describe('DescriptionWidget', () => {
  it('renders an empty description view widget component', () => {
    const component = renderer.create(<DescriptionWidget />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a description view widget component', () => {
    const component = renderer.create(
      <DescriptionWidget className="metadata" value="Foo bar" />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a description view widget component with children', () => {
    const component = renderer.create(
      <DescriptionWidget className="metadata" value="Foo bar">
        {(child) => <strong>{child}</strong>}
      </DescriptionWidget>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
