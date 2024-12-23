import React from 'react';
import renderer from 'react-test-renderer';
import HiddenWidget from './HiddenWidget';

describe('TextWidget', () => {
  it('renders an empty hidden view widget component', () => {
    const component = renderer.create(<HiddenWidget />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
