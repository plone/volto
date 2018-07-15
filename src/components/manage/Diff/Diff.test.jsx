import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import Diff from './Diff';

const mockStore = configureStore();

jest.mock('react-portal', () => ({
  Portal: jest.fn(() => <div id="Portal" />),
}));
jest.mock('moment', () =>
  jest.fn(() => ({
    format: jest.fn(() => 'Sunday, April 23, 2017 3:38 AM'),
  })),
);

describe('Diff', () => {
  it('renders a diff component', () => {
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
    const component = renderer.create(
      <Provider store={store}>
        <Diff
          location={{ pathname: '/blog', query: { one: '0', two: '1 ' } }}
        />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
