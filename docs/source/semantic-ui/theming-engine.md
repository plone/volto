# How does the theming engine work?

It basically uses heavily the LESS precompiler language features. No code is involved (which is good).

## theme.config

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

## semantic.less

Semantic UI has uses a single LESS file as entry point: [semantic.less](https://github.com/Semantic-Org/Semantic-UI/tree/master/src/themes) this is the root LESS file and pulls all the components that we want to compile. We have to import this file either from the `node_modules` semantic-ui-less module directory or make a local copy of it locally. More on this later.

## theme.less

[theme.less](https://github.com/Semantic-Org/Semantic-UI/blob/master/src/theme.less) does all the Semantic UI theming magic. It controls all the Semantic UI workflow that each component has to comply with. It loads all the files inheritance in the correct order and applies it properly.
