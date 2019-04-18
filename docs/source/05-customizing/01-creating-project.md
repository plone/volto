# Creating a new Volto project

For using Volto for a project (i.e. use Volto as a library), You should use the
`create-volto-app` command. It's a boilerplate generator that will provide you with 
the basic files and folder structure to bootstrap a Volto site.

1. Open a terminal and execute:
```
$ npm -g i @plone/create-volto-app
```

!!! warning
    It's not recommended to use yarn for installing `create-volto-app`, use npm instead.

!!! tip Installing it using npx
    Optionally, you can also use `npx` utility to install `create-volto-app`
    without having to install it globally. On the other hand, in order to do it, you
    have to install `npx` globally. The advantage is that you don't have to
    upgrade `create-volto-app` each time you want to use it, because `npx` does
    it for you:

    `npx @plone/create-volto-app myvoltoapp`

2. Create a new Volto app using the recently added command, providing the name
   of the new app (folder) to be created.
```
$ create-volto-app myvoltoapp
```

3. Change the directory to `myvoltoapp`.
```
$ cd myvoltoapp
```

4. The project is ready to be started, `create-volto-app` already has run the
   dependencies installations for you.
```
$ yarn start
```
will start the development server, compiling and leaving the app ready at:
http://localhost:3000
