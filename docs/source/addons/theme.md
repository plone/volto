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
