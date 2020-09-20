Icon example:

```jsx static
import codeSVG from '@plone/volto/icons/code.svg';
<Icon name={codeSVG} size="60px" />
```

Output:

```jsx noeditor
const { Provider } = require('react-intl-redux');
const configureStore = require('redux-mock-store').default;
const BrowserRouter = require('react-router-dom/BrowserRouter').default;
import StaticRouter from 'react-router-dom/StaticRouter';
import codeSVG from '@plone/volto/icons/code.svg';
import { Icon } from '@plone/volto/components';

const store = configureStore()({
  intl: {
    locale: 'en',
    messages: {},
  },
});

<div className={'rsg--pre-42'}>
  <Provider store={store}>
    <StaticRouter>
      <Icon
        name={ codeSVG }
        size={'60px'}
        color={'#bbbbbb'}
        title={'This is SVG'}
      />
    </StaticRouter>
  </Provider>
</div>;
```
