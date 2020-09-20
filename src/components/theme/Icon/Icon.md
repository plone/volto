Icon example:

```jsx static
import codeSVG from '@plone/volto/icons/code.svg';
<Icon name={codeSVG} size="60px" />
```

Output:

```jsx noeditor
import { Provider } from 'react-intl-redux';
import { StaticRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';

import { Icon } from '@plone/volto/components';

import codeSVG from '@plone/volto/icons/code.svg';

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
