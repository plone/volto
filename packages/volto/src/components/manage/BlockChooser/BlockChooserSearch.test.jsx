import React from 'react';
import { render } from '@testing-library/react';
import BlockChooserSearch from './BlockChooserSearch';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();

const store = mockStore({
  intl: {
    locale: 'en',
    messages: {},
  },
});

describe('BlocksChooserSearch', () => {
  it('renders a BlockChooserSearch component', () => {
    const { container } = render(
      <Provider store={store}>
        <BlockChooserSearch />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
