import React from 'react';
import renderer from 'react-test-renderer';
import DatetimeWidget from './DatetimeWidget';

describe('DatetimeWidget', () => {
  it('renders an empty date view widget component', () => {
    const component = renderer.create(<DatetimeWidget />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a date view widget component', () => {
    const component = renderer.create(
      <DatetimeWidget className="metadata" value="2020-08-04T09:00:00" />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a date view widget component with children', () => {
    const component = renderer.create(
      <DatetimeWidget className="metadata" value="2020-08-04T09:00:00">
        {(child) => <strong>{child}</strong>}
      </DatetimeWidget>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
