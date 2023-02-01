---
myst:
  html_meta:
    "description": "Volto developer roadmap"
    "property=og:description": "Volto developer roadmap"
    "property=og:title": "Developer roadmap"
    "keywords": "Volto, Plone, frontend, React, developer roadmap, development basic"
---

# Developer roadmap

If you're coming to Volto as a backend Plone developer, you'll have to learn
and adjust to the new frontend-centered development.

But if you already have some frontend development experience any JS frameworks
such as AngularJS, Vue or React, you'll find that Volto is a relatively shallow
framework, structured as a typical {term}`Redux`-centered React application. Although
there will be Volto-specific knowledge to be gained along the way, you can be
productive in a short time.

As a reference, here's an overview of knowledge and frameworks, for a more
complete and accurate picture of the Volto framework.

## The foundation

As is the case with similar modern Javascript-based applications, you should know:

- Modern Javascript development. Volto uses next-generation Javascript. Follow
  the [ES6 guide](https://flaviocopes.com/es6/) to get up to speed.
- React knowledge - [basic level is
  fine](https://reactjs.org/tutorial/tutorial.html) for the beginning, you'll progress
  along the way. React itself is a simple and well documented framework.
- A basic understanding of Javascript
  [CommonJS](https://flaviocopes.com/commonjs/),
  [NPM packages](https://flaviocopes.com/npm/),
  [Yarn](https://flaviocopes.com/yarn/),
  [Babel](https://flaviocopes.com/babel/) and
  [Webpack](https://flaviocopes.com/webpack/).

## Basic Volto development

Once you've bootstrapped your Volto project you can already start hacking. Some
of the things you can do at this stage:

- Configure your text editor for Javascript and Volto development
- Volto project-based development
- Understand and debug React errors
- Understand React component lifecycle
- Customize (shadow) Volto's builtin components
- Write a new block
- Adjust Volto's builtin settings
- Extend the Pastanaga theme
- Extend the richtext editor capabilities with new buttons and styles
- Use the Redux store
- Deploy your first project

After you've mastered the foundation and basic Volto development, the
learning-curve smoothes out. Volto uses simple and familiar concepts,
there is nothing on the level of ZCA that needs to be internalized before you
can be really productive.

## Normal, everyday Volto development

- Write new Redux actions and reducers
- Create new views for Plone content.
- Install and integrate new Javascript libraries or third-party React
  components
- Create a new Volto addon
- Integrate addon LESS with Volto's theme variables
- Use schema-based forms to write block components
- Write new form widgets
- Write tests for jest
- Write integration tests for Cypress
- Split your code and lazy-load libraries, to improve performance
- Use more advanced React concepts: hooks, context providers, etc.
- Make your code reusable, separate business logic and repeated behaviors as
  Higher Order Components (HOCs)
- Write extensible blocks

## Advanced

Not really advanced but perhaps less common, here's some stuff you can do:

- Provide backend-based integration to your Volto code, write plone.restapi
  endpoints, adapters and other extensions
- Custom integration for blocks to the backend using the block transfomers
  concept
- Write Express middleware for Volto's server
- Customize Volto's Webpack configuration or project loader using Razzle
- Write a Redux middleware
- Start hacking on Volto.
