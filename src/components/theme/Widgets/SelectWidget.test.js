import React from 'react';
import renderer from 'react-test-renderer';
import SelectWidget from './SelectWidget';

describe('SelectWidget', () => {
  it('renders an empty select view widget component', () => {
    const component = renderer.create(<SelectWidget />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a select view widget component', () => {
    const component = renderer.create(
      <SelectWidget className="metadata" value={{ title: 'Foo Bar' }} />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a full select view widget component', () => {
    const component = renderer.create(
      <SelectWidget
        className="metadata"
        value={{ title: 'Foo Bar', token: 'foobar' }}
      />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a full select view widget component with children', () => {
    const component = renderer.create(
      <SelectWidget
        className="metadata"
        value={{ title: 'Foo Bar', token: 'foobar' }}
      >
        {(child) => <strong>{child}</strong>}
      </SelectWidget>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
