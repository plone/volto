import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { waitFor, render, screen } from '@testing-library/react';
import { __setLoadables } from '@plone/volto/helpers/Loadable/Loadable';

import Edit from './Edit';

const mockStore = configureStore();

vi.mock('@plone/volto/helpers/Loadable/Loadable');

beforeAll(async () => {
  await __setLoadables();
});
test('renders an edit html block component', async () => {
  const store = mockStore({
    content: {
      create: {},
      data: {},
    },
    intl: {
      locale: 'en',
      messages: {},
    },
  });

  const { container } = render(
    <Provider store={store}>
      <Edit
        data={{ html: '<h1></h1>' }}
        selected={false}
        block="1234"
        onChangeBlock={() => {}}
        onSelectBlock={() => {}}
        onDeleteBlock={() => {}}
        onFocusPreviousBlock={() => {}}
        onFocusNextBlock={() => {}}
        handleKeyDown={() => {}}
        index={1}
      />
    </Provider>,
  );

  await waitFor(() => screen.getByPlaceholderText('<p>Add some HTML here</p>'));

  expect(container).toMatchSnapshot();
});
