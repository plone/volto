# Getting Started

## Installing Volto

Volto can be installed in any operating system assuming that this requirements
are met:

- [Node.js LTS (12.x)](https://nodejs.org/)
- [Python 3.7.x / 2.7.x](https://python.org/) or
- [Docker](https://www.docker.com/get-started) (if using the Plone/Guillotina
  docker images)

Depending on the OS that you are using some of the following might change, they
are assuming a MacOS/Linux machine:

## Install nvm (NodeJS version manager)

1. Open a terminal console and type:
```bash
$ touch ~/.bash_profile
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
```

2. Close the terminal and open a new one or execute:
```
$ source ~/.bash_profile
```

3. Test it:
```
$ nvm version
```

4. Install a LTS version of NodeJS:
```
$ nvm install 12.16.1
$ nvm use 12.16.1
```

5. Test NodeJS:
```
$ node -v
```

## Yarn (NodeJS package manager)

Install the classic version, not the 2.x one, of the popular node package manager.

1. Open a terminal and type:
```
$ curl -o- -L https://yarnpkg.com/install.sh | bash
```

2. Test it, running:
```
$ yarn -v
```

!!! tip Alternative methods
    You can install `yarn` using several approaches too, depending on the
    platform you are on. Take a look at the original `yarn`
    [documentation](https://classic.yarnpkg.com/lang/en/) for a list of them.

## Docker for Mac

In order to run the API backend, in a quick an easy and hassle way, it's recommended to start running it in a container.

Here are the detailed instructions:

    https://hub.docker.com/editions/community/docker-ce-desktop-mac

1. Download the .dmg from:

    https://download.docker.com/mac/stable/Docker.dmg

2. Install the package as any other Mac software, if required, follow
   instructions from:

    https://docs.docker.com/docker-for-mac/install/

3. Check that docker is installed correctly, open a new terminal and type:

```shell
$ docker ps
```

should not throw an error and show the current running containers.

## Get Plone ready for Volto

In order to fully support all Volto features, Plone needs to be prepared for Volto. This
involves configuration, add-ons installation and some patches to the core.

There's a package published called `kitconcept.volto` that does all the heavy lifting
for you and it's ready to use in your own projects.

!!! note
    However, this package is oppinionated and might not fit your needs, so if you
    want to use your own integration package instead, just take a look to the features
    it provides and extract the ones you need for your project and tailor your own
    integration package.

        https://github.com/kitconcept/kitconcept.volto

!!! tip
    From Volto 5.1 and above, Volto features an internal proxy to your API server. So
    you don't have to deal with CORS. It's enabled by default, pointing to the server
    specified in the `devProxyToApiPath` Volto settings (http://localhost:8080/Plone).
    See [here](../configuration/internalproxy.md) for more details.

### Run a Volto ready Plone Docker container

You can run an standard Plone docker container with the proper configuration using `kitconcept.volto` right away by issuing:

```shell
$ docker run -it --rm --name=plone -p 8080:8080 -e SITE=Plone -e ADDONS="kitconcept.volto" -e ZCML="kitconcept.volto.cors" -e PROFILES="kitconcept.volto:default-homepage" plone
```

## Install Volto

Use the `create-volto-app` helper utility.

1. Open a terminal and execute:
```
$ npm -g i @plone/create-volto-app
```

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

3. Change directory to the newly created folder `myvoltoapp` (or the one you've
   chosen). Then:
```
$ yarn start
```

This command will build an in-memory bundle and execute Volto in development mode. Open a browser to
take a look at http://localhost:3000

## Build the production bundle

In production environments, you should build an static version of your (Volto) app. The
app should be run in a node process (because of the server side rendering
part), but it also have a client part that is provided and deployed by the server
side rendering process.

1. Compile the app using the command:
```
$ yarn build
```
The resultant build is available in the `build` folder.

2. Run the Volto Nodejs process
```
$ yarn start:prod
```

to run the node process with the production build. You can also run it
manually:
```
$ NODE_ENV=production node build/server.js
```
Your production ready Volto will be available in http://localhost:3000
