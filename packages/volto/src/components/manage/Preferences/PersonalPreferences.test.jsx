import React from 'react';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import PersonalPreferences from './PersonalPreferences';

const mockStore = configureStore();

jest.mock('@plone/volto/components/manage/Toolbar');

jest.mock('@plone/volto/components/manage/Form');
jest.mock('@plone/volto/helpers/Loadable/Loadable');
beforeAll(
  async () =>
    await require('@plone/volto/helpers/Loadable/Loadable').__setLoadables(),
);

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
