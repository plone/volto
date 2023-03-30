---
myst:
  html_meta:
    "description": "Create a theme add-on"
    "property=og:description": "Create a theme add-on"
    "property=og:title": "Create a theme add-on"
    "keywords": "Volto, Plone, Semantic UI, CSS, Volto theme"
---

# Create a theme add-on

We can create a Volto Add-on that acts as a theme Add-on, so we can detach it from the project.
The advantage is that you can deploy the same theme in different projects, or have themes depending on conditions that you could inject on build time.

1. Add a `theme` key in your `volto.config.js` file in the root of your project:

```js
module.exports = {
  addons: [],
  theme: 'volto-my-theme'
};
```
or add a key in your `package.json` project:

```json
"theme": "volto-my-theme"
```

2. Create a directory `src/theme` in your add-on, then add this file `theme.config`, replacing `<name_of_your_theme>` with your add-on name:

```less
/*******************************
        Theme Selection
*******************************/

/* To override a theme for an individual element specify theme name below */

/* Global */
@site        : 'pastanaga';
@reset       : 'pastanaga';

/* Elements */
@button      : 'pastanaga';
@container   : 'pastanaga';
@divider     : 'pastanaga';
@flag        : 'pastanaga';
@header      : 'pastanaga';
@icon        : 'pastanaga';
@image       : 'pastanaga';
@input       : 'pastanaga';
@label       : 'pastanaga';
@list        : 'pastanaga';
@loader      : 'pastanaga';
@placeholder : 'pastanaga';
@rail        : 'pastanaga';
@reveal      : 'pastanaga';
@segment     : 'pastanaga';
@step        : 'pastanaga';

/* Collections */
@breadcrumb  : 'pastanaga';
@form        : 'pastanaga';
@grid        : 'pastanaga';
@menu        : 'pastanaga';
@message     : 'pastanaga';
@table       : 'pastanaga';

/* Modules */
@accordion   : 'pastanaga';
@checkbox    : 'pastanaga';
@dimmer      : 'pastanaga';
@dropdown    : 'pastanaga';
@embed       : 'pastanaga';
@modal       : 'pastanaga';
@nag         : 'pastanaga';
@popup       : 'pastanaga';
@progress    : 'pastanaga';
@rating      : 'pastanaga';
@search      : 'pastanaga';
@shape       : 'pastanaga';
@sidebar     : 'pastanaga';
@sticky      : 'pastanaga';
@tab         : 'pastanaga';
@transition  : 'pastanaga';

/* Views */
@ad          : 'pastanaga';
@card        : 'pastanaga';
@comment     : 'pastanaga';
@feed        : 'pastanaga';
@item        : 'pastanaga';
@statistic   : 'pastanaga';

/* Extras */
@main        : 'pastanaga';
@custom      : 'pastanaga';

/*******************************
            Folders
*******************************/

/* Path to theme packages */
@themesFolder : '~volto-themes';

/* Path to site override folder */
@siteFolder  : "~<name_of_your_theme>/theme";

/*******************************
         Import Theme
*******************************/

@import (multiple) "~semantic-ui-less/theme.less";
@fontPath : "~volto-themes/@{theme}/assets/fonts";

.loadAddonOverrides() {
  @import (optional) "@{siteFolder}/@{addon}/@{addontype}s/@{addonelement}.overrides";
}

/* End Config */
```

3. You also have to declare it as an add-on, so don't forget to add it in the `addons` key in `volto.config.js` or in `package.json`.
4. After starting Volto, the theme should be active and you can add now overrides to the default theme in `src/theme` as you would do it in a project.
5. You can safely delete now your project's `theme` folder, since the one in the add-on will take precedence.

## Using your own scape hatch

Volto theming uses SemanticUI theming capabilities to define and extend a theme for your site. However, while maintaining and playing well with the Semantic UI Volto base, using a traditional CSS approach can be done using the less-based `extras` scape hatch.

At the same time, one can entirely bail off the extras scape hatch and add your own, by customizing the `theme.js` module in Volto.

```js
import 'semantic-ui-less/semantic.less';
import '@plone/volto/../theme/themes/pastanaga/extras/extras.less';

// You can add more entry points for theming
import '@kitconcept/volto-light-theme/theme/main.scss';
```

While building your own scape hatch for theming, you can use the preprocessor of your choice (in the example, scss) while maintaining the "base" Volto theme, but customizing it using the resultant CSS.

You can see an example of such a theme in: https://github.com/kitconcept/volto-light-theme

## Modify a custom theme using from another add-on

Sometimes you have a custom theme that you want to reuse through all your projects, but with some differences, maintaining the base.
Usually, the only option would be to use an addon that adds more CSS to the base theme, using imports that will load after the theme.
However, there is a problem with this approach.
You cannot use existing theme variables (like breakpoints, etc) on these new CSS.
The same way, it gets somewhat detached from the normal flow of the loaded theme.
Same applies for add-ons, they are detached from the current theme.
One could use a SemanticUI approach for making this work, but it's SemanticUI bound.

```{warning}
This is only possible when using your own scape hatch, and works only with scss-based themes, and not with SemanticUI themes, since it enables a couple of entry points that only support scss files. For an example of how it could be used, see: https://github.com/kitconcept/volto-light-theme
```

If your custom scape hatch defines a custom theme using scss, you can take advantage of this feature.
Although not limited to this, it would be possible to extend this feature to add more entry points, use another preprocessor or theming approach.

This feature enables two entry points: variables and main.
From your add-on code, you can extend an existing theme in use by creating a file corresponding to each entry point:

* `./src/theme/_variables.scss`
* `./src/theme/_main.scss`

### Variables (`addonsThemeCustomizationsVariables`)

Use this entrypoint file to modify the original variables of the current loaded theme (by adding the entrypoint after your own variable definitions in the theme). In the theme, it should be imported like this:

```scss hl_lines="2"
@import 'variables';
@import 'addonsThemeCustomizationsVariables';
@import 'typography';
@import 'utils';
@import 'layout';
```

Volto will not only load your add-on entrypoints files but it will also detect all the add-ons that have these entrypoint files and import them grouped under a single file, and will add automatically an `addonsThemeCustomizationsVariables` alias that can be referenced from the theme as shown above.

### Main (`addonsThemeCustomizationsMain`)

This entrypoint is intended to add your own styling definitions, complementing the theme ones. You should add it after all the CSS of your theme:

```scss hl_lines="6"
@import 'blocks/search';
@import 'blocks/listing';

@import 'temp';

@import 'addonsThemeCustomizationsMain';

/* No CSS beyond this point */
```

Volto will also detect all the add-ons that have this entrypoint files and import them grouped under a single file, and will add automatically an `addonsThemeCustomizationsMain` alias that can be referenced from the theme as shown above.

```{note}
It will only work in combination with the theme declaration in `volto.config.js` or in `package.json`.
```
