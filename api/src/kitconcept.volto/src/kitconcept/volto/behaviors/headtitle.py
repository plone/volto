# -*- coding: utf-8 -*-
from kitconcept.volto import _
from plone.autoform.interfaces import IFormFieldProvider
from plone.supermodel import model
from zope.interface import provider
from zope import schema


@provider(IFormFieldProvider)
class IHeadTitle(model.Schema):

    head_title = schema.TextLine(
        title=_("Header title"),
        required=False,
        description=_("Header title should consist of year and number of the report"),
    )
