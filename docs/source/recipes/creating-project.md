# Creating a new Volto project

For using Volto for a project (i.e. use Volto as a library), You should use Volto's project generator `@plone/generator-volto`. It's a boilerplate generator based in Yeoman that will provide you with the basic files and folder structure to bootstrap a Volto site. In addition to bootstrapping standalone Volto projects, it can also bootstrap Volto addons.

1. Open a terminal and execute:
```console
$ npm install -g yo @plone/generator-volto
$ yo @plone/volto
```

2. Answer to the prompted questions and provide the name of the new app (folder) to be created. For the sake of this documentation, provide `myvoltoproject` as project name then.

!!! info
    You can run the generator with parameters to tailor your requirements.
    ```
    $ yo @plone/volto --help
    ```
    or take a look at the [README](https://github.com/plone/volto/blob/master/packages/generator-volto/README.md) for more information.


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
