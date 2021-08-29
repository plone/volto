# -*- coding: utf-8 -*-
from kitconcept.volto import _
from plone.autoform.interfaces import IFormFieldProvider
from plone.supermodel import model
from zope.interface import provider
from zope.schema import TextLine


@provider(IFormFieldProvider)
class INavTitle(model.Schema):

    nav_title = TextLine(title=_(u"Navigation title"), required=False)
