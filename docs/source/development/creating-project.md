---
myst:
  html_meta:
    "description": "Creating a new Volto project"
    "property=og:description": "Creating a new Volto project"
    "property=og:title": "Creating a new Volto project"
    "keywords": "Volto, Plone, frontend, React, new, volto project, basic"
---

# Create a Volto project without a backend

This document shows how to create a Volto project with the frontend only when you have your own existing backend, such as Plone {term}`Classic UI`, {term}`Nick`, or {term}`Guillotina`.

```{seealso}
To create a full Plone project with both frontend and backend, see {doc}`plone:install/create-project` instead.

To contribute to Volto, see {doc}`../contributing/developing-core`.
```

For using Volto for a project—in other words, use Volto as a library—you should use Volto's project generator `@plone/generator-volto`.
It's a boilerplate project generator based on Yeoman that will provide you with the basic files and folder structure to bootstrap a Volto site.
In addition to bootstrapping stand-alone Volto projects, it can also bootstrap Volto add-ons.

1.  Open a terminal and execute:

    ```shell
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

2.  Answer the questions when prompted, and provide the name of the new app (folder) to be created.
    For the sake of this documentation, use `myvoltoproject` as the project name.

    ````{note}
    You can run the generator with parameters to tailor your requirements.

    ```shell
    yo @plone/volto --help
    ```

    ```{seealso}
    [`@plone/generator-volto` `README.md`](https://github.com/plone/volto/blob/main/packages/generator-volto/README.md).
    ```
    ````

3.  Change your working directory to the newly created folder `myvoltoproject` (or whatever name you entered).

    ```shell
    cd myvoltoproject
    ```

4.  `@plone/generator-volto` installed the dependencies for you.
    Start the project.

    ```shell
    yarn start
    ```

    This starts the development server, which compiles the project code, and when done, it serves the app at http://localhost:3000.
