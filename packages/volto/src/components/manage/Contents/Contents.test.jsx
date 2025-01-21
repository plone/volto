import React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import { __setLoadables } from '@plone/volto/helpers/Loadable/Loadable';

import { __test__ as Contents } from './Contents';

const mockStore = configureStore();

vi.mock('@plone/volto/helpers/Loadable/Loadable');
beforeAll(async () => {
  await __setLoadables();
});

vi.mock('../Toolbar/Toolbar', () => ({
  default: vi.fn(() => <div id="Portal" />),
}));

vi.mock('../../theme/Pagination/Pagination', () => ({
  default: vi.fn(() => <div className="Pagination" />),
}));
vi.mock('./ContentsUploadModal', () => ({
  default: vi.fn(() => <div className="UploadModal" />),
}));

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
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Contents location={{ pathname: '/blog' }} />
          <div id="toolbar"></div>
        </MemoryRouter>
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});
