import React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
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
    const { baseElement } = render(
      <Provider store={store}>
        <ContentsUploadModal
          pathname="/blog"
          open={true}
          onOk={() => {}}
          onCancel={() => {}}
        />
      </Provider>,
    );
    expect(baseElement).toMatchSnapshot();
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
    const { baseElement } = render(
      <Provider store={store}>
        <ContentsUploadModal
          pathname="/blog"
          open={true}
          onOk={() => {}}
          onCancel={() => {}}
          accept={['image/*']}
        />
      </Provider>,
    );
    expect(baseElement).toMatchSnapshot();
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
    const { baseElement } = render(
      <Provider store={store}>
        <ContentsUploadModal
          pathname="/blog"
          open={true}
          onOk={() => {}}
          onCancel={() => {}}
          maxSize={1000000}
        />
      </Provider>,
    );
    expect(baseElement).toMatchSnapshot();
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
    const { baseElement } = render(
      <Provider store={store}>
        <ContentsUploadModal
          pathname="/blog"
          open={true}
          onOk={() => {}}
          onCancel={() => {}}
          multiple={false}
        />
      </Provider>,
    );
    expect(baseElement).toMatchSnapshot();
  });
});
