import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import { waitFor, render, screen } from '@testing-library/react';

import Diff from './Diff';

const mockStore = configureStore();

jest.mock('react-portal', () => ({
  Portal: jest.fn(() => <div id="Portal" />),
}));

jest.mock('@plone/volto/helpers/Loadable/Loadable');
beforeAll(
  async () =>
    await require('@plone/volto/helpers/Loadable/Loadable').__setLoadables(),
);

describe('Diff', () => {
  it('renders a diff component', async () => {
    const store = mockStore({
      history: {
        entries: [
          {
            time: '2017-04-19T14:09:36+02:00',
            version: 1,
            actor: { fullname: 'Web Admin' },
          },
          {
            time: '2017-04-19T14:09:35+02:00',
            version: 0,
            actor: { fullname: 'Web Admin' },
          },
        ],
      },
      content: {
        data: {
          title: 'Blog',
          '@type': 'Folder',
        },
      },
      schema: {
        schema: {
          fieldsets: [
            {
              fields: ['title'],
            },
          ],
          properties: {
            title: {
              title: 'Title',
              type: 'string',
            },
          },
        },
      },
      diff: {
        data: [
          {
            title: 'My old title',
          },
          {
            title: 'My new title,',
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
        <MemoryRouter initialEntries={['/blog?one=0&two=1']}>
          <Diff />
        </MemoryRouter>
      </Provider>,
    );
    await waitFor(() => screen.getByTestId('DiffField'));
    expect(container).toMatchSnapshot();
  });
});
