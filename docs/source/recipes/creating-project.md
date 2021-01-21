# Creating a new Volto project

For using Volto for a project (i.e. use Volto as a library), You should use Volto's project generator `@plone/generator-volto`. It's a boilerplate generator based in Yeoman that will provide you with the basic files and folder structure to bootstrap a Volto site. In addition to bootstrapping standalone Volto projects, it can also bootstrap Volto addons.

1. Open a terminal and execute:

```
$ npm install -g yo
$ npm install -g @plone/generator-volto
```

!!! warning
It's not recommended to use yarn for installing the generator, use npm instead.

!!! tip Installing it using npx
Optionally, you can also use `npx` utility to install `@plone/generator-volto` without having to install it globally. On the other hand, in order to do it, you have to install `npx` globally. The advantage is that you don't have to upgrade `@plone/generator-volto` each time you want to use it, because `npx` does it for you:

    `npx @plone/generator-volto myvoltoapp`

    or use the [create-yo](https://boneskull.com/create-yo/) package

    `npm init yo @plone/volto`

2. Create a new Volto app using the recently added command, providing the name
   of the new app (folder) to be created.

```
$ yo @plone/volto
```

3. Change the directory to `myvoltoapp`.

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
