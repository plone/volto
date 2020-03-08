import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { render, wait } from '@testing-library/react';

import ContentsRenameModal from './ContentsRenameModal';

const mockStore = configureStore();

jest.mock('../Form/ModalForm', () => jest.fn(() => <div id="modalform" />));

describe('ContentsRenameModal', () => {
  it('renders a contents rename modal component', async () => {
    const store = mockStore({
      content: {
        update: {
          loading: false,
          loaded: true,
        },
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const { container } = render(
      <Provider store={store}>
        <ContentsRenameModal
          open
          onOk={() => {}}
          onCancel={() => {}}
          items={[
            {
              id: 'blog',
              title: 'Blog',
              url: '/blog',
            },
          ]}
        />
      </Provider>,
    );

    await wait(() => {
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
