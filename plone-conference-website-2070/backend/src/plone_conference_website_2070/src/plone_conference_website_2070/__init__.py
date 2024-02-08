"""Init and utils."""
from zope.i18nmessageid import MessageFactory

import logging


PACKAGE_NAME = "plone_conference_website_2070"

_ = MessageFactory("plone_conference_website_2070")

logger = logging.getLogger("plone_conference_website_2070")
