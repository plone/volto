# -*- coding: utf-8 -*-

from plone.dexterity.interfaces import IDexterityFTI
from kitconcept.volto.testing import KITCONCEPTVOLTO_CORE_INTEGRATION_TESTING  # noqa
from zope.component import queryUtility
from kitconcept.volto.scripts.blocksremoveserver import draftjs_replace_server
from kitconcept.volto.scripts.blocksremoveserver import string_href_replace_server
from kitconcept.volto.scripts.blocksremoveserver import array_href_replace_server
from kitconcept.volto.scripts.blocksremoveserver import string_url_replace_server
from kitconcept.volto.scripts.blocksremoveserver import array_url_replace_server
from kitconcept.volto.scripts.blocksremoveserver import (
    array_preview_image_replace_server,
)
from kitconcept.volto.scripts.listingaddsummary import migrate_listing_block_to_summary
from kitconcept.volto.scripts.searchscalesinimageblocks import remove_image_scales

import unittest


class TestBlocksTransforms(unittest.TestCase):

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
        self.doc1 = self.portal["doc1"]
        self.image = self.portal[
            self.portal.invokeFactory("Image", id="image1", title="Target image")
        ]

    def test_draftjs_replace_server(self):
        blocks = {
            "09e39ddf-a945-49f2-b609-ea427ac3430b": {
                "@type": "text",
                "text": {
                    "blocks": [
                        {
                            "data": {},
                            "depth": 0,
                            "entityRanges": [{"key": 0, "length": 4, "offset": 0}],
                            "inlineStyleRanges": [],
                            "key": "ark35",
                            "text": "Link",
                            "type": "unstyled",
                        }
                    ],
                    "entityMap": {
                        "0": {
                            "data": {"url": self.doc1.absolute_url()},
                            "mutability": "MUTABLE",
                            "type": "LINK",
                        }
                    },
                },
            },
            "21270e22-3a61-4780-b164-d6be56d942f4": {"@type": "title"},
        }

        result = draftjs_replace_server(blocks, self.portal.absolute_url(), "")

        self.assertEqual(
            result["09e39ddf-a945-49f2-b609-ea427ac3430b"]["text"]["entityMap"]["0"][
                "data"
            ]["url"],
            "/doc1",
        )

        result = draftjs_replace_server(
            blocks, self.portal.absolute_url(), "https://kitconcept.com"
        )

        self.assertEqual(
            result["09e39ddf-a945-49f2-b609-ea427ac3430b"]["text"]["entityMap"]["0"][
                "data"
            ]["url"],
            "https://kitconcept.com/doc1",
        )

    def test_array_href_replace_server(self):
        blocks = {
            "043ebd28-1e05-405a-9384-526ca90488f1": {
                "@type": "teaserTab",
                "columns": [
                    {
                        "@id": "e0ab36e5-aed0-451c-8929-2671355d3240",
                        "description": "Schneller rechnet derzeit niemand in Europa: Der J\u00fclicher Supercomputer JUWELS hat dank eines neuen Booster-Moduls noch einmal enorm an Rechenleistung zugelegt. Auf JUWELS k\u00f6nnen dank des neuen Booster-Moduls nun wissenschaftliche Simulationen laufen, die aufgrund ihrer Komplexit\u00e4t oder der zu verarbeitenden Datenmenge bisher nicht durchf\u00fchrbar waren.",
                        "href": [
                            {
                                "@id": "/de/beispiele/highlight1",
                                "Description": "Schneller rechnet derzeit niemand in Europa: Der J\u00fclicher Supercomputer JUWELS hat dank eines neuen Booster-Moduls noch einmal enorm an Rechenleistung zugelegt. Auf JUWELS k\u00f6nnen dank des neuen Booster-Moduls nun wissenschaftliche Simulationen laufen, die aufgrund ihrer Komplexit\u00e4t oder der zu verarbeitenden Datenmenge bisher nicht durchf\u00fchrbar waren.",
                                "Title": "Supercomputer f\u00fcr gro\u00dfe Rechenaufgaben und KI",
                                "hasPreviewImage": True,
                                "title": "Supercomputer f\u00fcr gro\u00dfe Rechenaufgaben und KI",
                            }
                        ],
                        "title": "Supercomputer f\u00fcr gro\u00dfe Rechenaufgaben und KI",
                    },
                    {
                        "@id": "e0ab36e5-aed0-451c-8929-2671355d3240",
                        "description": "Schneller rechnet derzeit niemand in Europa: Der J\u00fclicher Supercomputer JUWELS hat dank eines neuen Booster-Moduls noch einmal enorm an Rechenleistung zugelegt. Auf JUWELS k\u00f6nnen dank des neuen Booster-Moduls nun wissenschaftliche Simulationen laufen, die aufgrund ihrer Komplexit\u00e4t oder der zu verarbeitenden Datenmenge bisher nicht durchf\u00fchrbar waren.",
                        "href": [
                            {
                                "@id": "{}".format(self.doc1.absolute_url()),
                                "Description": "Schneller rechnet derzeit niemand in Europa: Der J\u00fclicher Supercomputer JUWELS hat dank eines neuen Booster-Moduls noch einmal enorm an Rechenleistung zugelegt. Auf JUWELS k\u00f6nnen dank des neuen Booster-Moduls nun wissenschaftliche Simulationen laufen, die aufgrund ihrer Komplexit\u00e4t oder der zu verarbeitenden Datenmenge bisher nicht durchf\u00fchrbar waren.",
                                "Title": "Supercomputer f\u00fcr gro\u00dfe Rechenaufgaben und KI",
                                "hasPreviewImage": True,
                                "title": "Supercomputer f\u00fcr gro\u00dfe Rechenaufgaben und KI",
                            }
                        ],
                        "title": "Supercomputer f\u00fcr gro\u00dfe Rechenaufgaben und KI",
                    },
                ],
            }
        }

        result = array_href_replace_server(blocks, self.portal.absolute_url(), "")

        self.assertEqual(
            result["043ebd28-1e05-405a-9384-526ca90488f1"]["columns"][1]["href"][0][
                "@id"
            ],
            "/doc1",
        )

        self.assertEqual(
            result["043ebd28-1e05-405a-9384-526ca90488f1"]["columns"][0]["href"][0][
                "@id"
            ],
            "/de/beispiele/highlight1",
        )

        result = array_href_replace_server(
            blocks, self.portal.absolute_url(), "https://kitconcept.com"
        )

        self.assertEqual(
            result["043ebd28-1e05-405a-9384-526ca90488f1"]["columns"][1]["href"][0][
                "@id"
            ],
            "https://kitconcept.com/doc1",
        )

    def test_string_href_replace_server(self):
        blocks = {
            "11d2fa0c-81d3-41c0-84e4-fd7f9c158a5a": {
                "@type": "teaserGrid",
                "columns": [
                    {
                        "@type": "teaser",
                        "href": "/de/ueber-uns/erklaer-film",
                        "id": "db139e89-9545-4b31-aaa5-658c62e5d8da",
                        "title": "Video \\u00fcber den Fenster",
                        "index": 0,
                    },
                    {
                        "@type": "teaser",
                        "href": "{}".format(self.doc1.absolute_url()),
                        "id": "1e058bee-c31f-437e-ad86-805638a9082a",
                        "title": "Pr\\u00e4sident",
                        "index": 1,
                    },
                ],
            }
        }

        result = string_href_replace_server(blocks, self.portal.absolute_url(), "")

        self.assertEqual(
            result["11d2fa0c-81d3-41c0-84e4-fd7f9c158a5a"]["columns"][1]["href"],
            "/doc1",
        )

        self.assertEqual(
            result["11d2fa0c-81d3-41c0-84e4-fd7f9c158a5a"]["columns"][0]["href"],
            "/de/ueber-uns/erklaer-film",
        )

        result = string_href_replace_server(
            blocks, self.portal.absolute_url(), "https://kitconcept.com"
        )

        self.assertEqual(
            result["11d2fa0c-81d3-41c0-84e4-fd7f9c158a5a"]["columns"][1]["href"],
            "https://kitconcept.com/doc1",
        )

    def test_string_href_replace_server_plain(self):
        blocks = {
            "720b5582-c80a-48be-843a-8d5990d3c4ec": {
                "@type": "teaserHero",
                "href": "/de/veroeffentlichungen/produkte/sonderberichte/2019/gesundheitsausgaben-im-fokus-der-eu-rechnungshoefe-pruefungskompendium-des-kontaktausschusses",
                "headline": "Sonderbericht",
                "title": "Gesundheitsausgaben im Fokus der EU-Rechnungsh\\u00f6fe: Pr\\u00fcfungskompendium des Kontaktausschusses",
                "description": "Die EU-Mitgliedstaaten investieren jedes Jahr Milliarden in die Gesundheitsversorgung. Die EU-Rechnungsh\\u00f6fe haben nun exemplarische Pr\\u00fcfungen zum Thema \\u201e\\u00d6ffentliche Gesundheit\\u201c zusammengefasst und ver\\u00f6ffentlicht.",
                "variation": "top",
            }
        }

        result = string_href_replace_server(
            blocks, self.portal.absolute_url(), "https://kitconcept.com"
        )

        self.assertEqual(
            result["720b5582-c80a-48be-843a-8d5990d3c4ec"]["href"],
            "/de/veroeffentlichungen/produkte/sonderberichte/2019/gesundheitsausgaben-im-fokus-der-eu-rechnungshoefe-pruefungskompendium-des-kontaktausschusses",
        )

        blocks = {
            "720b5582-c80a-48be-843a-8d5990d3c4ec": {
                "@type": "teaserHero",
                "href": "{}".format(self.doc1.absolute_url()),
                "headline": "Sonderbericht",
                "title": "Gesundheitsausgaben im Fokus der EU-Rechnungsh\\u00f6fe: Pr\\u00fcfungskompendium des Kontaktausschusses",
                "description": "Die EU-Mitgliedstaaten investieren jedes Jahr Milliarden in die Gesundheitsversorgung. Die EU-Rechnungsh\\u00f6fe haben nun exemplarische Pr\\u00fcfungen zum Thema \\u201e\\u00d6ffentliche Gesundheit\\u201c zusammengefasst und ver\\u00f6ffentlicht.",
                "variation": "top",
            }
        }

        result = string_href_replace_server(
            blocks, self.portal.absolute_url(), "https://kitconcept.com"
        )

        self.assertEqual(
            result["720b5582-c80a-48be-843a-8d5990d3c4ec"]["href"],
            "https://kitconcept.com/doc1",
        )

    def test_string_url_replace_server(self):
        blocks = {
            "7bad5afd-ea6a-472a-a521-452810e1d286": {
                "@type": "image",
                "alt": "Bild 3",
                "size": "l",
                "url": "{}".format(self.image.absolute_url()),
            },
        }

        result = string_url_replace_server(blocks, self.portal.absolute_url(), "")

        self.assertEqual(
            result["7bad5afd-ea6a-472a-a521-452810e1d286"]["url"],
            "/image1",
        )

        blocks = {
            "57714a7e-a4e0-4df2-a03b-0f5ca5613daa": {
                "@type": "imagesGrid",
                "columns": [
                    {"@type": "image", "id": "ccc74a4e-1495-4dc7-a8ef-d325032e744d"},
                    {
                        "@type": "image",
                        "alt": "Bild 2",
                        "id": "35bb6f7c-a0af-4c21-a306-accb180b3e8b",
                        "index": 1,
                        "url": "{}".format(self.image.absolute_url()),
                    },
                ],
            }
        }

        result = string_url_replace_server(blocks, self.portal.absolute_url(), "")

        self.assertEqual(
            result["57714a7e-a4e0-4df2-a03b-0f5ca5613daa"]["columns"][1]["url"],
            "/image1",
        )

        result = string_url_replace_server(
            blocks, self.portal.absolute_url(), "https://kitconcept.com"
        )

        self.assertEqual(
            result["57714a7e-a4e0-4df2-a03b-0f5ca5613daa"]["columns"][1]["url"],
            "https://kitconcept.com/image1",
        )

    def test_array_preview_image_replace_server(self):
        blocks = {
            "b53feefa-e6f7-42f0-8f04-534655c6c594": {
                "@type": "carousel",
                "columns": [
                    {
                        "@id": "404cb69e-97b9-417a-aa9a-a345009f4411",
                        "description": "Das dritte Jahr in Folge ist es zu trocken und warm in Deutschland. Darunter leiden viele Bäume, insbesondere Fichten. Eine Folge: Sie sind anfälliger für Schädlinge. Jülicher Forschende beobachten die Entwicklung in der Eifel und messen die Auswirkungen: etwa auf den CO2-Gehalt in der Atmosphäre.",
                        "href": [
                            {
                                "@id": "/de/beispiele/highlight2",
                                "Description": "Das dritte Jahr in Folge ist es zu trocken und warm in Deutschland. Darunter leiden viele Bäume, insbesondere Fichten. Eine Folge: Sie sind anfälliger für Schädlinge. Jülicher Forschende beobachten die Entwicklung in der Eifel und messen die Auswirkungen: etwa auf den CO2-Gehalt in der Atmosphäre.",
                                "Title": "Sorgenkind Wald",
                                "hasPreviewImage": True,
                                "title": "Sorgenkind Wald",
                            }
                        ],
                        "title": "Sorgenkind Wald",
                    },
                    {
                        "@id": "404cb69e-97b9-417a-aa9a-a345009f4412",
                        "description": "Sie sind klein, aber haben es in sich: Mikroorganismen. Ihre Leistungsfähigkeit macht sich die sogenannte Weiße Biotechnologie auf vielfältige Weise zu Nutze. Eine besondere Herausforderung besteht allerdings oftmals darin, unter Millionen von Zellen die passenden zu finden. Jülicher Forschenden ist es nun gelungen, einen Biosensor zu entwickeln, der die Suche nach geeigneten Kandidaten erleichtert.",
                        "href": [
                            {
                                "@id": "/de/beispiele/highlight3",
                                "Description": "Sie sind klein, aber haben es in sich: Mikroorganismen. Ihre Leistungsfähigkeit macht sich die sogenannte Weiße Biotechnologie auf vielfältige Weise zu Nutze. Eine besondere Herausforderung besteht allerdings oftmals darin, unter Millionen von Zellen die passenden zu finden. Jülicher Forschenden ist es nun gelungen, einen Biosensor zu entwickeln, der die Suche nach geeigneten Kandidaten erleichtert.",
                                "Title": "Talentscout in der Zellfabrik",
                                "hasPreviewImage": True,
                                "title": "Talentscout in der Zellfabrik",
                            }
                        ],
                        "preview_image": [
                            {
                                "@id": "{}".format(self.image.absolute_url()),
                                "@type": "Image",
                            }
                        ],
                        "title": "Talentscout in der Zellfabrik",
                    },
                ],
            }
        }

        result = array_preview_image_replace_server(
            blocks, self.portal.absolute_url(), "https://kitconcept.com"
        )

        self.assertEqual(
            result["b53feefa-e6f7-42f0-8f04-534655c6c594"]["columns"][1][
                "preview_image"
            ][0]["@id"],
            "https://kitconcept.com/image1",
        )

    def test_array_url_replace_server(self):
        blocks = {
            "b53feefa-e6f7-42f0-8f04-534655c6c594": {
                "@type": "carousel",
                "columns": [
                    {
                        "@id": "404cb69e-97b9-417a-aa9a-a345009f4411",
                        "description": "Das dritte Jahr in Folge ist es zu trocken und warm in Deutschland. Darunter leiden viele Bäume, insbesondere Fichten. Eine Folge: Sie sind anfälliger für Schädlinge. Jülicher Forschende beobachten die Entwicklung in der Eifel und messen die Auswirkungen: etwa auf den CO2-Gehalt in der Atmosphäre.",
                        "href": [
                            {
                                "@id": "/de/beispiele/highlight2",
                                "Description": "Das dritte Jahr in Folge ist es zu trocken und warm in Deutschland. Darunter leiden viele Bäume, insbesondere Fichten. Eine Folge: Sie sind anfälliger für Schädlinge. Jülicher Forschende beobachten die Entwicklung in der Eifel und messen die Auswirkungen: etwa auf den CO2-Gehalt in der Atmosphäre.",
                                "Title": "Sorgenkind Wald",
                                "hasPreviewImage": True,
                                "title": "Sorgenkind Wald",
                            }
                        ],
                        "title": "Sorgenkind Wald",
                    },
                    {
                        "@id": "404cb69e-97b9-417a-aa9a-a345009f4412",
                        "description": "Sie sind klein, aber haben es in sich: Mikroorganismen. Ihre Leistungsfähigkeit macht sich die sogenannte Weiße Biotechnologie auf vielfältige Weise zu Nutze. Eine besondere Herausforderung besteht allerdings oftmals darin, unter Millionen von Zellen die passenden zu finden. Jülicher Forschenden ist es nun gelungen, einen Biosensor zu entwickeln, der die Suche nach geeigneten Kandidaten erleichtert.",
                        "href": [
                            {
                                "@id": "/de/beispiele/highlight3",
                                "Description": "Sie sind klein, aber haben es in sich: Mikroorganismen. Ihre Leistungsfähigkeit macht sich die sogenannte Weiße Biotechnologie auf vielfältige Weise zu Nutze. Eine besondere Herausforderung besteht allerdings oftmals darin, unter Millionen von Zellen die passenden zu finden. Jülicher Forschenden ist es nun gelungen, einen Biosensor zu entwickeln, der die Suche nach geeigneten Kandidaten erleichtert.",
                                "Title": "Talentscout in der Zellfabrik",
                                "hasPreviewImage": True,
                                "title": "Talentscout in der Zellfabrik",
                            }
                        ],
                        "url": [
                            {
                                "@id": "{}".format(self.image.absolute_url()),
                                "@type": "Image",
                            }
                        ],
                        "title": "Talentscout in der Zellfabrik",
                    },
                ],
            }
        }

        result = array_url_replace_server(
            blocks, self.portal.absolute_url(), "https://kitconcept.com"
        )

        self.assertEqual(
            result["b53feefa-e6f7-42f0-8f04-534655c6c594"]["columns"][1]["url"][0][
                "@id"
            ],
            "https://kitconcept.com/image1",
        )

    def test_migrate_listing_block_to_summary(self):
        blocks = {
            "@type": "listing",
        }

        result = migrate_listing_block_to_summary(blocks)

        self.assertEqual(result["template"], "summary")

    def test_remove_image_scales(self):
        blocks = {
            "b53feefa-e6f7-42f0-8f04-534655c6c594": {
                "@type": "image",
                "url": "/foo/bar/@@images/image/large",
            }
        }

        result = remove_image_scales(blocks)

        self.assertEqual(
            result["b53feefa-e6f7-42f0-8f04-534655c6c594"]["url"], "/foo/bar"
        )
        self.assertEqual(result["b53feefa-e6f7-42f0-8f04-534655c6c594"]["size"], "l")

    def test_remove_image_scales_no_large(self):
        blocks = {
            "b53feefa-e6f7-42f0-8f04-534655c6c594": {
                "@type": "image",
                "url": "/foo/bar/@@images/image/teaser",
            }
        }

        result = remove_image_scales(blocks)

        self.assertEqual(
            result["b53feefa-e6f7-42f0-8f04-534655c6c594"]["url"], "/foo/bar"
        )
