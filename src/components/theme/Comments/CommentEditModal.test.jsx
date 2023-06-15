import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import CommentEditModal from './CommentEditModal';

const mockStore = configureStore();
let updateComment=jest.fn();
jest.mock('../../manage/Form/ModalForm', () =>
  jest.fn(() => <div id="modalform" />),
);

describe('CommentEditModal', () => {
  it('renders a comment edit modal component', () => {
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
    const component = renderer.create(
      <Provider store={store}>
        <CommentEditModal
          updateComment={updateComment}
          request={{loaded:true,
          loading:false}}
          open
          onOk={() => {}}
          onCancel={() => {}}
          id="someurl"
          text="Comment body"
        />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
