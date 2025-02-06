# Yeoman Volto App Generator

@plone/generator-volto is a Yeoman generator that helps you to set up a Volto project via the command line.

## Installation

First, install [Yeoman](https://yeoman.io/) and @plone/generator-volto using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/en)).

```bash
npm install -g yo
npm install -g @plone/generator-volto
```

## Compatibility

See [`volto-generator` compatibility with Volto](https://6.docs.plone.org/volto/contributing/version-policy.html#volto-generator-compatibility-with-volto-label).

## Usage

### Create a new Volto project using `npm init`

```bash
npm init yo @plone/volto
```

This is the shortcut for using `npm init` command.
It uses Yeoman (`yo`) and `@plone/generator-volto`, and `npm` executes the commands without having the need for the packages to be installed globally.

Answer the prompts to complete the generation process.

### Creating a new Volto project

```bash
yo @plone/volto
```

This will bootstrap a new Volto project inside the current folder.
It will ask a few questions for the project name, project description, and a list of add-ons.

Run:

```console
$ yo @plone/volto --help
Usage:
  yo @plone/volto:app [<projectName>] [options]

Options:
  -h,   --help              # Print the generator's options and usage
        --skip-cache        # Do not remember prompt answers                                        Default: false
        --skip-install      # Do not automatically install dependencies                             Default: false
        --force-install     # Fail on install dependencies error                                    Default: false
        --ask-answered      # Show prompts for already configured options                           Default: false
        --volto             # Desired Volto version, if not provided, the most recent will be used
        --canary            # Desired Volto version should be a canary (alpha)                      Default: false
        --interactive       # Enable/disable interactive prompt                                     Default: true
        --skip-addons       # Don't ask for add-ons as part of the scaffolding
        --addon             # Add-on loader string. Example: some-volto-addon:loadExtra,loadOtherExtra
        --workspace         # Yarn workspace. Example: src/addons/some-volto-addon
        --description       # Project description
        --defaultAddonName  # The default add-on's name always added to the generated project       Default: volto-[<projectName>]

Arguments:
  projectName    Type: String  Required: false

```

to see a full list of options and arguments.

> [!NOTE]
> In addition to the Volto project, the generator creates a theme add-on inside `src/addons` with the default name of `volto-[<project-name>]`.
> You can provide a specific name for the theme add-on that is created on project generation like:
> ```shell
> yo @plone/volto --defaultAddonName="volto-project-theme"
> ```
> If you've used the example project name `myvoltoproject` inside `src/addons`, you will find the Volto theme add-on named `volto-project-theme` instead of the default generator name `volto-myvoltoproject`.

You can provide a specific Volto version like:

```bash
yo @plone/volto --volto=12.0.0-alpha.0
```

You can also pass a Volto branch or tag:

```shell
yo @plone/volto --volto=plone/volto#16.3.0
```

You can force to use the latest canary (alpha) Volto version like:

```bash
yo @plone/volto --canary
```

You can use it in full non-interactive mode by passing something like:

```bash
yo @plone/volto myvoltoproject --no-interactive
```

Or by skipping specific configuration options:

```bash
yo @plone/volto myvoltoproject --description "My Volto project" --skip-addons --skip-install --skip-workspaces
```

You can also specify add-ons to load, like:

```bash
yo @plone/volto myvoltoproject --description "My Volto project" --addon "volto-formbuilder:x,y" --addon "volto-slate:z,t"
```

Change the directory to your project to get started:

```bash
cd myvoltoproject
yarn
```

### Creating A Volto Add-on

```console
Usage:
  yo @plone/volto:addon [<addonName>] [options]

Options:
  -h,   --help           # Print the generator's options and usage
        --skip-cache     # Do not remember prompt answers                            Default: false
        --skip-install   # Do not automatically install dependencies                 Default: false
        --force-install  # Fail on install dependencies error                        Default: false
        --ask-answered   # Show prompts for already configured options               Default: false
        --interactive    # Enable/disable interactive prompt                         Default: true
        --template       # Use github repo template, e.g.: eea/volto-addon-template
        --outputpath     # Output path

Arguments:
  addonName  # Add-on name, e.g.: @plone-collective/volto-custom-block  Type: String  Required: false
```

### Enable an existing add-on as a theme add-on

If you want one of your add-ons to be a theme, you can run this template on top of your add-on.
Use the configuration option `outputpath` for the path of your add-on.
Assuming your add-on is located at `./testaddon` folder, you would issue the following shell command.

```shell
yo volto:addonTheme --outputpath testaddon
```

```console
Usage:
  yo volto:addonTheme [<addonName>] [options]

Options:
  -h,   --help           # Print the generator's options and usage
        --skip-cache     # Do not remember prompt answers               Default: false
        --skip-install   # Do not automatically install dependencies    Default: false
        --force-install  # Fail on install dependencies error           Default: false
        --ask-answered   # Show prompts for already configured options  Default: false
        --outputpath     # Output path

Arguments:
  addonName  # Add-on name, e.g.: @plone-collective/volto-custom-block  Type: String  Required: false
```

You can also run the command inside the add-on folder, without passing any option.

### Start Volto with `yarn start`

Start Volto with:

```bash
yarn start
```

This runs the project in development mode.
You can view your application at http://localhost:3000

The page will reload if you make edits.

Please note that you have to run a Plone backend as well.

E.g. with docker:

```shell
docker run -it --rm --name=plone -p 8080:8080 -e SITE=Plone -e PROFILES="" plone/plone-backend:6.0.8
```

Consult the [Plone frontend Volto documentation](https://6.docs.plone.org/volto/index.html) for further details.


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
