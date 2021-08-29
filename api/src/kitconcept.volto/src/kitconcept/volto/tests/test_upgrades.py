# -*- coding: utf-8 -*-

from plone.dexterity.interfaces import IDexterityFTI
from plone.restapi.interfaces import IDeserializeFromJson
from kitconcept.volto.testing import KITCONCEPTVOLTO_CORE_INTEGRATION_TESTING  # noqa
from zope.component import getMultiAdapter
from zope.component import queryUtility
from plone.dexterity.utils import iterSchemata
from plone.restapi.interfaces import IFieldSerializer
from z3c.form.interfaces import IDataManager
from kitconcept.volto.upgrades import from12to13_migrate_listings

import json
import unittest


class TestBlocksUpgrades(unittest.TestCase):

    layer = KITCONCEPTVOLTO_CORE_INTEGRATION_TESTING

    def setUp(self):
        self.app = self.layer["app"]
        self.portal = self.layer["portal"]
        self.request = self.layer["request"]

        fti = queryUtility(IDexterityFTI, name="Document")
        behavior_list = [a for a in fti.behaviors]
        behavior_list.append("volto.blocks")
        fti.behaviors = tuple(behavior_list)

        self.portal.invokeFactory(
            "Document",
            id=u"doc1",
        )
        self.image = self.portal[
            self.portal.invokeFactory("Image", id="image-1", title="Target image")
        ]

    def deserialize(self, blocks=None, validate_all=False, context=None):
        blocks = blocks or ""
        context = context or self.portal.doc1
        self.request["BODY"] = json.dumps({"blocks": blocks})
        deserializer = getMultiAdapter((context, self.request), IDeserializeFromJson)

        return deserializer(validate_all=validate_all)

    def serialize(self, context, blocks):
        fieldname = "blocks"
        for schema in iterSchemata(context):
            if fieldname in schema:
                field = schema.get(fieldname)
                break
        dm = getMultiAdapter((context, field), IDataManager)
        dm.set(blocks)
        serializer = getMultiAdapter((field, context, self.request), IFieldSerializer)
        return serializer()

    def test_upgradefrom12to13listing_block(self):
        self.deserialize(blocks={"123": {"@type": "listing", "template": "summary"}})
        from12to13_migrate_listings(self.app)

        self.assertEqual(
            self.portal.doc1.blocks["123"],
            {"@type": "listing", "variation": "summary", "querystring": {}},
        )

        self.deserialize(blocks={"123": {"@type": "listing", "query": []}})
        from12to13_migrate_listings(self.app)

        self.assertEqual(
            self.portal.doc1.blocks["123"],
            {"@type": "listing", "querystring": {"query": []}},
        )

        self.deserialize(
            blocks={"123": {"@type": "listing", "variation": "summary", "query": []}}
        )
        from12to13_migrate_listings(self.app)

        self.assertEqual(
            self.portal.doc1.blocks["123"],
            {"@type": "listing", "variation": "summary", "querystring": {"query": []}},
        )

        self.deserialize(
            blocks={
                "123": {
                    "@type": "listing",
                    "template": "summary",
                    "variation": "summary",
                    "query": [],
                }
            }
        )
        from12to13_migrate_listings(self.app)

        self.assertEqual(
            self.portal.doc1.blocks["123"],
            {"@type": "listing", "variation": "summary", "querystring": {"query": []}},
        )

        self.deserialize(
            blocks={
                "123": {
                    "@type": "listing",
                    "template": "summary",
                    "variation": "summary",
                    "query": [],
                },
                "222": {"@type": "image", "url": ""},
            }
        )
        from12to13_migrate_listings(self.app)

        self.assertEqual(
            self.portal.doc1.blocks,
            {
                "123": {
                    "@type": "listing",
                    "variation": "summary",
                    "querystring": {"query": []},
                },
                "222": {"@type": "image", "url": ""},
            },
        )

    def test_upgradefrom12to13listing_block_query_part(self):
        self.deserialize(
            blocks={
                "123": {
                    "@type": "listing",
                    "id": "87def7d6-e019-4026-a8a2-e1c289941fac",
                    "limit": "2",
                    "sort_on": "created",
                    "sort_order": True,
                    "batch_size": "10",
                    "depth": "3",
                    "query": [
                        {
                            "i": "path",
                            "o": "plone.app.querystring.operation.string.absolutePath",
                            "v": "/de/beispiele",
                        },
                        {
                            "i": "portal_type",
                            "o": "plone.app.querystring.operation.selection.any",
                            "v": ["Document"],
                        },
                    ],
                    "template": "newsListing",
                }
            }
        )
        from12to13_migrate_listings(self.app)

        self.assertEqual(
            self.portal.doc1.blocks["123"],
            {
                "@type": "listing",
                "id": "87def7d6-e019-4026-a8a2-e1c289941fac",
                "querystring": {
                    "limit": "2",
                    "sort_on": "created",
                    "sort_order": "descending",
                    "b_size": "10",
                    "depth": "3",
                    "sort_order_boolean": True,
                    "query": [
                        {
                            "i": "path",
                            "o": "plone.app.querystring.operation.string.absolutePath",
                            "v": "/de/beispiele",
                        },
                        {
                            "i": "portal_type",
                            "o": "plone.app.querystring.operation.selection.any",
                            "v": ["Document"],
                        },
                    ],
                },
                "variation": "newsListing",
            },
        )

        self.deserialize(blocks={"123": {"@type": "listing", "query": []}})
        from12to13_migrate_listings(self.app)

        self.assertEqual(
            self.portal.doc1.blocks["123"],
            {"@type": "listing", "querystring": {"query": []}},
        )
