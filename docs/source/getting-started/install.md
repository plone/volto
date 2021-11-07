# Getting Started

## Installing Volto

Volto can be installed in any operating system assuming that this requirements
are met:

- [Node.js LTS (14.x)](https://nodejs.org/)
- [Python 3.7.x / 3.8.x](https://python.org/) or
- [Docker](https://www.docker.com/get-started) (if using the Plone/Guillotina
  docker images)

Depending on the OS that you are using some of the following might change, they
are assuming a MacOS/Linux machine:

## Install nvm (NodeJS version manager)

If you have a working nodejs development setup on your machine, this step is
not required. But it's a good idea to integrate nvm for development, as it
provides easy access to any Nodejs released version.

1. Open a terminal console and type:
```bash
touch ~/.bash_profile
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
```

2. Close the terminal and open a new one or execute:
```
source ~/.bash_profile
```

3. Test it:
```
nvm version
```

4. Install any active LTS version of NodeJS (https://nodejs.org/en/about/releases/):
```
nvm install 16
nvm use 16
```

5. Test NodeJS:
```
node -v
```

!!! note
    If you're using the fish shell, you can use [nvm.fish](https://github.com/jorgebucaran/nvm.fish)

!!! note
    Volto supports all currently active NodeJS LTS versions based on [NodeJS
    Releases page](https://nodejs.org/en/about/releases/). On 2021-04-30 Volto
    will not support Node 10 as it will reach its end of life.

## Yarn (NodeJS package manager)

Install the Yarn Classic version (not the 2.x one!), of the popular node package manager.

1. Open a terminal and type:
```
curl -o- -L https://yarnpkg.com/install.sh | bash
```

2. Test it, running:
```
yarn -v
```

!!! tip Alternative methods
    You can install `yarn` using several approaches too, depending on the
    platform you are on. Take a look at the original `yarn`
    [documentation](https://classic.yarnpkg.com/lang/en/) for a list of them.

## Use or Install Docker

In order to run the API backend, it's recommended to start run it in a container.
For this getting started section we assume you are either using Linux, or Mac. Most
modern Linux distributions have docker in their package manager available.

To install Docker desktop for Mac, here are the detailed instructions:

    https://hub.docker.com/editions/community/docker-ce-desktop-mac

1. Download the .dmg from:

    https://download.docker.com/mac/stable/Docker.dmg

2. Install the package as any other Mac software, if required, follow
   instructions from:

    https://docs.docker.com/docker-for-mac/install/

3. Check that docker is installed correctly, open a new terminal and type:

```shell
docker ps
```

should not throw an error and show the current running containers.

## Run a Volto ready Plone Docker container

When you have installed Docker, you can run an standard Plone Docker container with the proper configuration for Volto using the `plone.volto` add'on right away by issuing:

```shell
docker run -it --rm --name=plone \
  -p 8080:8080 -e SITE=Plone -e ADDONS="plone.volto" \
  -e ZCML="plone.volto.cors" \
  -e PROFILES="plone.volto:default-homepage" \
  plone
```

!!! note
    The example above does not persist yet any changes you make through Volto in
    the Plone docker container backend! For this you need to map the /data directory
    in the container properly. Check Docker
    [storage documentation](https://docs.docker.com/storage/) for more information.

    As a quick example: if you add
    `--mount type=bind,source="$(pwd)/plone-data",target=/data`
    to the previous example. The local subdirectory plone-data relative to where you
    execute `docker run` will be use to persist the backend server data.

If you are somewhat familiar with Python development, you can also install Plone locally
without using Docker. Check the [backend configuration](../configuration/backend.md) section.
It also has more information on plone.volto.


## Install Volto

Use the project generator helper utility.

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

3. Change directory to the newly created folder `myvoltoapp` (or the one you've chosen):
```
cd myvoltoapp
```

Then start Volto with:

```
yarn start
```

This command will build an in-memory bundle and execute Volto in development mode. Open a browser to
take a look at http://localhost:3000

!!! warning `@plone/create-volto-app` is deprecated
    It was deprecated from January 2021, in favor of [@plone/generator-volto](https://github.com/plone/generator-volto.git).

## Build the production bundle

In production environments, you should build an static version of your (Volto) app. The
app should be run in a node process (because of the server side rendering
part), but it also have a client part that is provided and deployed by the server
side rendering process.

1. Compile the app using the command:
```
yarn build
```
The resultant build is available in the `build` folder.

2. Run the Volto Nodejs process
```
yarn start:prod
```

to run the node process with the production build. You can also run it
manually:
```
NODE_ENV=production node build/server.js
```
Your production ready Volto will be available in http://localhost:3000
