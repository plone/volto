---
myst:
  html_meta:
    "description": "Create a theme add-on"
    "property=og:description": "Create a theme add-on"
    "property=og:title": "Create a theme add-on"
    "keywords": "Volto, Plone, Semantic UI, CSS, Volto theme"
---

# Create a Volto theme add-on

We can create a Volto Add-on that acts as a Volto theme Add-on, so we can detach it from the project files.
The advantage is that you convert the project Volto theme in a pluggable one, so you can deploy the same theme in different projects.
You can even have themes depending on conditions that you could inject on build time.
This is the purpose of `volto.config.js`, the ability of declaring `add-ons` and the active `theme` programatically. See {ref}`volto-config-js` for more information.
For convenience, it can also be set via a `THEME` environment variable.

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

or via a `THEME` variable:

```shell
THEME='volto-my-theme' yarn start
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
@siteFolder  : "<name_of_your_theme>/theme";

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

3. Declare the theme as an add-on by adding its name to the value for the `addons` key in either `volto.config.js` or `package.json` of your project.
4. After starting Volto, the theme should be active.
   Now you can add overrides to the default theme in `src/theme`, same as you would in a project.
5. Now you can safely delete your project's `theme` folder, since the one in the add-on will take precedence and a project can only have one active theme at a time.

## Using your own theming escape hatch

Volto theming uses SemanticUI theming capabilities to define and extend a theme for your site.
However, while maintaining and playing well with the Semantic UI Volto base, using a traditional CSS approach can be done using the LESS preprocessor-based `extras` escape hatch.

At the same time, one can either discard or complement the extras escape hatch and add your own, by customizing the `theme.js` module in Volto.

```js
import 'semantic-ui-less/semantic.less';
import '@plone/volto/../theme/themes/pastanaga/extras/extras.less';

// You can add more entry points for theming
import '@kitconcept/volto-light-theme/theme/main.scss';
```

Customizing it is a special use case in Volto: add a `./@root/theme.js` file structure in your `customizations` folder in your add-on or project.

You may want to do this to create a complete new theming experience adapted to your way of doing things that do not match the current Volto theming experience.
For example, if you want to use another preprocessor in the theme, like SCSS.
Maybe because your client forces you to have another entirely base of pre-made components based on another library other than Semantic UI:
See {ref}`volto-custom-theming-strategy` for an example of a custom theme escape hatch.

While building your own escape hatch for theming, you can use the preprocessor of your choice (in the example, SCSS) while maintaining the "base" Volto theme, but customizing it using the resultant CSS.

You can see an example of such a theme in: https://github.com/kitconcept/volto-light-theme

## Modify a custom theme from another add-on

Sometimes you have a custom theme that you want to reuse through all your projects, but with some differences, maintaining the base.
Usually, the only option would be to use an add-on that adds more CSS to the base theme, using imports that will load after the theme.
However, there is a problem with this approach.
You cannot use existing theme variables, including breakpoints, on these new styles.
Similarly, it gets somewhat detached from the normal flow of the loaded theme.
The same applies for add-ons, as they are detached from the current theme.
One could use a SemanticUI approach for making this work, but it's SemanticUI bound.

```{warning}
This is only possible when using your own escape hatch, and works only with SCSS-based themes, and not with SemanticUI themes, since it enables a couple of entry points that only support SCSS files.
For an example of how it could be used, see: https://github.com/kitconcept/volto-light-theme
```

If your custom escape hatch defines a custom theme using SCSS, you can take advantage of this feature.
Although not limited to this, it would be possible to extend this feature to add more entry points, using another preprocessor or theming approach.

This feature enables two entry points: variables and main.
From your add-on code, you can extend an existing theme by creating a file corresponding to each entry point:

* `./src/theme/_variables.scss`
* `./src/theme/_main.scss`

### Variables (`addonsThemeCustomizationsVariables`)

Use this entry point file to modify the original variables of the current loaded theme by adding the entry point before the theme variable definitions.
In the theme, it should be imported as shown below:

```scss hl_lines="2"
@import 'addonsThemeCustomizationsVariables';
@import 'variables';
@import 'typography';
@import 'utils';
@import 'layout';
```

```{warning}
Following SCSS best practices, your theme variables should be "overridable" using the `!default` flag.
This assigns a value to a variable _only_ if that variable isn't defined or its value is [`null`](https://sass-lang.com/documentation/values/null).
Otherwise, the existing value will be used.
For more information, see https://sass-lang.com/documentation/variables#default-values
```

Volto will not only load your add-on entry point files, but it will also detect all the add-ons that have these entry point files and import them grouped under a single file.
It will also automatically add an `addonsThemeCustomizationsVariables` alias that can be referenced from the theme as shown above.

### Main (`addonsThemeCustomizationsMain`)

This entry point is intended to add your own style definitions, complementing those in the theme.
You should add it after all the CSS of your theme:

```scss hl_lines="6"
@import 'blocks/search';
@import 'blocks/listing';

@import 'temp';

@import 'addonsThemeCustomizationsMain';

/* No CSS beyond this point */
```

Volto will also detect all the add-ons that have these entry point files, and import them grouped under a single file, and will automatically add an `addonsThemeCustomizationsMain` alias that can be referenced from the theme as shown above.

```{note}
It will only work in combination with the theme declaration in `volto.config.js` or in `package.json`.
```
