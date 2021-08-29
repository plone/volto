"""
bin/instance -O Plone run scripts/clearrebuild.py
"""
from plone import api

import transaction


catalog = api.portal.get_tool("portal_catalog")
catalog.clearFindAndRebuild()

transaction.commit()
