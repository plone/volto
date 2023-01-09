---
myst:
  html_meta:
    "description": "Creating a new Volto project"
    "property=og:description": "Creating a new Volto project"
    "property=og:title": "Creating a new Volto project"
    "keywords": "Volto, Plone, frontend, React, new, volto project, basic"
---

# Creating a new Volto project

For using Volto for a project—in other words, use Volto as a library—you should use Volto's project generator `@plone/generator-volto`.
It's a boilerplate generator based in Yeoman that will provide you with the basic files and folder structure to bootstrap a Volto site.
In addition to bootstrapping stand-alone Volto projects, it can also bootstrap Volto add-ons.

1.  Open a terminal and execute:

    ```bash
    npm install -g yo @plone/generator-volto
    # Install the latest and stable release of Volto with the following command
    yo @plone/volto
    # or you can install the "canary" release, including any alpha release
    yo @plone/volto --canary
    # or you can install any specific released version
    yo @plone/volto --volto=15.0.0
    # you can even pass a GitHub repo and specific branch
    yo @plone/volto --volto=plone/volto#16.0.0
    # you can bootstrap with add-ons
    yo @plone/volto --addon=volto-form-block
    ```

2.  Answer the questions when prompted, and provide the name of the new app (folder) to be created. For the sake of this documentation, provide `myvoltoproject` as the project name then.

    ````{note}
    You can run the generator with parameters to tailor your requirements.

    ```shell
    yo @plone/volto --help
    ```

    or take a look at the [README](https://github.com/plone/volto/blob/master/packages/generator-volto/README.md) for more information.
    ````

3.  Change directory to the newly created folder `myvoltoapp` (or the one you've chosen).

    ```shell
    cd myvoltoapp
    ```

4.  The project is ready to be started, `@plone/generator-volto` already has run the dependencies installations for you.

    ```shell
    yarn start
    ```

    will start the development server, compiling and leaving the app ready at:
    http://localhost:3000
