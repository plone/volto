App example:

```jsx static
<AppComponent />
```
Output:
```jsx noeditor
const { Provider } = require('react-redux');
const configureStore= require('../../../store.js').default;
const { createBrowserHistory } = require('history');
const BrowserRouter = require('react-router-dom/BrowserRouter').default;
const {Api} = require('../../../helpers');

const api = new Api();
const initialState = {
  app: {
    name: 'Pizza Delivery'
  }
};
function purgeMessage(){
    return ""
}

const store = configureStore( initialState, createBrowserHistory(), api );<Provider store={store}>
<BrowserRouter>
  <AppComponent pathname="" purgeMessages={purgeMessage}/>
</BrowserRouter>
</Provider>
```