"""
time bin/instance -O Plone run scripts/listingaddsummary.py
    This scripts moves all default (non existent) template property
    to "summary"
"""

from plone import api
from plone.restapi.behaviors import IBlocks

import transaction


def migrate_listing_block_to_summary(block):
    if not block.get("template", False):
        block["template"] = "summary"

    return block


if __name__ == "__main__":
    for brain in api.content.find(object_provides=IBlocks.__identifier__):
        obj = brain.getObject()
        blocks = obj.blocks

        for blockuid in blocks:
            block = blocks[blockuid]
            if block["@type"] == "listing":
                migrate_listing_block_to_summary(block)

        obj.blocks = blocks

    transaction.commit()
