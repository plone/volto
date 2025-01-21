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

vi.mock('@plone/volto/components/manage/Form');
vi.mock('@plone/volto/helpers/Loadable/Loadable');
beforeAll(async () => {
  const loadable = await import('@plone/volto/helpers/Loadable/Loadable');
  loadable.__setLoadables();
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
