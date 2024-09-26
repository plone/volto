import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter, Route } from 'react-router-dom';
import { render } from '@testing-library/react';

import ContentType from './ContentType';

const mockStore = configureStore();

jest.mock('@plone/volto/components/manage/Form');
jest.mock('@plone/volto/components/manage/Sidebar');
jest.mock('@plone/volto/components/manage/Toolbar');

describe('ContentType', () => {
  it('renders dexterity content-type component', () => {
    const store = mockStore({
      controlpanels: {
        controlpanel: {
          '@id':
            'http://localhost:8080/Plone/@controlpanels/dexterity-types/Document',
          title: 'Page',
          description: 'A document',
          data: {},
          schema: {},
        },
        update: {
          loaded: false,
          loading: false,
        },
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={['/controlpanel/dexterity-types/Document']}
        >
          <Route
            path={'/controlpanel/dexterity-types/:id'}
            component={ContentType}
          />
          <div id="toolbar"></div>
        </MemoryRouter>
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});
