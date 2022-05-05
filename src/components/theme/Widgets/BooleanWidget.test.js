import React from 'react';
import renderer from 'react-test-renderer';
import BooleanWidget from './BooleanWidget';

describe('BooleanWidget', () => {
  it('renders an empty boolean view widget component', () => {
    const component = renderer.create(<BooleanWidget />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a boolean true view widget component', () => {
    const component = renderer.create(
      <BooleanWidget className="metadata" value={true} />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a boolean false view widget component', () => {
    const component = renderer.create(
      <BooleanWidget className="metadata" value={false} />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a boolean true view widget component with children', () => {
    const component = renderer.create(
      <BooleanWidget className="metadata" value={true}>
        {(child) => <strong>{child}</strong>}
      </BooleanWidget>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a boolean false view widget component with children', () => {
    const component = renderer.create(
      <BooleanWidget className="metadata" value={false}>
        {(child) => <strong>{child}</strong>}
      </BooleanWidget>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
