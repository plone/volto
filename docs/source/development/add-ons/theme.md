---
myst:
  html_meta:
    "description": "How to create a Volto theme add-on"
    "property=og:description": "How to create a Volto theme add-on"
    "property=og:title": "Create a Volto theme add-on"
    "keywords": "Volto, Plone, Semantic UI, CSS, theme, add-on"
---

# Create a Volto theme add-on

You can create a Volto theme add-on, keeping it separate from your project files.
By making your Volto theme add-on pluggable, you can deploy the same theme in different projects.
You can even create themes that depend on conditions that you inject at build time.

The file {file}`volto.config.js` provides the ability to programmatically declare add-ons and the active theme.
See {ref}`volto-config-js` for more information.
For convenience, it can also be set via a `THEME` environment variable.

1.  In your {file}`volto.config.js` file at the root of your project, add a `theme` key with the value of your theme's name.

    ```js
    module.exports = {
      addons: [],
      theme: 'volto-my-theme'
    };
    ```

    Alternatively, you can add a `theme` key in your {file}`package.json` project.

    ```json
    "theme": "volto-my-theme"
    ```

    Or you can set the theme name through the `THEME` environment variable.

    ```shell
    THEME='volto-my-theme' pnpm start
    ```

2.  Create a directory {file}`src/theme` in your add-on.
    Inside that directory, create a new file {file}`theme.config`, adding the following content, but replacing `<name_of_your_theme>` with your add-on name.
    You can also copy the contents of Volto's core {file}`theme.config` file, copying it from {file}`core/packages/volto/theme/theme.config` to use as a starting point.

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

3.  Declare the theme as an add-on by adding its name to the value for the `addons` key in either {file}`volto.config.js` or {file}`package.json` in your project.

4.  After starting Volto, the theme should be active.
    Now you can add overrides to the default theme in {file}`src/theme`, the same as you would in a project.


## Using your own theming escape hatch

Volto theming uses Semantic UI theming capabilities to define and extend a theme for your site.
However, while maintaining and playing well with the Semantic UI Volto base, you can use a traditional CSS approach using the LESS preprocessor-based `extras` escape hatch.

At the same time, you can either discard or complement the `extras` escape hatch and add your own, by customizing the {file}`theme.js` module in Volto.

Customizing the base theme is a special use case in Volto.
The original file is in Volto at {file}`volto/src/theme.js`.
This is the file to be customized.
In the {file}`customizations` folder, override it as {file}`customizations/@root/theme.js`, using the `@root` alias to avoid writing the full path.
Add the following code to this file.

```js
import 'semantic-ui-less/semantic.less';
import '@plone/volto/../theme/themes/pastanaga/extras/extras.less';

// You can add more entry points for theming
import '@kitconcept/volto-light-theme/theme/main.scss';
```


You may want to do this to create a completely new theming experience adapted to your way of doing things that do not match the current Volto theming experience.
For example, if you want to use another preprocessor in the theme, such as SCSS.
Or perhaps your client requires the base consist entirely of pre-made components based on another library beside Semantic UI.
See {ref}`volto-custom-theming-strategy` for an example of a custom theme escape hatch.

While building your own escape hatch for theming, you can use the preprocessor of your choice, while maintaining the "base" Volto theme, but customizing it using the resultant CSS.

You can see an example of such a theme in [Volto Light Theme](https://github.com/kitconcept/volto-light-theme).


## Modify a custom theme from another add-on

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
It will only work in combination with the theme declaration in {file}`volto.config.js` or in {file}`package.json`.
```
