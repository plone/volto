import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import ContentsWorkflowModal from './ContentsWorkflowModal';

const mockStore = configureStore();

vi.mock('@plone/volto/components/manage/Form');

describe('ContentsWorkflowModal', () => {
  it('renders a contents workflow modal component', () => {
    const store = mockStore({
      workflow: {
        transition: {
          loading: false,
          loaded: true,
        },
        multiple: [],
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <ContentsWorkflowModal
          open
          onOk={() => {}}
          onCancel={() => {}}
          items={['/blog']}
        />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a loading message contents workflow modal component', () => {
    const store = mockStore({
      workflow: {
        transition: {
          loading: false,
          loaded: true,
        },
        multiple: [],
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <ContentsWorkflowModal
          open
          onOk={() => {}}
          onCancel={() => {}}
          items={['/blog']}
        />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
