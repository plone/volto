import React from 'react';
import renderer from 'react-test-renderer';
import UrlWidget from './UrlWidget';

describe('UrlWidget', () => {
  it('renders an empty URL view widget component', () => {
    const component = renderer.create(<UrlWidget />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders an URL view widget component', () => {
    const component = renderer.create(
      <UrlWidget className="metadata" value="http://foobar.com" />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders an URL view widget component with children', () => {
    const component = renderer.create(
      <UrlWidget className="metadata" value="http://foobar.com">
        {(child) => <strong>{child}</strong>}
      </UrlWidget>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
