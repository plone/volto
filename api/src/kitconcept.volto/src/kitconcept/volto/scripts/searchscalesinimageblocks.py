"""
time bin/instance -O Plone run scripts/blocksremoveserver.py oldservername newservername
    This script search and replace old server name (pre-production)
    for a new one. It searches in all good known places

    newservername can be empty to remove the server name
"""

from plone import api
from plone.restapi.behaviors import IBlocks
from copy import deepcopy

import os
import sys
import transaction

PATH = "/Plone"

# Make other scripts in this folder available
sys.path.append(os.path.abspath(os.path.join("..", "api")))
try:
    from . import utils  # noqa
except ImportError:
    from scripts import utils  # noqa


def remove_image_scales(blocks):
    blocks = deepcopy(blocks)
    for blockuid in blocks:
        block = blocks[blockuid]
        if block["@type"] == "image":
            if "@@images" in block["url"]:
                if block["url"].split("/")[-1] == "large":
                    block["size"] = "l"
                block["url"] = block["url"].split("/@@images")[0]
    return blocks


if __name__ == "__main__":
    pc = api.portal.get_tool("portal_catalog")
    for brain in pc.unrestrictedSearchResults(
        object_provides=IBlocks.__identifier__, path=PATH
    ):
        try:
            obj = brain.getObject()
        except KeyError:
            obj = None

        if obj:
            blocks = obj.blocks

            utils.print_info(f"Processing: {obj.absolute_url()}")

            # Search for any image block and replaces scales
            blocks = remove_image_scales(blocks)

            obj.blocks = blocks

    transaction.commit()
