---
myst:
  html_meta:
    "description": "Volto development overview"
    "property=og:description": "Volto development overview"
    "property=og:title": "Volto development overview"
    "keywords": "Volto, Plone, frontend, React, development, overview"
---

# Overview

If you're coming to Volto as a backend or Classic UI Plone developer, you'll need to learn and adjust to the new frontend-centered development.

If you already have some frontend development experience with any JavaScript framework such as AngularJS, Vue, or React, then you'll find that Volto is a relatively shallow framework, structured as a typical {term}`Redux`-centered React application.
Although there will be Volto-specific knowledge to be gained along the way, you can be productive in a short time.

As a reference, here's an overview of knowledge and frameworks, to give a more complete and accurate picture of the Volto framework.


## Foundation

As is the case with similar modern JavaScript-based applications, you should be familiar the following foundational topics.

-   Modern JavaScript development.
    Volto uses next-generation JavaScript.
    Follow the [ES6 guide](https://flaviocopes.com/es6/) to get up to speed.
-   [Basic React knowledge](https://react.dev/learn/tutorial-tic-tac-toe) to start.
    You'll progress along the way.
    React itself is a simple and well documented framework.
-   A basic understanding of JavaScript.
    [CommonJS](https://flaviocopes.com/commonjs/),
    [npm packages](https://flaviocopes.com/npm/),
    [Yarn](https://flaviocopes.com/yarn/),
    [Babel](https://flaviocopes.com/babel/), and
    [Webpack](https://flaviocopes.com/webpack/).


## Basic Volto development

Once you've {doc}`bootstrapped your Volto project <plone:install/create-project>`, you can immediately start hacking.
The following is a list of some the things you can do at this stage.

-   Configure your text editor for JavaScript and Volto development
-   Volto project-based development
-   Understand and debug React errors
-   Understand the React component lifecycle
-   Customize (shadow) Volto's built-in components
-   Write a new {doc}`block <../blocks/index>`
-   Adjust Volto's {doc}`built-in settings <../configuration/index>`
-   Extend the Pastanaga {doc}`theme <../theming/index>`
-   Extend the {doc}`richtext editor capabilities <../configuration/volto-slate/index>` with new buttons and styles
-   Use the Redux store
-   {doc}`Deploy <../deploying/index>` your first project

After you've mastered the foundation and basic Volto development, the learning curve smoothes out.
Volto uses simple and familiar concepts.
There is nothing on the complexity level of ZCA that you would need to internalize before you can be really productive.


## Routine Volto development

While developing a project using Volto, you might perform the following routine tasks.

-   Write new Redux actions and reducers
-   Create new views for Plone content
-   Install and integrate new JavaScript libraries or third-party React components
-   Create a new Volto add-on
-   Integrate an add-on's LESS statements with Volto's theme variables
-   Use schema-based forms to write block components
-   Write new form widgets
-   Write tests in Jest
-   Write integration tests in Cypress
-   Split your code and lazy-load libraries to improve performance
-   Use more advanced React concepts, including hooks, context providers, and other topics
-   Make your code reusable by separating business logic and repeated behaviors as Higher Order Components (HOCs)
-   Write extensible blocks


## Occasional Volto development

From time to time, you might perform the following tasks.

-   Provide backend-based integration for your Volto code by writing `plone.restapi` endpoints, adapters, and other extensions
-   Custom integration for blocks to the backend using the block transformers concept
-   Write Express middleware for Volto's server
-   Customize Volto's Webpack configuration or project loader using Razzle
-   Write a Redux middleware
-   Start hacking on Volto


## Add-on first approach

Developing for Plone's frontend means to add code to a Volto project.
The frontend files of the project are created in the `frontend` folder.
The generator also creates a default add-on in the `frontend/src/addons` folder.
The project is already configured to use this add-on.
Add your code and customizations to this add-on, and Volto will load them on start up or a restart.
This add-on is configured as a theme add-on, so you are able to customize the look and feel of your site as well.

```{seealso}
For more information about how to develop a Volto project as an add-on, see {doc}`training:voltoaddons/index`.
```
