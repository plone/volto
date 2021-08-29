"""
bin/instance -O Plone run scripts/auditblocks.py <block_name>
    This script audits the blocks that you have in a site. If an optional block_name is
    defined, then it returns where is that block defined.
"""
from plone import api
from plone.restapi.behaviors import IBlocks
from collections import Counter

import sys


def audit_blocks():
    types = []
    pc = api.portal.get_tool("portal_catalog")
    for brain in pc.unrestrictedSearchResults(object_provides=IBlocks.__identifier__):
        obj = brain.getObject()
        blocks = obj.blocks
        for blockuid in blocks:
            block = blocks[blockuid]
            types.append(block["@type"])

    count = Counter(types)
    print(count.most_common())


def where_is_this_block():
    pc = api.portal.get_tool("portal_catalog")
    for brain in pc.unrestrictedSearchResults(object_provides=IBlocks.__identifier__):
        obj = brain.getObject()
        blocks = obj.blocks
        for blockuid in blocks:
            block = blocks[blockuid]
            if block["@type"] == sys.argv[3]:
                print(f'{block["@type"]} -> {obj.absolute_url()}')


if len(sys.argv) > 3:
    where_is_this_block()
else:
    audit_blocks()
