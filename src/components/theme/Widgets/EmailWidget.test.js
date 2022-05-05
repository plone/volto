import React from 'react';
import renderer from 'react-test-renderer';
import EmailWidget from './EmailWidget';

describe('EmailWidget', () => {
  it('renders an empty email view widget component', () => {
    const component = renderer.create(<EmailWidget />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders an email view widget component', () => {
    const component = renderer.create(
      <EmailWidget className="metadata" value="foo@bar.com" />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders an email view widget component with children', () => {
    const component = renderer.create(
      <EmailWidget className="metadata" value="foo@bar.com">
        {(child) => <strong>{child}</strong>}
      </EmailWidget>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
