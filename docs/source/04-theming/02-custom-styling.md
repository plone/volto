# Custom Styling

## Semantic UI

For styling our website in Volto we use Semantic UI. Semantic UI uses LESS as
the underlaying technology. By default Volto uses the Pastanaga theme but any
theme can be used. A theme has the following folder structure:

 - assets
 - collections
 - elements
 - globals
 - modules
 - views

The assets folder contains all the images and fonts. The other folders contain
LESS files. Those less files are separate for each UI component. For example we
have separate files for buttons. Each UI component has 2 files a `.variables`
file and an `.overrides` file. The `.variables` file contains all the
predefined variables which you can override in your theme. If you want to do
more specific customizations you can use the `.overrides` file to write your own LESS.

In the globals folder we have the `site.variables` and `site.overrides` files
which contain the site wide styling. If we want to customize something we can
create the same file (including the matching folder structure) in our theme
folder.

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
