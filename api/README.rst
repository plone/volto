API Backend
===================

This folder contains a basic Plone 5.2 backend setup to use with the Volto React frontend.

It requires Python 3.8 / Python 3.9 . The Makefile in this folder has a build command
which uses Python's venv module to create a new virtualenv, installs zc.buildout and
runs bin/buildout to set up a Plone backend. 

The Makefile is similar to the Volto backend configuration documentation you can find
at https://docs.voltocms.com/configuration/backend/

Do note that allthough this setup could work out of the box, on some OS'es and
configurations you might run into issues. You do need some experience with Python
development/setup and Plone development to solve these. One of the main sources of
'trouble' is that some Python modules (packages) are required that have bindings to
lower level libraries, like Pillow for image handling, Cryptography for ssl support
and some Zope server components to efficiently handle the object database and backend
requests. See below for more details.

If this is not your cup of tea, coffee or other beverage, *please use* the provided
Docker/container image setup instructions you can find in the main directory of this
repo or in the getting started documentation, as this avoids this complexity and
lets you focus first on the frontend, what Volto/Plone 6 is all about.

-> https://docs.voltocms.com/getting-started/install/

[ Also, if you cloned the Volto repository from GitHub just to create a Volto site,
please be aware you are using a development version that can be unstable, it is for
development *on* Volto, not for creating a Plone 6 website site *with* the Volto
React frontend.

Use the Yeoman generator as documented in the main README in the parent directory to
scaffold a Volto frontend setup that uses a released npm Volto package. You can still
copy this api directory as inspiration to start a lightweight 'local' backend. ]


API backend folder installation caveats
---------------------------------------

Most issues people have when building Plone 'from' source' by using zc.buildout at the 
moment are caused by building Python packages that provide bindings to C libraries that
are required for cryptography, image handling/scaling support and compression.

You can find more up to date details on installing these necessary libraries for linux
systems in the 'Mastering Plone' training at

-> https://training.plone.org/mastering-plone/installation.html#installing-plone-backend

For Windows you could try WSL (Windows subsystem for Linux) and for Mac OS X for example
Homebrew to install these necessary support libraries.

Work is being done to A) upgrade zc.buildout to use pip natively and not the outdated
setuptools/distutils packages and B) we want to support installing Plone just with the
dominant packaging installation solution: pip. This already works in an alpha version of
Plone 6, but zc.buildout also has scaffolding tools to create necessary config files and
these are not available yet. However, if you want to experiment, see the following post
on the most recent Plone 6 alpha release:

->  https://community.plone.org/t/plone-6-0-0a2-released
