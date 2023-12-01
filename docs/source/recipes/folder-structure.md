---
myst:
  html_meta:
    "description": "Volto is based on React, Redux, and React-Router and follows its convention of resource location."
    "property=og:description": "Volto is based on React, Redux, and React-Router and follows its convention of resource location."
    "property=og:title": "Folder structure"
    "keywords": "Volto, Plone, frontend, React, folder structure"
---

# Folder structure

Volto is based on React, {term}`Redux`, and React-Router. All of the
code is located in the `src` folder. The following convention for locating
resources is used.

## Actions

`actions` contains all the Redux actions for fetching all backend data like
content, users and external resources that are pulled into our app in general.

## Components

`components` contains all the views. This includes views for the management
interface and the theme.

## Config

In this folder all configuration is stored. All configuration can be overridden
in your theme package.

## Constants

The constants contain all constants including the action types.

## Helpers

`helpers` contains helper methods like for example url helpers.

## Reducers

All the reducers are located here.

## Theme

The `theme` folder lives in the root of the Volto boilerplate and by default
uses the *Pastanaga* Theme look and feel.

Inside you can find the `theme.config` file that is used to set the theme
general settings.

The site customizations also should be located inside this folder following
[SemanticUI folder naming](https://github.com/Semantic-Org/Semantic-UI/tree/master/src/themes/default).

 * assets
 * collections
 * elements
 * globals
 * modules
 * views

## Locales

The `locales` folder contains all the artifacts relating to the translations.
For more details how to translate individual strings, please refer to the [internationalization section](i18n.md).
