# Creating a new Volto project

For using Volto for a project (i.e. use Volto as a library), You should use Volto's project generator `@plone/generator-volto`. It's a boilerplate generator based in Yeoman that will provide you with the basic files and folder structure to bootstrap a Volto site. In addition to bootstrapping standalone Volto projects, it can also bootstrap Volto addons.

1. Open a terminal and execute:
```
npm init yo @plone/volto
```

2. Answer to the prompted questions and provide the name of the new app (folder) to be created. For the sake of this documentation, provide `myvoltoproject` as project name then.

!!! info
    This is the shortcut for using `npm init` command. It uses Yeoman (`yo`) and `@plone/generator-volto` and execute them without having to be installed globally. However, more advanced options for the generator are available, but you'll have to install it and run it without `npm init`:

    ```console
    $ npm install -g yo
    $ npm install -g @plone/generator-volto
    $ yo @plone/volto --help
    ```
    take a look at the full [README](https://github.com/plone/volto/blob/master/packages/generator-volto/README.md) for more information.

3. Change directory to the newly created folder `myvoltoapp` (or the one you've chosen).
```
$ cd myvoltoapp
```

4. The project is ready to be started, `@plone/generator-volto` already has run the
   dependencies installations for you.
```
$ yarn start
```
will start the development server, compiling and leaving the app ready at:
http://localhost:3000
