import React from 'react';
import configureStore from 'redux-mock-store';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-intl-redux';
import { act, waitFor, render, screen } from '@testing-library/react';
import vocabularies from '@plone/volto/reducers/vocabularies/vocabularies';
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

const VOCAB = 'plone.app.vocabularies.Keywords';

function tokenTitleSuccess(token, title) {
  return {
    type: 'GET_VOCABULARY_TOKEN_TITLE_SUCCESS',
    vocabulary: VOCAB,
    tokens: [token],
    subrequest: 'widget-responsible-en',
    result: { items: [{ token, title }] },
  };
}

test('resolves the current value label from fresh vocabulary choices even when a stale token/title pair was cached first', async () => {
  // A real store (not a mock) so that dispatching keeps the same widget
  // instance mounted while its `choices` change — this is what reproduces the
  // stale vocabulary cache surviving across a client-side navigation.
  const intl = (state = { locale: 'en', messages: {} }) => state;
  const store = createStore(combineReducers({ intl, vocabularies }));

  // The vocabulary subrequest still holds a stale pair left by a previously
  // edited value; it does not contain the current value ("anna").
  store.dispatch(tokenTitleSuccess('max', 'Max Berger'));

  render(
    <Provider store={store}>
      <SelectAutoComplete
        widgetOptions={{ vocabulary: { '@id': VOCAB } }}
        id="responsible"
        title="Responsible"
        fieldSet="default"
        isMulti={false}
        value="anna"
        onChange={() => {}}
        onBlur={() => {}}
        onClick={() => {}}
      />
    </Provider>,
  );

  // With only the stale pair cached, the raw token is shown at first.
  await waitFor(() => screen.getByText('anna'));

  // A refresh of the vocabulary subrequest that still resolves the stale pair
  // makes the widget seed its local cache from those stale choices — this is
  // the state that used to lock the widget to the wrong label.
  act(() => {
    store.dispatch(tokenTitleSuccess('max', 'Max Berger'));
  });
  await waitFor(() => screen.getByText('anna'));

  // The choices for the current value finally arrive (same mounted instance).
  // The widget must pick up the fresh pair and render its title instead of
  // staying locked to the stale cache it seeded earlier.
  act(() => {
    store.dispatch(tokenTitleSuccess('anna', 'Anna Becker'));
  });

  await waitFor(() => screen.getByText('Anna Becker'));
  expect(screen.queryByText('anna')).not.toBeInTheDocument();
});
