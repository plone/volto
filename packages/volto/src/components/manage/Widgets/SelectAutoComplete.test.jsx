import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { waitFor, render, screen } from '@testing-library/react';
import SelectAutoComplete from './SelectAutoComplete';

const mockStore = configureStore();

vi.mock('@plone/volto/helpers/Loadable/Loadable');
beforeAll(async () => {
  const { __setLoadables } = await import(
    '@plone/volto/helpers/Loadable/Loadable'
  );
  await __setLoadables();
});

test('renders a select widget component', async () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
    vocabularies: {
      'plone.app.vocabularies.Keywords': {
        items: [{ title: 'My item', value: 'myitem' }],
        itemsTotal: 1,
      },
    },
  });

  const props = {
    getVocabulary: () => {
      return Promise.resolve({
        items: [
          { token: 'foo', title: 'Foo' },
          { token: 'bar', title: 'Bar' },
          { token: 'fooBar', title: 'FooBar' },
        ],
      });
    },
    widgetOptions: {
      vocabulary: { '@id': 'plone.app.vocabularies.Keywords' },
    },
  };

  const { container } = render(
    <Provider store={store}>
      <SelectAutoComplete
        {...props}
        id="my-field"
        title="My field"
        fieldSet="default"
        onChange={() => {}}
        onBlur={() => {}}
        onClick={() => {}}
      />
    </Provider>,
  );

  await waitFor(() => screen.getByText('My field'));
  expect(container).toMatchSnapshot();
});
