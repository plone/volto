import React from 'react';
import renderer from 'react-test-renderer';
import Footer from './Footer';

test('renders a footer component', () => {
  const component = renderer.create(
    <Footer />
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
