import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import Layout from './Layout';

const mockStore = configureStore();

jest.mock('../Grid/Grid', () => jest.fn(() => <div />));
jest.mock('../Editbar/Editbar', () => jest.fn(() => <div />));
jest.mock('react-portal', () => ({
  Portal: jest.fn(() => <div id="Portal" />),
}));

global.__SERVER__ = true; // eslint-disable-line no-underscore-dangle

describe('Layout', () => {
  it('renders a layout component', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
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
        />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
