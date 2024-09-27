import React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter, Route } from 'react-router-dom';

import ContentTypes from './ContentTypes';

const mockStore = configureStore();

jest.mock('@plone/volto/components/manage/Toolbar');

jest.mock('../Form/Form', () => jest.fn(() => <div id="form" />));

describe('ContentTypes', () => {
  it('renders dexterity content-types controlpanel component', () => {
    const store = mockStore({
      controlpanels: {
        controlpanel: {
          '@id': 'http://localhost:8080/Plone/@controlpanels/dexterity-types',
          data: {},
          group: 'Content',
          items: [
            {
              '@id':
                'http://localhost:8080/Plone/@controlpanels/dexterity-types/Document',
              '@type': 'Document',
              count: 0,
              description: '',
              id: 'Document',
              meta_type: 'Dexterity FTI',
              title: 'Page',
            },
            {
              '@id':
                'http://localhost:8080/Plone/@controlpanels/dexterity-types/Folder',
              '@type': 'Folder',
              count: 0,
              description: '',
              id: 'Folder',
              meta_type: 'Dexterity FTI',
              title: 'Folder',
            },
          ],
          schema: {},
          title: 'Dexterity Content Types',
        },
        post: {
          loaded: false,
          loading: false,
        },
        delete: {
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
        <MemoryRouter initialEntries={['/controlpanel/dexterity-types']}>
          <Route path={'/controlpanel/:id'} component={ContentTypes} />
          <div id="toolbar"></div>
        </MemoryRouter>
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});
