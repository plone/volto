# Using third party libraries/themes different from semantic-ui

You can use Volto with third party libraries or themes written in sass and avoid applying semantic-ui on public facing views.
This is made possible by code splitting, where interfaces have a marker CSS class to incapsulate styles and avoid conflicts between semantic-ui and the custom theme you would use.

## The problem

The main purpuse could be to use a sass based theme like Bootstrap.
If you want to load a different styling library using the base Volto configuration, you will load a huge bundle with both having weight and performance issues thus this would likely imply conflicts on base elements as containers.

## The solution

Volto supports the split of the styles on a different theme: `pastanaga-cms-ui`.
This will load only the CSS needed for Volto's own interfaces like toolbar, sidebar and blocks management. Generally speaking, only for the management interfaces.
With this different theme, the end user interfaces will be free to be styled with your custom styles.

To accomplish this, you will need to follow two wrapper CSS classes:

- `cms-ui` for management interfaces;
- `public-ui` for end-user/public facing views.

These classes are applied to the body element and in those situations where you are in a management view but a component is a "public" one or the opposite, in order to handle the specialization of those.
An example of this behavior is the blocks view: you are in a public view because you are not editing the content, but you have the toolbar.

## Setting up the theme

In your Volto project, customize the file `src/theme.js`:

```diff
- import 'semantic-ui-less/semantic.less';
+ import '@plone/volto/../theme/themes/pastanaga-cms-ui/extras/cms-ui.semantic.less';
import '@plone/volto/../theme/themes/pastanaga/extras/extras.less'

+ // Import your site styles, i.e.:
+ import '../theme/site.scss';
```

Then, in your `theme.config` change the following and the needed variables:

```diff
- @container   : 'pastanaga';
+ @container   : 'pastanaga-cms-ui';
```

### Use sass loader

If you have to load sass, you will need `razzle-plugin-scss` and you will have to customize `razzle.config.js` integrating that plugin into razzle configuration.

Example:

```js
const volto_config = require(`${voltoPath}/razzle.config`);

module.exports = Object.assign({}, volto_config, {
  modify: (config, { target, dev }, webpack) => {
    ...
  },
  plugins: [
    {
      name: 'scss',
      options: {
        sass: {
          dev: {
            outputStyle: 'expanded',
            sourceMap: true,
            includePaths: ['node_modules'],
          },
          prod: {
            outputStyle: 'expanded',
            sourceMap: true,
            includePaths: ['node_modules'],
          }
        },
      },
    },
  ],
});
```

Complete example in an active project:  
https://github.com/RedTurtle/design-volto-theme/blob/master/razzle.config.js

In that project, there is the sass loader and the svg loader, too.

### Including custom styles

In your Volto site theme, include your site custom styles in `src/theme.js` as described before.

Including other styling libraries in most cases will mess font sizes, so it is suggested to add something like:

```scss
body.cms-ui {
  .public-ui {
    font-size: 18px;
    font-weight: 300;
  }
}
```

to avoid troubles on basical stuff: this is useful to have the correct font in the public-ui component showed while in a cms-view.

!!! tip
    Consider adding `public-ui` CSS class as a wrapper for your components, so they will be using your public theme. A good example of this is for the blocks, that need the public-ui styles both while viewing the object and while editing it.
    On the other hand, many Volto components are using `cms-ui`.

For any other customization, you can put styles in your site theme and override stuff taking advantage of semantic composition engine.

## Example themes using this approach

https://github.com/RedTurtle/design-volto-theme
