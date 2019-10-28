import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { render, wait } from '@testing-library/react';

import ContentsPropertiesModal from './ContentsPropertiesModal';

const mockStore = configureStore();

jest.mock('../Form/ModalForm', () => jest.fn(() => <div id="modalform" />));

describe('ContentsPropertiesModal', () => {
  it('renders a contents properties modal component', async () => {
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
        <ContentsPropertiesModal
          open
          onOk={() => {}}
          onCancel={() => {}}
          items={['/blog']}
        />
      </Provider>,
    );
    expect(container).toBeEmpty();
    await wait(() => {
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
