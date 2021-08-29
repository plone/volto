.. This README is meant for consumption by humans and pypi. Pypi can render rst files so please do not use Sphinx features.
   If you want to learn more about writing documentation, please check out: http://docs.plone.org/about/documentation_styleguide.html
   This text does not appear on pypi or github. It is a comment.

==============================================================================
kitconcept.volto
==============================================================================

.. image:: https://kitconcept.com/logo.svg
   :alt: kitconcept
   :target: https://kitconcept.com/


.. image:: https://github.com/kitconcept/kitconcept.volto/workflows/Basic%20tests/badge.svg
    :target: https://github.com/kitconcept/kitconcept.volto/actions?query=workflow%3A%22Basic+tests%22

kitconcept.volto is a helper package to set up a Plone site to use with Volto. It
installs several convenience packages, Plone configurations and patches to prepare Plone
to be ready for support all the Volto features. Drop it in your buildout and then
install it. It is used in Volto development itself for testing it.

If you want, take it as base of your own integration package.

Usage
=====

https://github.com/plone/volto/blob/master/api/base.cfg#L13

and along with plonesite recipe:

https://github.com/plone/volto/blob/master/api/base.cfg#L13

Compatibility
=============

Volto requires specific versions of kitconcept.volto and plone.restapi:

+---------+------------------------+-----------------------+
|         |  kitconcept.volto      |  plone.restapi        |
+---------+------------------------+-----------------------+
|         |  1.x                   |  6.0.0 and below      |
+---------+------------------------+-----------------------+
|         |  2.x                   |  7.0.0 and above      |
+---------+------------------------+-----------------------+

plone.restapi 7.0.0 is included in Plone 5.3.4 (and later).

You can still use 2.x in p.restapi 7.0.0 based installations but the transforms included won't work. 
Volto only supports the latest plone.restapi branch, therefore it is recommended to always use the latest version in your Volto projects.

Features
========

kitconcept.volto provides the following features:

Demo home page and Plone site blocks support
--------------------------------------------

It features a hack to make the Plone site Volto blocks-enabled with some demo
content. You can take only the hack to enable the blocks on your site.

You can see it in action in the Volto demo: https://volto.kitconcept.com

Install the provided profile to install it by default:

  kitconcept.volto:default-homepage

e.g. in your GS ``metadata.xml`` along with your other dependencies::

  <metadata>
  <version>1000</version>
  <dependencies>
    <dependency>kitconcept.volto:default-homepage</dependency>
  </dependencies>
  </metadata>

Volto Blocks Support
--------------------

It enables the Volto Blocks behavior on the ``Document`` content type by default, enabling Volto editor for that content type.

Just use the same pattern to enable your own content types to have blocks.

Document content type
---------------------

``Richtext`` and ``table of contents`` behaviors has been removed from the ``Document`` behaviors since it's confusing for the users if they shows in the form. Both have been superseeded by blocks in the editor.

CORS profile
------------

A quick helper for enable CORS for development config is also provided in the
``kitconcept.volto`` module. So you can call::

  <include package="kitconcept.volto.cors" />

from your ZCML while developing.

Enable it on demand, since it's considered a security issue if you enable CORS in your
productions sites.

It's planned that Volto will feature a development pass-through proxy to the backend in
the future. It will be addressed in next sprints.

ZLog patch
----------

p.restapi low level errors are routed through the ancient ZLog and are ``plone_error``
enabled, making it difficult to follow since all are marked with a UUID. Specially if
using helpers like Sentry. This patch removes the UUID so the same error is categorized
all together. This is planned to be addressed in next sprints.

Patch fix for Plone ``subject`` field
-------------------------------------

There are some problems of serialization on special characters derivated from how the
current shape of the Plone's default Dexterity ``subjects`` field that has to be
addressed in order to make it work properly with Volto (and other systems that are not
Plone). This will be fixed in core in upcoming sprints.

Preview Image Behavior
----------------------

The preview image behavior makes content types provide a preview_image field that can store a preview image that Volto views can pick up.
This is especially userful for listings (e.g. listing block customizations) and teaser elements (e.g. teaser blocks such as [volto-blocks-grid](https://github.com/kitconcept/volto-blocks-grid)).

The "volto.preview_image behavior can be enabled in the generic setup XML definition of a content type (e.g. "/profiles/default/types/MyContentType.xml")::

   <?xml version="1.0" encoding="UTF-8" ?>
   <object i18n:domain="fzj.internet" meta_type="Dexterity FTI" name="MyContentType"
     xmlns:i18n="http://xml.zope.org/namespaces/i18n">

     ...

     <!-- Enabled behaviors -->
     <property name="behaviors" purge="false">
       ...
       <element value="volto.preview_image" />
     </property>
     ...
   </object>

Navigation Title Behavior
-------------------------

The navigation title makes content types provide a nav_title field that is used by Volto in the main navigation, the breadcrumbs and the navigation portlet.

The "volto.navtitle behavior can be enabled in the generic setup XML definition of a content type (e.g. "/profiles/default/types/MyContentType.xml")::

   <?xml version="1.0" encoding="UTF-8" ?>
   <object i18n:domain="fzj.internet" meta_type="Dexterity FTI" name="MyContentType"
     xmlns:i18n="http://xml.zope.org/namespaces/i18n">

     ...

     <!-- Enabled behaviors -->
     <property name="behaviors" purge="false">
       ...
       <element value="volto.navtitle" />
     </property>
     ...
   </object>

Head Title Behavior
-------------------

The headtitle makes content types provide a headtitle field that can be used by Volto in teasers and alikes.

The "volto.head_title" behavior can be enabled in the generic setup XML definition of a content type (e.g. "/profiles/default/types/MyContentType.xml")::

   <?xml version="1.0" encoding="UTF-8" ?>
   <object i18n:domain="fzj.internet" meta_type="Dexterity FTI" name="MyContentType"
     xmlns:i18n="http://xml.zope.org/namespaces/i18n">

     ...

     <!-- Enabled behaviors -->
     <property name="behaviors" purge="false">
       ...
       <element value="volto.head_title" />
     </property>
     ...
   </object>

Volto blocks enabled LRF
------------------------

Multilingual support for LRF (Language Root Folders) is supported. Install PAM before
installing this package and demo homepages will be created in each enabled language.
Currently only support for EN/DE.

Image Scales
------------

This package introduces new Plone image scales in Plone and redefines a couple of
existing ones. These are know to work well with Volto layout and grid system::

    icon 32:32
    tile 64:64
    thumb 128:128
    mini 200:65536
    preview 400:65536
    teaser 600:65536
    large 800:65536
    larger 1000:65536
    great 1200:65536
    huge 1600:65536

**This change is opinionated and may collide with your previously defined ones, so make
sure your add-on's profiles are applied AFTER this one.**

Versions compatibility
----------------------

kitconcept.voltodemo is deprecated in favor of this package as of since March, 5th 2020.
