import React from 'react';
import renderer from 'react-test-renderer';
import Header from './Header';

jest.mock('../Logo/Logo', () => jest.fn(() => <div />));
jest.mock('../SearchWidget/SearchWidget', () => jest.fn(() => <div />));
jest.mock('../Anontools/Anontools', () => jest.fn(() => <div />));

test('renders a header component', () => {
  const component = renderer.create(<Header pathname="/blog" />);
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
