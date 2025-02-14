import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';

import SummaryView from './SummaryView';

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
                  title: 'My item',
                  description: 'My item description',
                  url: '/item',
                  image: {
                    scales: {
                      thumb: {
                        download: 'file:///preview.jpg',
                      },
                    },
                  },
                  image_caption: 'My image caption',
                  '@type': 'News Item',
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
