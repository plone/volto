Anontools example:

```jsx static
<Anontools token="" content="" />
```

Output:

```jsx noeditor
import { Provider } from 'react-redux';
import configureStore from '../../../store.js';
import { createBrowserHistory } from 'history';
import { List } from 'semantic-ui-react';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import { Api } from '../../../helpers';

const api = new Api();

const store = configureStore({}, createBrowserHistory(), api);
<Provider store={store}>
  <BrowserRouter>
    <Anontools token="" content="" />
  </BrowserRouter>
</Provider>;
```
