import React from 'react';
import renderer from 'react-test-renderer';
import RelationWidget from './RelationWidget';

describe('RelationWidget', () => {
  it('renders an empty relation view widget component', () => {
    const component = renderer.create(<RelationWidget />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a relation view widget component', () => {
    const component = renderer.create(
      <RelationWidget className="metadata" value={{ title: 'Foo Bar' }} />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a full relation view widget component', () => {
    const component = renderer.create(
      <RelationWidget
        className="metadata"
        value={{ title: 'Foo Bar', token: 'foobar', '@id': '/a-page' }}
      />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a full relation view widget component with children', () => {
    const component = renderer.create(
      <RelationWidget
        className="metadata"
        value={{
          title: 'Foo Bar',
          token: 'foobar',
          '@id': '/a-page',
          '@type': 'Document',
          review_state: 'private',
          description: 'Bar Foo',
        }}
      >
        {(child) => <strong>{child}</strong>}
      </RelationWidget>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
