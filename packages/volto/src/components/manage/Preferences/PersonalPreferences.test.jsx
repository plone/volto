import React from 'react';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import PersonalPreferences from './PersonalPreferences';

const mockStore = configureStore();

vi.mock('../Toolbar/Toolbar', () => ({
  default: vi.fn(() => <div id="Portal" />),
}));

vi.mock('@plone/volto/components/manage/Form', async () => {
  return await import(
    '@plone/volto/components/manage/Form/__mocks__/index.vitest.tsx'
  );
});
vi.mock('@plone/volto/helpers/Loadable/Loadable', async () => {
  return await import(
    '@plone/volto/helpers/Loadable/__mocks__/Loadable.vitest.jsx'
  );
});

beforeAll(async () => {
  const { __setLoadables } = await import(
    '@plone/volto/helpers/Loadable/Loadable'
  );
  await __setLoadables();
});

describe('PersonalPreferences', () => {
  it('renders a personal preferences component', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
      vocabularies: {
        'plone.app.vocabularies.Keywords': {
          items: [{ title: 'My item', value: 'myitem' }],
          itemsTotal: 1,
        },
      },
      content: {
        data: {},
        create: {
          loading: false,
          loaded: true,
        },
      },
    });
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <PersonalPreferences
            location={{ pathname: '/blog' }}
            closeMenu={() => {}}
          />
        </MemoryRouter>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
