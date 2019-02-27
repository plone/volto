# Semantic Theming

As we hinted previously, Semantic UI theming happens in several stages using several layers of inheritance, let's discover each of these layers.

## Default definitions

Semantic UI defines the default definitions in [LESS
files](https://github.com/Semantic-Org/Semantic-UI/tree/master/src/definitions)
making a strong breakdown into components, organized in these categories:

 * globals
 * elements
 * modules
 * views
 * collections
 * behaviors

Each category holds a bunch of LESS files, each representing an item from the category.

The default definitions are the base for the themes. It is expected that you don't have to modify these definitions in any case. All the customization happens in the next layers.

## Themes

The Semantic UI themes are modifications on the default definitions that get loaded after them. Using LESS variables and LESS overrides they modify the defaults in a first customization layer. There are several [community driven themes that you can use right away](https://github.com/Semantic-Org/Semantic-UI/tree/master/src/themes).

## Site Theme

The Site theme is another layer of possible customization that Semantic UI allows you to have. Let's say you have a theme, but you have a project that will require some modifications over that theme.

This will be the most common use as in Plone we will use Pastanaga UI theme and we would only want to customize some of it for some project. We can even switch to another existing theme and use a site theme on the top of it (or only use a theme per project). Semantic UI theming engine allows that kind of flexibility.

## How does the theming engine work?

 uses heavily the LESS precompiler language features. No code is involved (which is good).

### theme.config

[theme.config](https://github.com/Semantic-Org/Semantic-UI/blob/master/src/theme.config.example) is where we define which theme we use. We can decide the theme of each of the Semantic UI components. Yes, you read well... The Semantic UI theming engine provides not only global theming but per component.

```less
  /* Global */
  @site       : 'default';
  @reset      : 'default';

  /* Elements */
  @button     : 'default';
  @container  : 'default';
  @divider    : 'default';
  @flag       : 'default';
  @header     : 'default';
  @icon       : 'default';
  @image      : 'default';
  // [...]

  /* Collections */
  @breadcrumb : 'default';
  @form       : 'default';
  @grid       : 'default';
  @menu       : 'default';
  @message    : 'default';
  @table      : 'default';

  /* Modules */
  @accordion  : 'default';
  @checkbox   : 'default';
  @dimmer     : 'default';
  @dropdown   : 'default';
  @embed      : 'default';
  // [...]


  /* Views */
  @ad         : 'default';
  @card       : 'default';
  @comment    : 'default';
  // [...]

```


### semantic.less

Semantic UI has uses a single Less file as entry point: [semantic.less](https://github.com/Semantic-Org/Semantic-UI/tree/master/src/themes) this is the root Less file and pulls all the components that we want to compile. We have to import this file either from the `node_modules` semantic-ui-less module directory or make a local copy of it locally. More on this later.

### theme.less

[theme.less](https://github.com/Semantic-Org/Semantic-UI/blob/master/src/theme.less) does all the Semantic UI theming magic. It controls all the Semantic UI workflow that each component has to comply with. It loads all the files inheritance in the correct order and applies it properly.
