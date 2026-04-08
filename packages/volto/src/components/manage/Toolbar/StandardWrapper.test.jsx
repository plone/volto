import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';

import StandardWrapper from './StandardWrapper';

const mockStore = configureStore();

describe('Toolbar Personal Tools component', () => {
  it('renders an Toolbar Personal Tools component', () => {
    const store = mockStore({
      content: {
        data: {
          '@type': 'Folder',
          is_folderish: true,
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
          <StandardWrapper
            componentName="profile"
            loadComponent={() => {}}
            unloadComponent={() => {}}
            closeMenu={() => {}}
            hasActions
            theToolbar={{
              current: { getBoundingClientRect: () => ({ width: '320' }) },
            }}
          />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
