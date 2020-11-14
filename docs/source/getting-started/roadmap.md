# Developer roadmap

If you're coming to Volto as a backend Plone developer, you'll have to learn
and adjust to the new frontend-centered development.

But if you already have some frontend development experience any JS frameworks
such as AngularJS, Vue or React, you'll find that Volto is a relatively shallow
framework, structured as a typical Redux-centered React application. Although
there will be Volto-specific knowledge to be gained along the way, you can be
productive in a really short time.

As a reference, here's an overview of knowledge and frameworks, for a more
complete and accurate picture of the Volto framework.

## The foundation

As for similar modern SPA applications, you should know:

- Modern Javascript development. Volto uses next-generation Javascript. Follow
  the ES6 guide to get up to speed.
- React knowledge - basic level is fine for the beginning, you'll progress
  along the way. React itself is a simple and well documented framework.

## Basic Volto development

Once you've bootstrapped your Volto project you can already start hacking. Some
of the things you can do at this stage:

- Configure your text editor for Javascript and Volto development
- Volto project-based development
- Adjust Volto's builtin settings
- Write a new block
- Customize (shadow) Volto's builtin components
- Extend the Pastanaga theme
- Extend the richtext editor capabilities with new buttons and styles
- Use the Redux store
- Deploy your first project

After you've mastered the foundation and basic Volto development, the
learning-curve really smoothes out. Volto uses simple and familiar concepts,
there is nothing on the level of ZCA that needs to be internalized before you
can be really productive.

## Normal, every-day Volto development

For the next steps in Volto development, you'll be exposed to a wider variety
of technologies.

- Write new Redux actions and reducers
- Create new views for Plone content. Dip into plone.restapi integration
- Install and integrate new Javascript libraries or third-party React
  components
- Create a new Volto addon
- Use schema-based form to write block components
- Write a new form widget
- Write tests for jest
- Write integration tests for Cypress
- Split your code and lazy-load libraries, to improve performance

## Advanced

Not really advanced but perhaps less common, here's some stuff you can do:

- Write Express middleware for Volto's server
- Customizing Volto's Webpack configuration or project loader using Razzle
- Start hacking on Volto.
