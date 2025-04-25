import UniversalLinkComponent from './UniversalLink';
import { injectIntl } from 'react-intl';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

const UniversalLink = (args) => {
  const mockStore = configureStore();
  const store = mockStore({
    userSession: {
      token: null,
    },
    intl: {
      locale: 'en',
      messages: {},
    },
  });
  return (
    <Provider store={store}>
      <UniversalLinkComponent
        {...args}
        href="http://www.google.it"
        item={{
          '@id': 'http://localhost:3000/example-link-to-twitter',
          remoteUrl: 'http://www.twitter.it',
        }}
      >
        {args.text || 'Example link to google'}
      </UniversalLinkComponent>
      <h4>Link to a generic object. Example code for 'item' prop:</h4>
      <code> {`{'@id':'localhost:3000/test-page'}`}</code>
      <h4>Link to a Link object. Example code for 'item' prop:</h4>
      <code>
        {`{'@id':'localhost:3000/example-link-to-twitter', 'remoteUrl':'http://www.twitter.it'}`}
      </code>
    </Provider>
  );
};

export default {
  title: 'UniversalLink',

  argTypes: {
    href: {
      control: 'text',
    },

    item: {
      control: 'object',
    },

    text: {
      control: 'text',
    },
  },

  decorators: [
    (Story) => (
      <div
        style={{
          width: '400px',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const UniversalLink_ = {
  render: injectIntl(UniversalLink).bind({}),
  name: 'UniversalLink',
};
