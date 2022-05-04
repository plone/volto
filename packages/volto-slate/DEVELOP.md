# volto-slate

## The fast way to develop this addon

1. Assuming everything is right about your development environment, make
   a clone of this repo, then:

    make

1. This will create a `project` folder with a bootstrapped Volto.

    cd volto-slate/project
    yarn start

Just change the code in your clone and it will automatically refresh Volto!

## Cypress tests

### Start backend

    cd volto-slate
    make start-docker-backend

### Start frontend

    make
    cd project
    yarn start

### Open cypress

    cd volto-slate
    yarn cypress:open

## Develop

Before starting make sure your development environment is properly set. See [Volto Developer Documentation](https://docs.voltocms.com/getting-started/install/)

1.  Make sure you have installed needed dev tools

        npm install -g yo @plone/generator-volto mrs-developer

1.  Create new volto app

        yo @plone/volto \
             my-dev-project \
             --addon volto-slate:asDefault \
             --workspace src/addons/volto-slate \
             --skip-install

        cd my-dev-project

1.  Add the following to `mrs.developer.json`:

        {
            "volto-slate": {
                "url": "https://github.com/eea/volto-slate.git",
                "package": "volto-slate",
                "branch": "develop",
                "path": "src"
            }
        }

1.  Install

        yarn develop
        yarn

1.  Start backend

        docker run -d --name plone -p 8080:8080 -e SITE=Plone -e PROFILES="profile-plone.restapi:blocks" plone

    ...wait for backend to setup and start - `Ready to handle requests`:

        docker logs -f plone

    ...you can also check http://localhost:8080/Plone

1.  Start frontend

        yarn start

1.  Go to http://localhost:3000

1. Login with **admin:admin**

1. Create a new **Page** and add a new **Text** block.

1.  Happy hacking!

        cd src/addons/volto-slate/
