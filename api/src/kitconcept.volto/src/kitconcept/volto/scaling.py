# -*- coding: utf-8 -*-
from Acquisition import aq_base
from plone.namedfile.file import FILECHUNK_CLASSES
from plone.scale.interfaces import IImageScaleFactory
from plone.scale.interfaces import IScaledImageQuality
from plone.scale.scale import scaleImage
from ZODB.POSException import ConflictError
from zope.component import queryUtility
from zope.interface import implementer

import logging


logger = logging.getLogger(__name__)
_marker = object()


@implementer(IImageScaleFactory)
class VoltoImageScalingFactory(object):
    def __init__(self, context):
        self.context = context

    def get_quality(self):
        """Get plone.app.imaging's quality setting"""
        getScaledImageQuality = queryUtility(IScaledImageQuality)
        if getScaledImageQuality is None:
            return None
        return getScaledImageQuality()

    def create_scale(self, data, direction, height, width, **parameters):
        return scaleImage(
            data, direction=direction, height=height, width=width, **parameters
        )

    def __call__(
        self,
        fieldname=None,
        direction="thumbnail",
        height=None,
        width=None,
        scale=None,
        **parameters
    ):

        """Factory for image scales`."""
        orig_value = getattr(self.context, fieldname, None)
        if orig_value is None:
            return

        if height is None and width is None:
            dummy, format_ = orig_value.contentType.split("/", 1)
            return None, format_, (orig_value._width, orig_value._height)
        orig_data = None
        try:
            orig_data = orig_value.open()
        except AttributeError:
            orig_data = getattr(aq_base(orig_value), "data", orig_value)
        if not orig_data:
            return

        # Handle cases where large image data is stored in FileChunks instead
        # of plain string
        if isinstance(orig_data, tuple(FILECHUNK_CLASSES)):
            # Convert data to 8-bit string
            # (FileChunk does not provide read() access)
            orig_data = str(orig_data)

        # If quality wasn't in the parameters, try the site's default scaling
        # quality if it exists.
        if "quality" not in parameters:
            quality = self.get_quality()
            if quality:
                parameters["quality"] = quality

        if not getattr(orig_value, "contentType", "") == "image/svg+xml":
            try:
                result = self.create_scale(
                    orig_data,
                    direction=direction,
                    height=height,
                    width=width,
                    **parameters
                )
            except (ConflictError, KeyboardInterrupt):
                raise
            except Exception:
                logger.exception(
                    'Could not scale "{0!r}" of {1!r}'.format(
                        orig_value, self.context.absolute_url()
                    )
                )
                return
            if result is None:
                return
        else:
            result = orig_data.read(), "svg+xml", (width, height)

        data, format_, dimensions = result
        mimetype = "image/{0}".format(format_.lower())
        value = orig_value.__class__(
            data, contentType=mimetype, filename=orig_value.filename
        )
        value.fieldname = fieldname
        return value, format_, dimensions
