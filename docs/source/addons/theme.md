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

3. Load the add-on as any other in your project's `package.json` `addons` key.
4. The theme should be active and you can add now overrides to the default theme in `src/theme` as you would do it in a project.
5. If you want, you can delete now your project `theme` folder, since the one in the add-on will take precedence.

# Modify the theme from another add-on

```{warning}
This feature works only with scss-based themes, and not with SemanticUI themes.
```

Volto theming uses SemanticUI theming capabilities to define and extend at a later point if needed a theme. However, while maintaining and playing well with the Semantic UI Volto base, using a traditional CSS approach can be done using the less-based `extras` scape hatch.

At the same time, one can entirely bail off the extras scape hatch and add your own, by customizing the `theme.js` module in Volto.

```js
// These are the default
import 'semantic-ui-less/semantic.less';
import '@plone/volto/../theme/themes/pastanaga/extras/extras.less';

// You can add more entry points for theming
import '@kitconcept/volto-light-theme/theme/main.scss';
```

Then you can build your own approach for theming, even use the preprocessor of your choice (here, scss) while maintaining the "base" Volto theme, but customizing it using the resultant CSS from your own theming entry point.

You can see an example of such a theme in: https://github.com/kitconcept/volto-light-theme

This approach supports only scss preprocessor, but the same approach can be used to add more entry points or use another preprocessor or theming approach.

There are defined two entry points: variables and main.
In your add-on, you can extend an existing theme in use by creating a file corresponding to each entry point:

* `./src/theme/_variables.scss`
* `./src/theme/_main.scss`

## Variables (`addonsThemeCustomizationsVariables`)

Use this entry point file to modify a theme original variables (by adding the entry point after your own variable definitions in the theme). In the theme, it should be imported like this:

```scss hl_lines="2"
@import 'variables';
@import 'addonsThemeCustomizationsVariables';
@import 'typography';
@import 'utils';
@import 'layout';
```

Volto will detect all the add-ons that have the entry points files and import grouped them under `addonsThemeCustomizationsVariables` alias which that Volto sets automatically.

## Main (`addonsThemeCustomizationsMain`)

These entry point that is intended to add your own styling complementing the theme ones. You should add it after all the CSS of your theme:

```scss hl_lines="6"
@import 'blocks/search';
@import 'blocks/listing';

@import 'temp';

@import 'addonsThemeCustomizationsMain';

/* No CSS beyond this point */
```

Volto will detect all the add-ons that have the entry points files and import grouped them under `addonsThemeCustomizationsMain` alias that Volto sets automatically.

```{note}
It will only work in combination of the theme declaration above.
```
