---
myst:
  html_meta:
    "description": "How to create a Volto theme add-on"
    "property=og:description": "How to create a Volto theme add-on"
    "property=og:title": "Create a Volto theme add-on"
    "keywords": "Volto, Plone, Semantic UI, CSS, theme, add-on"
---

# Create a Volto theme add-on

Volto supports two practical ways to theme a site:

-   Use your project's default add-on as the theme.
    This option is practical when you want to have a single combined add-on for the exclusive use of your project and not reuse it for other projects.
-   Create a separate, reusable theme add-on.
    This option is practical when you want to reuse your theme add-on for multiple projects.

Both approaches use the same mechanics under the hood.
Pick the one that fits your needs, then follow the matching setup below.

The file {file}`volto.config.js` provides the ability to programmatically declare add-ons and the active theme.
See {ref}`volto-config-js` for more information.
For convenience, it can also be set via a `THEME` environment variable.

## Select the active theme

You can declare the active theme in one of three ways (first two are preferred):

1.  In the file {file}`volto.config.js` at the project root.

    ```js
    module.exports = {
      addons: [],
      theme: 'volto-my-theme'
    };
    ```

2.  Use the `THEME` environment variable when starting Volto.

    ```shell
    THEME='volto-my-theme' pnpm start
    ```

The value you provide must be the package name of the add-on that contains the theme.

```{tip}
If you are using your project’s default add-on as the theme, set `theme` to your default add-on’s package name.
```

## A) Use your default add-on as the theme

This approach is simplest for a single project: keep configuration, customizations, and theme together.

1) Ensure your default add-on is listed in `addons` (in {file}`volto.config.js` or {file}`package.json`).

2) Set `theme` to your default add-on’s package name (see examples above).

3) In your default add-on, create {file}`src/theme/theme.config` and set up the theme (example below). Place any overrides under {file}`src/theme`.

## B) Create a reusable theme add-on

This approach is best when you want to reuse the same theme across multiple projects.

1) Create a Volto add-on package to host your theme (for example, `volto-my-theme`).

2) In that add-on, create a directory {file}`src/theme` and a {file}`theme.config` file as shown below.

3) Declare the theme add-on in your project’s `addons` and set `theme` to the theme add-on’s package name.

## Semantic UI entry point

For both approaches, you should create the entry point files for your theme under {file}`src/theme`.

```text
src/
└── theme/
    └── extras/
      └── custom.overrides
      └── custom.less
```

Contents of {file}`src/theme/extras/custom.overrides`:

```less
@import 'custom.less';
/* No declarations beyond this point
place all your CSS in `custom.less` */
```

Contents of {file}`src/theme/extras/custom.less`:

```less
// Place your theme customizations CSS here
```

### Example `theme.config`

Create {file}`src/theme/theme.config` in the add-on that hosts the theme.
Replace `<name_of_your_theme>` with the add-on package name.

```{code-block} less
:emphasize-lines: 75
:caption: theme.config

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

After starting Volto, the theme should be active. Now you can add overrides to the default theme in {file}`src/theme` or directly your custom CSS in {file}`src/theme/extras/custom.less`.

## Using your own theming escape hatch

Volto theming uses Semantic UI theming capabilities to define and extend a theme for your site.
However, while maintaining and playing well with the Semantic UI Volto base, you can use a traditional CSS approach using the LESS preprocessor-based `extras` escape hatch.

At the same time, you can either discard or complement the `extras` escape hatch and add your own, by customizing the {file}`theme.js` module in Volto.

Customizing the base theme is a special use case in Volto.
The original file is in Volto at {file}`volto/src/theme.js`.
This is the file to be customized.
In the {file}`customizations` folder, override it as {file}`customizations/volto/@root/theme.js`, using the `@root` alias to avoid writing the full path.
Edit the imports in this file to align with the following code.

```js
import 'semantic-ui-less/semantic.less';
import '@plone/volto/../theme/themes/pastanaga/extras/extras.less';

