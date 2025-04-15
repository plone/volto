import React from 'react';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import BlockChooserButton from './BlockChooserButton';
import { render } from '@testing-library/react';

import config from '@plone/volto/registry';

config.experimental = { addBlockButton: { enabled: false } };

config.blocks.blocksConfig.text = {
  id: 'text',
  title: 'Text',
  group: 'text',
  restricted: false,
  mostUsed: false,
  blockHasOwnFocusManagement: true,
  blockHasValue: (data) => {
    const isEmpty =
      !data.text ||
      (data.text?.blocks?.length === 1 && data.text.blocks[0].text === '');
    return !isEmpty;
  },
};

config.settings.defaultBlockType = 'text';

const mockStore = configureStore();

test('Renders a button', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });

  const data = { '@type': 'text', text: '' };
  const { container } = render(
    <Provider store={store}>
      <BlockChooserButton data={data} block="123" />
    </Provider>,
  );
  expect(container).toMatchSnapshot();
});

test('Can render a custom button', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });

  const CustomButton = (props) => <div className="customButton">Click me</div>;
  const data = { '@type': 'text', text: '' };
  const { container } = render(
    <Provider store={store}>
      <BlockChooserButton
        data={data}
        block="123"
        buttonComponent={CustomButton}
      />
    </Provider>,
  );
  expect(container).toMatchSnapshot();
});
