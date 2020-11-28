# Backend configuration

## kitconcept.volto
In order to fully support all Volto features, the Plone backend, needs to be prepared for
Volto. This involves configuration, add-ons installation and some patches to the core.
The add'on `kitconcept.volto` does all the heavy lifting for you and it's ready to use
in your own projects. We used it in our Getting Started section. 

However, this package is oppinionated and might not fit your needs, so if you want to
use your own integration package instead, just take a look at the features it provides,
copy the ones you need for your project and create your own integration package.

https://github.com/kitconcept/kitconcept.volto

!!! tip
    From Volto 5.1 and above, Volto features an internal proxy to your API server. So
    you don't have to deal with CORS. It's enabled by default, pointing to the server
    specified in the `devProxyToApiPath` Volto settings (http://localhost:8080/Plone).
    See [here](../configuration/internalproxy.md) for more details.

## Install a Plone backend locally without Docker

If you have some experience with Python development, you can also install a Plone backend
from source. The Volto source repository contains an example Plone backend configuration
using zc.buildout. 

    https://github.com/plone/volto/tree/master/api

From this folder you only need to copy the `buildout.cfg` and `requirements.txt` files to
a folder on your development system. As with the Docker container setup of Plone, setting
up the backend works fully independent of the frontend.

You also need a working python3.8 environment (at the time of writing the newest supported
Python 3 version).

In a nutshell, cd to the directory where you have stored the two config files, and install
Plone locally on your system. 

```shell
   > cd <backend dir>
   > ls
     buildout.cfg  requirements.txt

   > python3.8 -mvenv .
   > bin/pip install -r requirements.txt
   > bin/buildout -c buildout.cfg
   > bin/instance fg
```

These steps will:

* Install a Python3.8 virtualenv using the built-in `venv` module
* Install zc.buildout and setuptools using `pip`. 
* Run buildout to install the Plone backend server
* Start the Plone backend server in the foreground (fg). 

With this setup, any changes you make in your site will be persisted on filesystem
in the Plone Database directories.

* <backend dir>/var/filestorage and
* <backend dir>/var/blobstorage

As long as you backup these directories and your `buildout.cfg/requirements.txt`, you
can rebuild/recreate your backend service on any machine. 