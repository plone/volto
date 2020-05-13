# Acceptance tests

We use Cypress as Volto's acceptance test framework.

## Helper commands

There are some artifacts available for the acceptance tests made accessible to Cypress.

### Access History, Redux Store and Settings

We expose the History, Redux Store and Settings from the app (only for Cypress environments) so we can easily access them and execute actions (like navigate using the router), dispatch Redux actions or change app settings "on the fly".

#### Navigate using React Router

You can navigate using the React Router (ie. not reloading the page) with this command:

```js
cy.navigate('/events');
```

#### Redux Store

You can access the Redux store and check for specific states and dispatch actions by:

```js
import { updateIntl } from 'react-intl-redux';
import deLocales from '../../locales/de.json';

const dispatch = action =>
  cy
    .window()
    .its('store')
    .invoke('dispatch', action);

dispatch(
  updateIntl({
    locale: 'de',
    messages: deLocales,
  }),
);
```

More information about this: https://www.cypress.io/blog/2018/11/14/testing-redux-store/

#### Volto settings

You can modify on the fly the main Volto settings like this:

```js
cy.settings().then(settings => {
  settings.defaultLanguage = 'de';
  settings.isMultilingual = true;
  settings.supportedLanguages = ['de', 'en'];
});
```
