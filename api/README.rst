API Backend
===================

This folder contains a basic Plone backend setup to use with the Volto React frontend.

It requires Python 3.8 / Python3.9, the Makefile in this folder has a build command which
uses Python's venv module to create a new virtualenv, installs buildout and runs buildout
to set up a Plone backend. 

The Makefile is similar to the Volto backend configuration documentation you can find
at https://docs.voltocms.com/configuration/backend/

Do note that allthough this setup should work out of the box, on some OS'es and
configurations you might run into issues. You do need some experience with Python
development/setup to solve these. One of the main sources of 'trouble' is that some
python modules (packages) are required that have bindings to lower level libraries, 
like Pillow, Cryptography and some Zope server components.  

If this is not your cup of tea or coffee, please use the provided docker/container image
setup you can find in the main directory of this repo or in the getting started 
documentation, as this avoids this complexity and lets you focus first on the frontend.

-> https://docs.voltocms.com/getting-started/install/


API backend installation caveats
--------------------------------

Most issues people have when building Plone 'from' source' by using buildout at the 
moment are caused by compiling python bindings to C libraires that are required for
cryptography, image handling support and compression. And the biggest culprit is
Apple's new M1 hardware that came out at the end of 2020 if you are using a Mac.

This is not a detailed instruction on the how or why, but the easiest way to get
results in this situation is to install the Cryptography and Pillow packages in your
virtualenv using pip *BEFORE* you run buildout.  Also  make sure to match/unset the
version of the package in your buildout.cfg.  

Pip will download and install the already compiled binary (wheel) version of the
package into your virtualenv and buildout will then just use this version and not
try to also download and install it.

This is a temporary situation as work is being done to A) upgrade buildout to use
pip natively and not the outdated setuptools/distutils packages and B) we want
to support installing Plone just with pip, without buildout. This already works in
an alpha version of Plone 6, but buildout also has scaffolding tools and these are not 
available yet. 

For more info see https://communitay.plone.org/t/plone-6-0-0a1-released/14431
