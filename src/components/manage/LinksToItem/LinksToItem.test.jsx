import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-intl-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import LinksToItem from './LinksToItem';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('react-portal', () => ({
  Portal: jest.fn(() => <div id="Portal" />),
}));
jest.mock('../Toolbar/More', () => jest.fn(() => <div className="More" />));

describe('LinksToItem', () => {
  it('renders links to item view', () => {
    const store = mockStore({
      relations: {
        subrequests: {
          '/page-1': {
            relations: {
              isReferencing: {
                items: [
                  {
                    source: {
                      '@id': 'http://localhost:3000/page-2-linking-to-page-1',
                      '@type': 'Document',
                      UID: 'SOMEUID008',
                      description: '',
                      review_state: 'private',
                      title: 'page #2 linking to page #1',
                      type_title: 'Document',
                    },
                    target: {
                      '@id': 'http://localhost:3000/page-1',
                      '@type': 'Document',
                      UID: 'SOMEUID007',
                      description: '',
                      review_state: 'private',
                      title: 'page #1',
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
        <LinksToItem location={{ pathname: '/page-1/links-to-item' }} />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
