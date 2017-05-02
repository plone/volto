import React from 'react';
import renderer from 'react-test-renderer';
import Editbar from './Editbar';

describe('Editbar', () => {
  it('renders a editbar component', () => {
    const component = renderer.create(<Editbar insertTile={() => {}} />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
