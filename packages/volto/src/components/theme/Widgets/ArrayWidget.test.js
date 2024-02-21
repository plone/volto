import React from 'react';
import renderer from 'react-test-renderer';
import ArrayWidget from './ArrayWidget';

describe('ArrayWidget', () => {
  it('renders an empty array view widget component', () => {
    const component = renderer.create(<ArrayWidget />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a simple array view widget component', () => {
    const component = renderer.create(
      <ArrayWidget className="metadata" value={['foo', 'bar']} />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a vocabulary array view widget component', () => {
    const component = renderer.create(
      <ArrayWidget
        className="metadata"
        value={[{ title: 'Foo' }, { title: 'Bar' }]}
      />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a full vocabulary array view widget component', () => {
    const component = renderer.create(
      <ArrayWidget
        className="metadata"
        value={[
          { title: 'Foo', token: 'foo' },
          { title: 'Bar', token: 'bar' },
        ]}
      />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a full vocabulary array view widget component with children', () => {
    const component = renderer.create(
      <ArrayWidget
        className="metadata"
        value={[
          { title: 'Foo', token: 'foo' },
          { title: 'Bar', token: 'bar' },
        ]}
      >
        {(child) => <strong>{child}</strong>}
      </ArrayWidget>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
