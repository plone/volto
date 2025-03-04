import React from 'react';
import renderer from 'react-test-renderer';
import { Cell } from './Cell';

global.__SERVER__ = true; // eslint-disable-line no-underscore-dangle

jest.mock('@plone/volto/helpers/Loadable/Loadable');
beforeAll(
  async () =>
    await require('@plone/volto/helpers/Loadable/Loadable').__setLoadables(),
);

test('renders a cell component', () => {
  const component = renderer.create(
    <Cell onChange={() => {}} onSelectCell={() => {}} />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
