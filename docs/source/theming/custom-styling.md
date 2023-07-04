---
myst:
  html_meta:
    "description": "Styling a Volto website using Semantic UI."
    "property=og:description": "Styling a Volto website using Semantic UI."
    "property=og:title": "Custom Styling"
    "keywords": "Volto, Plone, frontend, React, Custom, Styling, Semantic UI, LESS, Pastanaga"
---

# Custom Styling

## Semantic UI

For styling our website in Volto we use Semantic UI. It uses LESS as
the underlying technology. By default Volto uses the Pastanaga theme but any
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

```{tip}
You can find the default definitions for all the available variables in the
default theme components (the site component in the example) in two ways, by using the source code:
`node_modules/semantic-ui-less/themes/default/globals/site.variables`
or by checking it out on Github:
https://github.com/Semantic-Org/Semantic-UI-LESS/blob/master/themes/default/globals/site.variables
```

```{tip}
Similarly, you can take a look at the default styling on the default
definitions, by using the source code:
`node_modules/semantic-ui-less/definitions/globals/site.less`
or by checking it out on Github:
https://github.com/Semantic-Org/Semantic-UI-LESS/blob/master/definitions/globals/site.less
```

In the globals folder we have the `site.variables` and `site.overrides` files
which contain the site wide styling. If you want to customize something in the
site component, you should create the `globals` folder and place inside one (or
both) files (including the matching folder structure) in your theme folder.

## Pastanaga UI Theme

Volto implements Pastanaga UI theme, a new theme for Content Management Systems
created and designed by [Albert Casado](https://twitter.com/albertcasado).
For more info:

* https://pastanaga.io
* https://github.com/plone/pastanaga
* https://2017.ploneconf.org/talks/pastanaga-ui-resistance-is-futile

Volto look and feel is a Semantic UI theme that implements Pastanaga UI, called
`pastanaga` and can be found in the Volto `theme/themes/pastanaga` directory.

```{tip}
You can find it in the source code:
`node_modules/@plone/volto/theme/themes/pastanaga`
or on Github:
https://github.com/plone/volto/tree/master/theme/themes/pastanaga
```

Pastanaga Theme is an example on how to customize the default Semantic UI look
and feel.


## Examples: Changing Base Font

We start by creating the file `theme/globals/site.variables`.
In this file we can override any value.
We do not need to copy the whole file from Volto core.
We can add variables we would like to change.
When we want to change the base font, we add the following:

```less
@fontName : 'Comic Sans MS';
```

The font 'Comic Sans MS' needs to be either installed on you machine or provided with your app.

To provide the font with your app, the following steps are necessary:

1. Get your font and copy the files to `/theme/assets/fonts/<font name with space replaced by _>`.

1. Usually the font provider gives you ready made font-face instructions.
  Copy these font-face code lines to `/theme/typography.css`.
  There are a lot of font providers.
  If you choose Google fonts, check [google-webfonts-helper](https://gwfh.mranftl.com/fonts) to generate `font-face` CSS code and download font files to include in your project.

1. Add to the end of `/theme/theme.config` a function to load your font-faces:

    ```less
    .loadThemeFonts() {
        @import "./typography.css";
    }
    ```

1. Call this load function in `/theme/globals/site.overrides`:

    ```less
    .loadThemeFonts();
    ```

1. In `/theme/globals/site.variables` you can now override both, the font for headings (h1, h2, h3, …) and the font for the rest.

    ```less
    // Do not override @fontName!
    // @fontName: 'Raleway', 'Helvetica Neue', Arial, Helvetica, sans-serif;

    @pageFont: 'Raleway', 'Helvetica Neue', Arial, Helvetica, sans-serif;
    @headerFont: 'Rubic Microbe', 'Helvetica Neue', Arial, Helvetica, sans-serif;
    ```

Voilà.
Start your Volto app if you created new files.

````{tip}
For testing purpose you can refrain from installing the font and from providing the font with your app if the font is a Google font.
With the following two lines you tell Volto to load the font "Montserrat" from `fonts.google.com`.

```less
@fontName : 'Montserrat';
@importGoogleFonts : true;
```
````


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
