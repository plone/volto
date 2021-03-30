# Yeoman Volto App Generator

@plone/generator-volto is a Yeoman generator that helps you to set up Volto via command line.

## Installation

First, install [Yeoman](http://yeoman.io) and @plone/generator-volto using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```
$ npm install -g yo
$ npm install -g @plone/generator-volto
```

## Usage

### Creating a new Volto project using `npm init`
```
npm init yo @plone/volto
```

This is the shortcut for using `npm init` command. It uses Yeoman (`yo`) and `@plone/generator-volto` and execute them without having to be installed globally.

Answer the prompt questions to complete the generation process.

### Creating a new Volto project
```
$ yo @plone/volto
```

This will bootstrap a new Volto project inside the current folder. It will ask
a few questions: project name, project description and a list of addons. Run:

```console
$ yo @plone/volto --help
Usage:
  yo @plone/volto:app [<projectName>] [options]

Options:
  -h,   --help             # Print the generator's options and usage
        --skip-cache       # Do not remember prompt answers                                        Default: false
        --skip-install     # Do not automatically install dependencies                             Default: false
        --interactive      # Enable/disable interactive prompt                                     Default: true
        --skip-addons      # Don't ask for addons as part of the scaffolding
        --addon            # Addon loader string, like: some-volto-addon:loadExtra,loadOtherExtra
        --skip-workspaces  # Don't ask for workspaces as part of the scaffolding
        --workspace        # Yarn workspace, like: src/addons/some-volto-addon
        --description      # Project description

Arguments:
  projectName    Type: String  Required: false

```

to see a full list of options and arguments.

You can provide an specific Volto version like:

```
yo @plone/volto --volto=12.0.0-alpha.0
```

You can use it in full non-interactive mode by passing something like:

```
yo @plone/volto myvoltoproject --no-interactive
```

Or by skipping specific configuration:

```
yo @plone/volto myvoltoproject --description "My Volto project" --skip-addons --skip-install --skip-workspaces
```

You can also specify addons to load, like:

```
yo @plone/volto myvoltoproject --description "My Volto project" --addon "volto-formbuilder:x,y" --addon "volto-slate:z,t"
```

Change the directory to your project to get started:

```
$ cd myvoltoproject
$ yarn
```

### Creating A Volto Add-on

```console
Usage:
  yo @plone/volto:addon [<addonName>] [options]

Options:
  -h,   --help          # Print the generator's options and usage
        --skip-cache    # Do not remember prompt answers             Default: false
        --skip-install  # Do not automatically install dependencies  Default: false
        --interactive   # Enable/disable interactive prompt          Default: true

Arguments:
  addonName  # Addon name, e.g.: @corp/volto-custom-block  Type: String  Required: false

```

### Start Volto with `yarn start`

Start Volto with:

```
$ yarn start
```

This runs the project in development mode.
You can view your application at http://localhost:3000

The page will reload if you make edits.

Please note that you have to run a Plone backend as well.

E.g. with docker:

```
$ docker run -it --rm --name=plone -p 8080:8080 -e SITE=Plone -e ADDONS="kitconcept.volto" -e ZCML="kitconcept.volto.cors" -e PROFILES="kitconcept.volto:default-homepage" plone
```

Consult the Volto docs for further details:

https://www.npmjs.com/package/@plone/volto

### Build a production build with `yarn build`

Builds the app for production to the build folder.

The build is minified and the filenames include the hashes. Your app is ready to be deployed!

### Start the production build with `yarn start:prod`

Runs the compiled app in production.

You can again view your application at http://localhost:3000

### Run unit tests with `yarn test`

Runs the test watcher (Jest) in an interactive mode. By default, runs tests related to files changed since the last commit.

### Update translations with `yarn i18n`

Runs the test i18n runner which extracts all the translation strings and generates the needed files.
