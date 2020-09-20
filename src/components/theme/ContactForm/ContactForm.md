Contact form example source:

```jsx_ noeditor
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';

const store = configureStore()({
  emailNotification: {
    error: {},
    loading: false,
    loaded: false,
  },
  intl: {
    locale: 'en',
    messages: {},
  },
});

<div className={'rsg--pre-42'}>
  <Provider store={store}>
    <StaticRouter>
      <ContactForm error={(message = '')} loading={false} loaded={false} />
    </StaticRouter>
  </Provider>
</div>;
```
