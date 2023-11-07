import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import ContentsRenameModal from './ContentsRenameModal';

const mockStore = configureStore();

jest.mock('@plone/volto/components/manage/Form');

describe('ContentsRenameModal', () => {
  it('renders a contents rename modal component', () => {
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
    const component = renderer.create(
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
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