// You can add more entry points for theming
// This example assumes you want to use SCSS as preprocessor
// and your main.scss is in the `src/theme` folder
import '../../theme/main.scss';
```

You may want to do this to create a completely new theming experience adapted to your way of doing things that do not match the current Volto theming experience.
For example, if you want to use another preprocessor in the theme, such as SCSS.
Or perhaps your client requires the base consist entirely of pre-made components based on another library beside Semantic UI.
See {ref}`volto-custom-theming-strategy` for an example of a custom theme escape hatch.

While building your own escape hatch for theming, you can use the preprocessor of your choice, while maintaining the "base" Volto theme, but customizing it using the resultant CSS.
If you prefer a CSS-variables-first approach for block styling, see the {ref}`block-style-wrapper-label` guide and use custom CSS properties to theme blocks consistently.

You can see an example of such a theme in [Volto Light Theme](https://github.com/kitconcept/volto-light-theme).

```{important}
Volto relies on Semantic UI for styling the {term}`Public UI` core components and the {term}`CMSUI`.
You can use your own theming escape hatch to customize the base theme, but you cannot completely discard Semantic UI.
```

## Advanced: Add support for your theme allow being extended by other add-ons

Sometimes you have a custom theme that you want to reuse through all your projects, but with some differences, maintaining the base.
Usually, the only option would be to use an add-on that adds more CSS to the base theme, using imports that will load after the theme.
However, there is a problem with this approach.
You cannot use existing theme variables, including breakpoints, on these new styles.
Similarly, it gets somewhat detached from the normal flow of the loaded theme.
The same applies for add-ons, as they are detached from the current theme.
You could use a Semantic UI approach for making this work, but then it's bound to Semantic UI.

```{warning}
This is only possible when using your own escape hatch, and works only with SCSS-based themes, and not with Semantic UI themes, since it enables a couple of entry points that only support SCSS files.
For an example of how it could be used, see [Volto Light Theme](https://github.com/kitconcept/volto-light-theme).
```

If your custom escape hatch defines a custom theme using SCSS, you can take advantage of this feature.
Although not limited to this, it would be possible to extend this feature to add more entry points, using another preprocessor or theming approach.

This feature enables two entry point files, {file}`_variables.scss` and {file}`_main.scss`.
From your add-on code, you can extend an existing theme by creating a file corresponding to each entry point:

-   {file}`./src/theme/_variables.scss`
-   {file}`./src/theme/_main.scss`


### Variables

You can use the entry point `addonsThemeCustomizationsVariables` to modify the original variables of the currently loaded theme by adding the entry point before the theme variable definitions.
In the theme, it should be imported as shown below.

```{code-block} scss
:emphasize-lines: 2

@import 'addonsThemeCustomizationsVariables';
@import 'variables';
@import 'typography';
@import 'utils';
@import 'layout';
```

````{warning}
Following SCSS best practices, your theme variables should be "overridable" using the `!default` flag.
This assigns a value to a variable _only_ if that variable isn't defined or its value is [`null`](https://sass-lang.com/documentation/values/null).
Otherwise, the existing value will be used.

```{seealso}
https://sass-lang.com/documentation/variables#default-values
```
````

Volto will not only load your add-on entry point files, but it will also detect all the add-ons that have these entry point files, and import them grouped under a single file.
It will also automatically add an `addonsThemeCustomizationsVariables` alias that you can reference from the theme as shown above.


### Main

You can use the entry point `addonsThemeCustomizationsMain` to add your own style definitions, complementing those in the theme.
You should add it after all the CSS of your theme:

```{code-block} scss
:emphasize-lines: 6

@import 'blocks/search';
@import 'blocks/listing';

@import 'temp';

@import 'addonsThemeCustomizationsMain';

/* No CSS beyond this point */
```

Volto will also detect all the add-ons that have these entry point files, and import them grouped under a single file.
It will also automatically add an `addonsThemeCustomizationsMain` alias that you can reference from the theme as shown above.

```{note}
These SCSS-based extension entry points work only when a theme is declared (in {file}`volto.config.js` or {file}`package.json`).
```

## Which approach should I choose?

- Single project, fast iteration: use your default add-on as the theme.
- Multiple projects, reuse required: create a separate theme add-on.
- Prefer modern, cascade-friendly styling at block level: use CSS custom properties with the {ref}`block-style-wrapper-label`.
