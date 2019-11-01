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
