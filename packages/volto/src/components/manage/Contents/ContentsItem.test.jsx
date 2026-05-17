import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';

import ContentsItem from './ContentsItem';

const mockStore = configureStore();

vi.mock('@plone/volto/helpers/Loadable/Loadable');

beforeAll(async () => {
  const { __setLoadables } = await import(
    '@plone/volto/helpers/Loadable/Loadable'
  );
  await __setLoadables();
});

describe('ContentsItem', () => {
  it('renders a contents item component', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <ContentsItem
            item={{
              '@id': '/blog',
              title: 'Blog',
              is_folderish: false,
              '@type': 'Document',
              Type: 'Pagina',
            }}
            selected={false}
            onClick={() => {}}
            indexes={[
              {
                id: 'title',
                type: 'string',
              },
            ]}
            onCut={() => {}}
            onCopy={() => {}}
            onDelete={() => {}}
            onMoveToTop={() => {}}
            onMoveToBottom={() => {}}
            order={1}
          />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
