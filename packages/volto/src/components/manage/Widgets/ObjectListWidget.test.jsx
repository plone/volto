import React from 'react';
import { Provider } from 'react-intl-redux';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import ObjectListWidget from './ObjectListWidget';

vi.mock('@plone/volto/helpers/Loadable/Loadable', async () => {
  return await import(
    '@plone/volto/helpers/Loadable/__mocks__/Loadable.vitest.jsx'
  );
});
vi.mock('@plone/volto/components/manage/Form', async () => {
  return await import(
    '@plone/volto/components/manage/Form/__mocks__/index.vitest.tsx'
  );
});

beforeAll(async () => {
  const { __setLoadables } = await import(
    '@plone/volto/helpers/Loadable/Loadable'
  );
  await __setLoadables();
});

let mockSerial = 0;
const mockStore = configureStore();

vi.mock('uuid', () => {
  return {
    v4: vi.fn().mockImplementation(() => `id-${mockSerial++}`),
  };
});

const LinkSchema = {
  title: 'Link',
  fieldsets: [
    {
      id: 'internal',
      title: 'Internal',
      fields: ['internal_link'],
    },
    {
      id: 'external',
      title: 'External',
      fields: ['external_link'],
    },
    {
      id: 'email',
      title: 'Email',
      fields: ['email_address', 'email_subject'],
    },
  ],
  properties: {
    internal_link: {
      title: 'Internal link',
    },
    external_link: {
      title:
        'External URL (can be relative within this site or absolute if it starts with http:// or https://)',
    },
    email_address: {
      title: 'Email address',
    },
    email_subject: {
      title: 'Email subject (optional)',
    },
  },
  required: [],
};

test('renders an object list widget component', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });
  const { asFragment } = render(
    <Provider store={store}>
      <ObjectListWidget
        id="my-widget"
        schema={LinkSchema}
        title="My Widget"
        onChange={() => {}}
        error={[]}
        value={[
          {
            '@id': 'a2653d85-602e-4ed1-8a18-a33bdc2f6e36',
            external_link: 'https://dgg.gg',
          },
          {
            '@id': 'a2653d85-602e-4ed1-8a18-a33bdc2f6e37',
            external_link: 'https://wikipedia.org',
          },
        ]}
        required={true}
        fieldSet="my-field-set"
        description="My description"
        onDelete={() => {}}
        onEdit={() => {}}
      />
    </Provider>,
  );
  expect(asFragment()).toMatchSnapshot();
});
