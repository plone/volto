import React from 'react';
import renderer from 'react-test-renderer';
import Layout from './Layout';

jest.mock('../Grid/Grid', () => jest.fn(() => <div />));
jest.mock('../Editbar/Editbar', () => jest.fn(() => <div />));

global.__SERVER__ = true; // eslint-disable-line no-underscore-dangle

describe('Layout', () => {
  it('renders a layout component', () => {
    const component = renderer.create(
      <Layout
        layout={{
          rows: [
            {
              columns: [
                {
                  width: 16,
                  tiles: [
                    {
                      content: '<p>Column <b>one</b></p>',
                      url: './@@plone.app.standardtiles.html/1',
                      type: 'title',
                    },
                  ],
                },
              ],
            },
          ],
        }}
      />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
