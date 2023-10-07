import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-intl-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';

import LinksToItem from './LinksToItem';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('react-portal', () => ({
  Portal: jest.fn(() => <div id="Portal" />),
}));
jest.mock('../Toolbar/More', () => jest.fn(() => <div className="More" />));

describe('LinksToItem', () => {
  it('renders "links and references" view', () => {
    const store = mockStore({
      relations: {
        subrequests: {
          '/page-1': {
            data: {
              isReferencing: {
                items: [
                  {
                    source: {
                      '@id': 'http://localhost:3000/page-basil',
                      '@type': 'Document',
                      UID: 'SOMEUID008',
                      description: '',
                      review_state: 'published',
                      title: 'Basil',
                      type_title: 'Document',
                    },
                    target: {
                      '@id': 'http://localhost:3000/page-tomato',
                      '@type': 'Document',
                      UID: 'SOMEUID007',
                      description: '',
                      review_state: 'published',
                      title: 'Tomato',
                      type_title: 'Document',
                    },
                  },
                ],
                items_total: 1,
              },
              relatedItems: {
                items: [
                  {
                    source: {
                      '@id': 'http://localhost:3000/page-cucumber',
                      '@type': 'Document',
                      UID: 'SOMEUID008',
                      description: '',
                      review_state: 'published',
                      title: 'Cucumber',
                      type_title: 'Document',
                    },
                    target: {
                      '@id': 'http://localhost:3000/page-tomato',
                      '@type': 'Document',
                      UID: 'SOMEUID007',
                      description: '',
                      review_state: 'published',
                      title: 'Tomato',
                      type_title: 'Document',
                    },
                  },
                ],
                items_total: 1,
              },
            },
          },
        },
      },
      content: {
        data: {
          UID: 'SOMEUID007',
          title: 'page #1',
        },
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <LinksToItem location={{ pathname: '/page-1/links-to-item' }} />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
