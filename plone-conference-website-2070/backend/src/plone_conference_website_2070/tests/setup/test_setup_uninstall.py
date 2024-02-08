from plone_conference_website_2070 import PACKAGE_NAME

import pytest


class TestSetupUninstall:
    @pytest.fixture(autouse=True)
    def uninstalled(self, installer):
        installer.uninstall_product(PACKAGE_NAME)

    def test_product_uninstalled(self, installer):
        """Test if plone_conference_website_2070 is cleanly uninstalled."""
        assert installer.is_product_installed(PACKAGE_NAME) is False

    def test_browserlayer_removed(self, browser_layers):
        """Test that ICaseStudyLayer is removed."""
        from plone_conference_website_2070.interfaces import IPloneConferenceWebsite2070Layer

        assert IPloneConferenceWebsite2070Layer not in browser_layers
