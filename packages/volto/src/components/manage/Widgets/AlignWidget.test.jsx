import React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import imageFullSVG from '@plone/volto/icons/image-full.svg';

import AlignWidget from './AlignWidget';

const mockStore = configureStore();

describe('renders an align widget component', () => {
  it('basic', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });

    const { asFragment } = render(
      <Provider store={store}>
        <AlignWidget
          id="align"
          title="Alignment"
          fieldSet="default"
          onChange={() => {}}
        />
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('extended with actions and actionsInfoMap props', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });

    const { asFragment } = render(
      <Provider store={store}>
        <AlignWidget
          id="align"
          title="Alignment"
          fieldSet="default"
          onChange={() => {}}
          actions={['additional']}
          actionsInfoMap={{
            additional: [imageFullSVG, 'Additional action title'],
          }}
        />
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
