from DateTime import DateTime
from dateutil.parser import parse
from plone import api
from plone.app.dexterity.behaviors import constrains
from plone.namedfile.file import NamedBlobImage
from Products.CMFPlone.interfaces.constrains import ISelectableConstrainTypes

import json
import os


TO_DELETE = ("front-page", "news", "events", "Members")

__location__ = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))


def delete_content(portal):
    """Delete default content."""
    o_ids = [o_id for o_id in TO_DELETE if o_id in portal.objectIds()]
    for o_id in o_ids:
        api.content.delete(obj=portal[o_id])


def _get_image(image: str) -> NamedBlobImage:
    filepath = os.path.join(__location__, f"{image}")
    with open(filepath, "rb") as f_in:
        data = f_in.read()
    return NamedBlobImage(data)


def date_from_string(value: str) -> DateTime:
    return DateTime(parse(value))


def _create_content(portal, item: dict, creators: list):
    """Create a content."""
    container = portal.restrictedTraverse(item.get("_parent"))
    o_id = item["id"]

    if o_id in container.objectIds():
        return container[o_id]

    item["creators"] = creators
    permissions = item.get("_permissions", {})
    allowed_types = item.get("_allowed_types", [])
    transitions = item.get("_transitions", [])
    attributes = item.get("_attributes", {})
    payload = {k: v for k, v in item.items() if not k.startswith("_")}
    payload["container"] = container
    image_path = item.get("_image", None)
    if image_path:
        payload["image"] = _get_image(image_path)
    date_keys = [k for k in payload.keys() if k.endswith("_date")]
    for key in date_keys:
        payload[key] = date_from_string(payload[key])

    modified = payload.get("modification_date", None)
    content = api.content.create(**payload)
    # Apply attributes
    if attributes:
        for key, value in attributes.items():
            setattr(content, key, value)
    for transition in transitions:
        api.content.transition(obj=content, transition=transition)
    # Set permissions
    for permission_id, roles in permissions.items():
        content.manage_permission(permission_id, roles=roles)
    if allowed_types:
        behavior = ISelectableConstrainTypes(content)
        behavior.setConstrainTypesMode(constrains.ENABLED)
        behavior.setImmediatelyAddableTypes(allowed_types)
    if modified:
        content.modification_date = modified
        content.reindexObject(idxs=["modified"])
    return content


def populate_portal(portal, creators):
    """Create content structure."""
    with open(os.path.join(__location__, "contents.json"), "r") as f_in:
        contents = json.load(f_in)

    # Contents are created by Editors
    with api.env.adopt_roles(["Editor", "Manager"]):
        for item in contents:
            _create_content(portal, item, creators)

    # Update workflow security
    wf_tool = api.portal.get_tool("portal_workflow")
    wf_tool.updateRoleMappings()


def _update_home(portal, item: dict):
    """Update front page."""
    for key, value in item.items():
        setattr(portal, key, value)
    return portal


def update_home(portal, creators):
    """Create content structure."""
    with open(os.path.join(__location__, "home.json"), "r") as f_in:
        content = json.load(f_in)

    # Contents are created by Editors
    with api.env.adopt_roles(["Editor", "Manager"]):
        _update_home(portal, content)
