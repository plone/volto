# Folder structure

Volto is based on React, Redux and React-Router. All the
code is located in the `src` folder. The following convention for locating
resources is used.

## Actions

`actions` contains all the redux actions for fetching all backend data like
content, users and external resources that are pulled into our app in general.

## Components

`components` contains all the views. This includes views for the manage
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
