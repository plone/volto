# Installing Volto

Assuming we are installing in a (modern) MacOS machine.

## Install nvm (NodeJS manager)

1. Open a terminal console and type:

  touch ~/.bash_profile
  curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash

2. Close the terminal and open a new one or execute:

  source ~/.bash_profile

3. Test it:

  nvm version

4. Install latest NodeJS 10.x:

  nvm install 10.15.1
  nvm use 10.15.1

5. Test NodeJS:

  node -v

## Yarn

Install the node package manager.

1. Open a terminal and type:

  curl -o- -L https://yarnpkg.com/install.sh | bash

2. Test it, running:

  yarn -v

## Docker for Mac

Here are the detailed instructions:

  https://hub.docker.com/editions/community/docker-ce-desktop-mac

1. Download the .dmg from:

  https://download.docker.com/mac/stable/Docker.dmg

2. Install the package as any other Mac software, if required, follow
   instructions from:

  https://docs.docker.com/docker-for-mac/install/

3. Check that docker is installed correctly, open a new terminal and type:

    docker ps

  should not trigger an error.

## Install and run the ready to use Plone API Docker container

We need the backend for Volto running in our machine, so there's an image ready
for it published in the Docker Hub. You can run it right away by issuing:

  docker run --rm -it -p 8080:8080 kitconcept/plone.restapi:latest

from the command line.

## Install Volto

Use the `create-volto-app`.

1. Open a terminal and execute:

  npm -g i @plone/create-volto-app

2. Create a new Volto app using the recently added command, providing the name
   of the new app (folder) to be created.

  create-volto-app myvoltoapp

3. Change directory to the newly created folder `myvoltoapp` (or the one you've
   chosen). Then

  yarn start

Volto should compile and executed in development mode. Open a browser to take a
look at http://localhost:3000

## Compile the production build

In production enviroments, you can compile an static version of the app. The
app should be run in a node process (because of the server side rendering
part), but also have a client part that is provided and deployed by the server
side rendering process.

1. Compile the app using the command:

  yarn build

The resultant build is available in the `dist` folder. You can then use the
command:

  yarn start:prod

to run the node process with the production build. You can also run it
manually:

  NODE_ENV=production node build/server.js

Volto will be available in http://localhost:3000

