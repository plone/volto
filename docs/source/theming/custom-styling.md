# Custom Styling

## Semantic UI

For styling our website in Volto we use Semantic UI. It uses LESS as
the underlaying technology. By default Volto uses the Pastanaga theme but any
theme can be used. A theme has the following folder structure:

 - assets
 - collections
 - elements
 - globals
 - modules
 - views

## Variables and overrides files

The assets folder contains all the images and fonts. The other folders contain
LESS files. Those less files are separate for each UI component. For example we
have separate files for buttons. Each UI component has 2 files: a `.variables`
file and an `.overrides` file. The `.variables` file contains all the
predefined variables which you can override in your theme. If you want to do
more specific customizations you can use the `.overrides` file to write your own LESS.

!!! tip
    You can find the default definitions for all the available variables in the
    default theme components (the site component in the example) in two ways, by using the source code:
    `node_modules/semantic-ui-less/themes/default/globals/site.variables`
    or by checking it out on Github:
    https://github.com/Semantic-Org/Semantic-UI-LESS/blob/master/themes/default/globals/site.variables
    

!!! tip
    Similarly, you can take a look at the default styling on the default
    definitions, by using the source code:
    `node_modules/semantic-ui-less/definitions/globals/site.less`
    or by checking it out on Github:
    https://github.com/Semantic-Org/Semantic-UI-LESS/blob/master/definitions/globals/site.less

In the globals folder we have the `site.variables` and `site.overrides` files
which contain the site wide styling. If you want to customize something in the
site component, you should create the `globals` folder and place inside one (or
both) files (including the matching folder structure) in your theme folder.

## Pastanaga UI Theme

Volto implements Pastanaga UI theme, a new theme for Content Management Systems
created and designed by [Albert Casado](https://twitter.com/albertcasado). For
more info:

* https://pastanaga.io
* https://github.com/plone/pastanaga
* https://2017.ploneconf.org/talks/pastanaga-ui-resistance-is-futile

Volto look and feel is a Semantic UI theme that implements Pastanaga UI, called
`pastanaga` and can be found in the Volto `theme/themes/pastanaga` directory.

!!! tip
    You can find it in the source code:
    `node_modules/@plone/volto/theme/themes/pastanaga`
    or on Github:
    https://github.com/plone/volto/tree/master/theme/themes/pastanaga

Pastanaga Theme is an example on how to customize the default Semantic UI look
and feel.

## Examples: Changing Base Font

We start by creating the file `theme/globals/site.variables`. In this file we
can override any value. We do not need to copy the whole file. We can add
variables we would like to change. When we want to change the base font, we add
the following:

```less
@fontName : 'Comic Sans MS';
```

> Make sure you have the 'Comic Sans MS' font installed. This is the
> 'ttf-mscorefonts-installer' package for the Debian linux distribution.

> If you create a new file, the watcher won't be aware of it, you must restart
> the `yarn start` Volto process again.

You can also point it to any Google Web Font name like:

```less
@fontName : 'Montserrat';
```

## Changing The Breadcrumbs

Change the breadcrumbs so that the divider is pink in `theme/collections/breadcrumb.variables`:

```less
@dividerColor: @pink;
```

## Using Overrides

For features which are not supported in Semantic UI through the variables, we
can use the overrides files. Update the breadcrumbs so that the links are
underlined, then in `theme/collections/breadcrumb.overrides`:

```less
.ui.breadcrumb a {
    text-decoration: underline;
}
```
