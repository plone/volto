from AccessControl.SecurityManagement import newSecurityManager
from plone_conference_website_2070.interfaces import IPloneConferenceWebsite2070Layer
from Products.CMFPlone.factory import _DEFAULT_PROFILE
from Products.CMFPlone.factory import addPloneSite
from Testing.makerequest import makerequest
from zope.interface import directlyProvidedBy
from zope.interface import directlyProvides

import os
import transaction


truthy = frozenset(("t", "true", "y", "yes", "on", "1"))


def asbool(s):
    """Return the boolean value ``True`` if the case-lowered value of string
    input ``s`` is a :term:`truthy string`. If ``s`` is already one of the
    boolean values ``True`` or ``False``, return it."""
    if s is None:
        return False
    if isinstance(s, bool):
        return s
    s = str(s).strip()
    return s.lower() in truthy


DELETE_EXISTING = asbool(os.getenv("DELETE_EXISTING"))

app = makerequest(app)  # noQA

request = app.REQUEST

ifaces = [
    IPloneConferenceWebsite2070Layer,
] + list(directlyProvidedBy(request))

directlyProvides(request, *ifaces)

admin = app.acl_users.getUserById("admin")
admin = admin.__of__(app.acl_users)
newSecurityManager(None, admin)

site_id = "Plone"
payload = {
    "title": "Plone Conference Website 2070",
    "profile_id": _DEFAULT_PROFILE,
    "extension_ids": [
        "plone_conference_website_2070:default",
        "plone_conference_website_2070:initial",
    ],
    "setup_content": False,
    "default_language": "en",
    "portal_timezone": "America/Sao_Paulo",
}

if site_id in app.objectIds() and DELETE_EXISTING:
    app.manage_delObjects([site_id])
    transaction.commit()
    app._p_jar.sync()

if site_id not in app.objectIds():
    site = addPloneSite(app, site_id, **payload)
    transaction.commit()
    app._p_jar.sync()
