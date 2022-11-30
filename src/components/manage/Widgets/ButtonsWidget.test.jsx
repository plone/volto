import React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import imageFullSVG from '@plone/volto/icons/image-full.svg';
import textJustifiedSVG from '@plone/volto/icons/align-justify.svg';
import textCenteredSVG from '@plone/volto/icons/align-center.svg';
import textLeftSVG from '@plone/volto/icons/align-left.svg';
import textRightSVG from '@plone/volto/icons/align-right.svg';

import ButtonsWidget from './ButtonsWidget';

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
        <ButtonsWidget
          id="align"
          title="Alignment"
          fieldSet="default"
          onChange={() => {}}
          actions={['left', 'right', 'centered', 'justified']}
          actionsInfoMap={{
            left: [textLeftSVG, 'Text Left'],
            right: [textRightSVG, 'Text Right'],
            justified: [textJustifiedSVG, 'Text Justified'],
            centered: [textCenteredSVG, 'Text Centered'],
          }}
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
        <ButtonsWidget
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
