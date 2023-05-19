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
          '/page-1/links-to-item': {
            loading: false,
            loaded: true,
            error: null,
            relations: {
              '@id':
                'http://localhost:3000/VirtualHostBase/http/localhost:3000/Plone/++api++/VirtualHostRoot/@relations?target=d4cf2f07ea844d5ea58b98a66ab30e3b',
              items: {
                isReferencing: [
                  {
                    source: {
                      '@id': 'http://localhost:3000/page-2-linking-to-page-1',
                      '@type': 'Document',
                      UID: '46550d2ad6564938a7cdbaabd6fd24a8',
                      description: '',
                      review_state: 'private',
                      title: 'page #2 linking to page #1',
                    },
                    target: {
                      '@id': 'http://localhost:3000/page-1',
                      '@type': 'Document',
                      UID: 'd4cf2f07ea844d5ea58b98a66ab30e3b',
                      description: '',
                      review_state: 'private',
                      title: 'page #1',
                    },
                  },
                ],
              },
              items_total: {
                isReferencing: 1,
              },
            },
            stats: null,
          },
        },
      },
      content: {
        subrequests: {
          '/page-1/links-to-item': {
            data: {
              UID: 'd4cf2f07ea844d5ea58b98a66ab30e3b',
              title: 'page #1',
            },
          },
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
