import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { render, wait } from '@testing-library/react';

import CommentEditModal from './CommentEditModal';

const mockStore = configureStore();

jest.mock('../../manage/Form/ModalForm', () =>
  jest.fn(() => <div id="modalform" />),
);

describe('CommentEditModal', () => {
  it('renders a comment edit modal component', async () => {
    const store = mockStore({
      comments: {
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
        <CommentEditModal
          open
          onOk={() => {}}
          onCancel={() => {}}
          id="someurl"
          text="Comment body"
        />
      </Provider>,
    );
    expect(container).toBeEmpty();
    await wait(() => {
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
