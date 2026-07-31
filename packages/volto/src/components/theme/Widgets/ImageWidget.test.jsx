import React from 'react';
import renderer from 'react-test-renderer';
import ImageWidget from './ImageWidget';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();

describe('ImageWidget', () => {
  const store = mockStore({
    intl: { locale: 'en', messages: {} },
    site: { data: { 'plone.image_scales': { preview: {}, listing: {} } } },
  });

  it('renders an empty image view widget component', () => {
    const component = renderer.create(
      <Provider store={store}>
        <ImageWidget />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders an image view widget component', () => {
    const component = renderer.create(
      <Provider store={store}>
        <ImageWidget
          className="metadata"
          value={{ download: '/foo-bar.png' }}
        />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders an image view widget component with children', () => {
    const component = renderer.create(
      <Provider store={store}>
        <ImageWidget
          className="metadata"
          value={{
            download: '/foo-bar.png',
            file_name: 'foo-bar.png',
          }}
        >
          {(child) => <strong>{child}</strong>}
        </ImageWidget>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
