.. image:: https://travis-ci.org/kitconcept/buildout.svg?branch=master
    :target: https://travis-ci.org/kitconcept/buildout

kitconcept Buildout
===================

Basic Buildout setup with the kitconcept best practices.

Getting started
---------------

Fetch Makefile::

    wget -O Makefile https://raw.githubusercontent.com/kitconcept/buildout/master/Makefile

Update Buildout files::

    make update

This will automatically update the following files in your local folder:

- Makefile
- requirements.txt
- plone-4.3.x.cfg
- plone-5.0.x.cfg
- plone-5.1.x.cfg
- plone-5.2.x.cfg
- versions.cfg

kitconcept Buildout expects a base.cfg configuration to be present in your buildout that contains your customizations and contains the following parts (replace collective.embeddedpage with your add-on)::

    [buildout]
    index = https://pypi.org/simple
    show-picked-versions = true
    extensions = mr.developer
    parts =
        instance
    develop = .
    versions = versions

    [instance]
    recipe = plone.recipe.zope2instance
    user = admin:admin
    http-address = 8080
    eggs =
        Plone
        Pillow
        collective.embeddedpage [test]

    [versions]
    # Don't use a released version of collective.embeddedpage
    collective.embeddedpage =

    # setuptools / buildout
    setuptools =
    zc.buildout =
    zc.recipe.egg = 2.0.3


Make Commands
-------------

Available make commands:

- Update Makefile and Buildout: make update
- Build Plone 4.3.x: make build-plone-4.3
- Build Plone 5.0.x: make build-plone-5.0
- Build Plone 5.1.x: make build-plone-5.1
- Build Plone 5.2.x: make build-plone-5.2
- Build Plone 5.2.x with Python 3: make build-py3
