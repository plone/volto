import React from 'react';
import renderer from 'react-test-renderer';
import RichTextWidget from './RichTextWidget';

describe('RichTextWidget', () => {
  it('renders an empty rich text view widget component', () => {
    const component = renderer.create(<RichTextWidget />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a rich text view widget component', () => {
    const component = renderer.create(
      <RichTextWidget
        className="metadata"
        value={{ data: '<b>Foo bar</b>' }}
      />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a rich text view widget component with children', () => {
    const component = renderer.create(
      <RichTextWidget className="metadata" value={{ data: '<b>Foo bar</b>' }}>
        {(child) => <strong>{child}</strong>}
      </RichTextWidget>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
