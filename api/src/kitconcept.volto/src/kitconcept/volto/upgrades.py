from copy import deepcopy
from plone import api
from plone.restapi.behaviors import IBlocks


def from12to13_migrate_listings(context):
    def migrate_listing(originBlocks):
        blocks = deepcopy(originBlocks)
        for blockid in blocks:
            block = blocks[blockid]
            if block["@type"] == "listing":
                if block.get("template", False) and not block.get("variation", False):
                    block["variation"] = block["template"]
                    del block["template"]
                if block.get("template", False) and block.get("variation", False):
                    del block["template"]

                # Migrate to internal structure
                if not block.get("querystring", False):
                    # Creates if it is not created
                    block["querystring"] = {}
                if block.get("query", False) or block.get("query") == []:
                    block["querystring"]["query"] = block["query"]
                    del block["query"]
                if block.get("sort_on", False):
                    block["querystring"]["sort_on"] = block["sort_on"]
                    del block["sort_on"]
                if block.get("sort_order", False):
                    block["querystring"]["sort_order"] = block["sort_order"]
                    if isinstance(block["sort_order"], bool):
                        block["querystring"]["sort_order"] = (
                            "descending" if block["sort_order"] else "ascending"
                        )
                    else:
                        block["querystring"]["sort_order"] = block["sort_order"]
                    block["querystring"]["sort_order_boolean"] = (
                        True
                        if block["sort_order"] == "descending" or block["sort_order"]
                        else False
                    )
                    del block["sort_order"]
                if block.get("limit", False):
                    block["querystring"]["limit"] = block["limit"]
                    del block["limit"]
                if block.get("batch_size", False):
                    block["querystring"]["batch_size"] = block["batch_size"]
                    del block["batch_size"]
                if block.get("depth", False):
                    block["querystring"]["depth"] = block["depth"]
                    del block["depth"]

                # batch_size to b_size, idempotent
                if block["querystring"].get("batch_size", False):
                    block["querystring"]["b_size"] = block["querystring"]["batch_size"]
                    del block["querystring"]["batch_size"]

                print(f"Migrated listing in {obj.absolute_url()}")

        return blocks

    pc = api.portal.get_tool("portal_catalog")
    for brain in pc.unrestrictedSearchResults(object_provides=IBlocks.__identifier__):
        obj = brain.getObject()
        obj.blocks = migrate_listing(obj.blocks)
