import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import Contents from './Contents';

const mockStore = configureStore();

jest.mock('../../theme/Pagination/Pagination', () =>
  jest.fn(() => <div className="Pagination" />),
);

jest.mock('moment', () =>
  jest.fn(() => ({
    format: jest.fn(() => 'Sunday, April 23, 2017 3:38 AM'),
    fromNow: jest.fn(() => 'a few seconds ago'),
  })),
);

describe('Contents', () => {
  it('renders a contents component', () => {
    const store = mockStore({
      search: {
        items: [
          {
            '@id': '/blog',
            '@type': 'Folder',
            title: 'Blog',
            descripton: 'My Blog',
            ModificationDate: '2017-04-19T22:48:56+02:00',
            EffectiveDate: '2017-04-19T22:48:56+02:00',
            review_state: 'private',
          },
        ],
        total: 1,
      },
      clipboard: {
        action: 'copy',
        source: ['/blog'],
        request: {
          loading: false,
          loaded: false,
        },
      },
      content: {
        delete: {
          loading: false,
          loaded: false,
        },
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <Contents location={{ pathname: '/blog' }} />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
