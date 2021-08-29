# -*- coding: utf-8 -*-
"""Init and utils."""
from zope.i18nmessageid import MessageFactory

import logging


PROJECTNAME = "kitconcept.volto"
_ = MessageFactory(PROJECTNAME)
logger = logging.getLogger(PROJECTNAME)
config = {}
