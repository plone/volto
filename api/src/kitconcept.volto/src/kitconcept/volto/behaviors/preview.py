# -*- coding: utf-8 -*-
from kitconcept.volto import _
from plone.autoform.interfaces import IFormFieldProvider
from plone.namedfile import field as namedfile
from plone.supermodel import model
from zope.interface import provider
from zope.schema import TextLine


@provider(IFormFieldProvider)
class IPreview(model.Schema):

    preview_image = namedfile.NamedBlobImage(
        title=_(u"label_previewimage", default=u"Preview image"),
        description=u"",
        required=False,
    )

    preview_caption = TextLine(
        title=_(u"Preview image caption"),
        description=u"",
        required=False,
    )
