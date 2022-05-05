import React from 'react';
import renderer from 'react-test-renderer';
import DateWidget from './DateWidget';

describe('DateWidget', () => {
  it('renders an empty date view widget component', () => {
    const component = renderer.create(<DateWidget />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a date view widget component', () => {
    const component = renderer.create(
      <DateWidget className="metadata" value="2020-08-18" />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a date view widget component with children', () => {
    const component = renderer.create(
      <DateWidget className="metadata" value="2020-08-18">
        {(child) => <strong>{child}</strong>}
      </DateWidget>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
