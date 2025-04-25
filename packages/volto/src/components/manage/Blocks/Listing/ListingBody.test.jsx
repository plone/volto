import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';

import ListingBody from './ListingBody';

const mockStore = configureStore();

test('renders a ListingBody component', () => {
  const store = mockStore({
    querystringsearch: {
      subrequests: {
        '2110a241-1389-4cda-8811-77031a540efa': {
          items: [
            {
              '@id': 'http://localhost:8080/Plone/the-page',
              '@type': 'Document',
              description: '',
              review_state: 'private',
              title: 'the page',
            },
            {
              '@id': 'http://localhost:8080/Plone/front-page',
              '@type': 'Document',
              description:
                'Congratulations! You have successfully installed Plone.',
              review_state: 'published',
              title: 'Welcome to Plone',
            },
          ],
        },
      },
    },
    content: {
      data: {
        is_folderish: true,
        blocks: {
          '839ee00b-013b-4f4a-9b10-8867938fdac3': {
            '@type': 'listing',
            block: '839ee00b-013b-4f4a-9b10-8867938fdac3',
            headlineTag: 'h2',
            query: [],
            querystring: {
              b_size: '2',
              query: [
                {
                  i: 'path',
                  o: 'plone.app.querystring.operation.string.absolutePath',
                  v: '/',
                },
              ],
              sort_order: 'ascending',
            },
            variation: 'default',
          },
        },
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
        <ListingBody
          id="dcdf1f42-645d-48f6-9531-357bdc2e1881"
          data={{
            '@type': 'listing',
            query: [
              {
                i: 'review_state',
                o: 'plone.app.querystring.operation.selection.any',
                v: ['private'],
              },
            ],
          }}
          properties={{ is_folderish: true }}
          block="1234"
          onChangeBlock={() => {}}
          path="/"
          variation={{}}
        />
      </MemoryRouter>
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
