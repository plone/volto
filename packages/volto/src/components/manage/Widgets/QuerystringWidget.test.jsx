import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { waitFor } from '@testing-library/react';

import QuerystringWidget, { objectSchema } from './QuerystringWidget';

const mockStore = configureStore();

test('renders an querystring widget component', async () => {
  const store = mockStore({
    querystring: { indexes: {} },
    intl: {
      locale: 'en',
      messages: {},
    },
  });
  const component = renderer.create(
    <Provider store={store}>
      <QuerystringWidget id="my-field" title="My field" onChange={() => {}} />
    </Provider>,
  );
  await waitFor(() => {});
  expect(component.toJSON()).toMatchSnapshot();
});

describe('objectSchema', () => {
  const mockIntl = { formatMessage: ({ defaultMessage }) => defaultMessage };

  it('does not include depth in the default fieldset', () => {
    const schema = objectSchema({ intl: mockIntl });
    const fields = schema.fieldsets[0].fields;

    expect(fields).not.toContain('depth');
    expect(fields).toEqual([
      'query',
      'sort_on',
      'sort_order_boolean',
      'limit',
      'b_size',
    ]);
  });

  it('does not include depth in the schema properties', () => {
    const schema = objectSchema({ intl: mockIntl });

    expect(schema.properties).not.toHaveProperty('depth');
  });

  it('does not include depth even when value contains a path criterion', () => {
    const value = {
      query: [
        {
          i: 'path',
          o: 'plone.app.querystring.operation.string.path',
          v: '/folder',
        },
      ],
    };
    const schema = objectSchema({ intl: mockIntl, value });
    const fields = schema.fieldsets[0].fields;

    expect(fields).not.toContain('depth');
    expect(schema.properties).not.toHaveProperty('depth');
  });
});

test('can take a schemaEnhancer', async () => {
  const store = mockStore({
    querystring: { indexes: {} },
    intl: {
      locale: 'en',
      messages: {},
    },
  });
  const component = renderer.create(
    <Provider store={store}>
      <QuerystringWidget
        id="my-field"
        title="My field"
        onChange={() => {}}
        schemaEnhancer={({ schema }) => ({
          ...schema,
          fieldsets: [
            {
              ...schema.fieldsets[0],
              fields: ['query', 'sort_on', 'sort_order_boolean'],
            },
          ],
        })}
      />
    </Provider>,
  );
  await waitFor(() => {
    expect(component.toJSON()?.children).toHaveLength(3);
  });
  expect(component.toJSON()).toMatchSnapshot();
});
