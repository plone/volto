import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';

import { __test__ as Contents } from './Contents';

const mockStore = configureStore();

jest.mock('react-portal', () => ({
  Portal: jest.fn(() => <div id="Portal" />),
}));
jest.mock('../../theme/Pagination/Pagination', () =>
  jest.fn(() => <div className="Pagination" />),
);
jest.mock('./ContentsUploadModal', () =>
  jest.fn(() => <div className="UploadModal" />),
);

jest.mock('moment', () =>
  jest.fn(() => ({
    format: jest.fn(() => 'Sunday, April 23, 2017 3:38 AM'),
    fromNow: jest.fn(() => 'a few seconds ago'),
  })),
);

describe('Contents', () => {
  it('renders a folder contents view component', () => {
    const store = mockStore({
      actions: {
        actions: {
          document_actions: [],
          object: [
            {
              icon: '',
              id: 'folderContents',
              title: 'Contents',
            },
          ],
        },
      },
      userSession: {
        token: '14134234123qwdaf',
      },
      search: {
        items: [
          {
            '@id': '/blog',
            '@type': 'Folder',
            title: 'Blog',
            descripton: 'My Blog',
            ModificationDate: '2017-04-19T22:48:56+02:00',
            EffectiveDate: '2017-04-19T22:48:56+02:00',
            review_state: 'private',
          },
        ],
        total: 1,
      },
      breadcrumbs: {
        items: [
          {
            url: '/blog',
            title: 'Blog',
          },
        ],
      },
      clipboard: {
        action: 'copy',
        source: ['/blog'],
        request: {
          loading: false,
          loaded: false,
        },
      },
      content: {
        delete: {
          loading: false,
          loaded: false,
        },
        update: {
          loading: false,
          loaded: false,
        },
        updatecolumns: {
          loading: false,
          loaded: false,
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
          <Contents location={{ pathname: '/blog' }} />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
