# -*- coding: utf-8 -*-
"""Setup tests for this package."""
from kitconcept.volto.testing import KITCONCEPTVOLTO_CORE_INTEGRATION_TESTING  # noqa
from plone import api

try:
    from Products.CMFPlone.utils import get_installer
except ImportError:  # Plone < 5.1
    HAS_INSTALLER = False
else:
    HAS_INSTALLER = True

import unittest


class TestSetup(unittest.TestCase):
    """Test that kitconcept.volto is properly installed."""

    layer = KITCONCEPTVOLTO_CORE_INTEGRATION_TESTING

    def setUp(self):
        """Custom shared utility setup for tests."""
        self.portal = self.layer["portal"]
        if HAS_INSTALLER:
            self.installer = get_installer(self.portal)
        else:
            self.installer = api.portal.get_tool("portal_quickinstaller")

    def test_product_installed(self):
        """Test if kitconcept.volto is installed."""
        if HAS_INSTALLER:
            self.assertTrue(self.installer.is_product_installed("kitconcept.volto"))
        else:
            self.assertTrue(self.installer.isProductInstalled("kitconcept.volto"))

    def test_browserlayer(self):
        """Test that IKitconceptvoltoCoreLayer is registered."""
        from kitconcept.volto.interfaces import IKitconceptvoltoCoreLayer
        from plone.browserlayer import utils

        self.assertIn(IKitconceptvoltoCoreLayer, utils.registered_layers())


class TestUninstall(unittest.TestCase):

    layer = KITCONCEPTVOLTO_CORE_INTEGRATION_TESTING

    def setUp(self):
        self.portal = self.layer["portal"]
        if HAS_INSTALLER:
            self.installer = get_installer(self.portal)
            self.installer.uninstall_product("kitconcept.volto")
        else:
            self.installer = api.portal.get_tool("portal_quickinstaller")
            self.installer.uninstallProducts(["kitconcept.volto"])

    def test_product_uninstalled(self):
        """Test if kitconcept.volto is cleanly uninstalled."""
        if HAS_INSTALLER:
            self.assertFalse(self.installer.is_product_installed("kitconcept.volto"))
        else:
            self.assertFalse(self.installer.isProductInstalled("kitconcept.volto"))

    def test_browserlayer_removed(self):
        """Test that IKitconceptvoltoCoreLayer is removed."""
        from kitconcept.volto.interfaces import IKitconceptvoltoCoreLayer
        from plone.browserlayer import utils

        self.assertNotIn(IKitconceptvoltoCoreLayer, utils.registered_layers())
