import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { render, wait } from '@testing-library/react';

import ContentsTagsModal from './ContentsTagsModal';

const mockStore = configureStore();

jest.mock('../Form/ModalForm', () => jest.fn(() => <div id="modalform" />));

describe('ContentsTagsModal', () => {
  it('renders a contents tags modal component', async () => {
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
        <ContentsTagsModal
          open
          onOk={() => {}}
          onCancel={() => {}}
          items={[
            {
              subjects: [],
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
