import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { waitFor, render } from '@testing-library/react';

import ToolbarButton from './ToolbarButton';

const mockStore = configureStore();

describe('ToolbarButton', () => {
  it('renders a toolbar button', async () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const { asFragment } = render(
      <Provider store={store}>
        <ToolbarButton />
      </Provider>,
    );
    await waitFor(() => expect(asFragment()).toMatchSnapshot());
  });
});
