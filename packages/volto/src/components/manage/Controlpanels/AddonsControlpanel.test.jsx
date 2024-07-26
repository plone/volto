import React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import AddonsControlpanel from './AddonsControlpanel';

const mockStore = configureStore();

jest.mock('../Toolbar/Toolbar', () => jest.fn(() => <div id="Portal" />));

describe('AddonsControlpanel', () => {
  it('renders an addon control component', () => {
    const store = mockStore({
      addons: {
        installedAddons: [
          {
            id: 'plone.app.whatever',
            title: 'Whatever',
            version: '1.0.0',
            description: 'Does stuff and junk…',
            uninstall_profile_id: 'plone.app.whatever:uninstall',
            upgrade_info: {
              available: true,
            },
          },
        ],
        availableAddons: [
          {
            id: 'plone.app.somethingelse',
            title: 'Something Else',
            version: '1.0.0',
            description: 'Does other things…',
            uninstall_profile_id: 'plone.app.somethingelse:uninstall',
            upgrade_info: {
              available: false,
            },
          },
        ],
        upgradableAddons: [
          {
            id: 'plone.app.whatever',
            title: 'Whatever',
            version: '1.0.0',
            description: 'Does stuff and junk…',
            uninstall_profile_id: 'plone.app.whatever:uninstall',
            upgrade_info: {
              available: true,
            },
          },
        ],
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const { container } = render(
      <Provider store={store}>
        <AddonsControlpanel location={{ pathname: '/blog' }} />
        <div id="toolbar"></div>
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});
