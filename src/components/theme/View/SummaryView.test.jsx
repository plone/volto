import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import SummaryView from './SummaryView';

import config from '@plone/volto/registry';

config.settings.imageScales = {
  large: 768,
  preview: 400,
  mini: 200,
  thumb: 128,
  tile: 64,
  icon: 32,
  listing: 16,
};

const mockStore = configureStore();

describe('TabularView', () => {
  it('renders a summary view component', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <SummaryView
            content={{
              title: 'Hello World!',
              description: 'Hi',
              items: [
                {
                  '@id': 'http://localhost:3000/my-item',
                  '@type': 'News Item',
                  title: 'My item',
                  description: 'My item description',
                  url: '/item',
                  image: {
                    download: 'file:///preview.jpg',
                    scales: {
                      thumb: {
                        download: 'file:///preview.jpg',
                      },
                    },
                  },
                  image_caption: 'My image caption',
                  image_field: 'image',
                },
              ],
            }}
          />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
