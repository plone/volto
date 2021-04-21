## How to develop/test the generator

### Setup

    git clone https://github.com/plone/volto.git
    cd volto/packages/generator-volto
    yarn
    npm link

### Generate new project

    yo @plone/volto my-volto-project --skip-install
    cd my-volto-project

### Generate new add-on based on remote template

    yo @plone/volto:addon @eeacms/volto-foo-bar
    cd src/addons/volto-foo-bar
