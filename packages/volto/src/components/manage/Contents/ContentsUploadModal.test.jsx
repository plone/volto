import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { waitFor } from '@testing-library/react';
import ContentsUploadModal from './ContentsUploadModal';

const mockStore = configureStore();

describe('ContentsUploadModal', () => {
  it('renders a contents upload modal component', async () => {
    const store = mockStore({
      content: {
        create: {
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
        <ContentsUploadModal
          pathname="/blog"
          open={false}
          onOk={() => {}}
          onCancel={() => {}}
        />
      </Provider>,
    );
    const json = component.toJSON();
    await waitFor(() => {});
    expect(json).toMatchSnapshot();
  });

  it('renders a contents upload modal component that only allows images', async () => {
    const store = mockStore({
      content: {
        create: {
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
        <ContentsUploadModal
          pathname="/blog"
          open={false}
          onOk={() => {}}
          onCancel={() => {}}
          accept={['image/*']}
        />
      </Provider>,
    );
    const json = component.toJSON();
    await waitFor(() => {});
    expect(json).toMatchSnapshot();
  });
  it('renders a contents upload modal component that only allows 10MB files', async () => {
    const store = mockStore({
      content: {
        create: {
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
        <ContentsUploadModal
          pathname="/blog"
          open={false}
          onOk={() => {}}
          onCancel={() => {}}
          maxSize={1000000}
        />
      </Provider>,
    );
    const json = component.toJSON();
    await waitFor(() => {});
    expect(json).toMatchSnapshot();
  });
  it('renders a contents upload modal component that only allows 1 file', async () => {
    const store = mockStore({
      content: {
        create: {
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
        <ContentsUploadModal
          pathname="/blog"
          open={false}
          onOk={() => {}}
          onCancel={() => {}}
          multiple={false}
        />
      </Provider>,
    );
    const json = component.toJSON();
    await waitFor(() => {});
    expect(json).toMatchSnapshot();
  });
});
