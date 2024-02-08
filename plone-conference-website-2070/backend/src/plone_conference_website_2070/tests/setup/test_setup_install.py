from plone_conference_website_2070 import PACKAGE_NAME


class TestSetupInstall:
    def test_addon_installed(self, installer):
        """Test if plone_conference_website_2070 is installed."""
        assert installer.is_product_installed(PACKAGE_NAME) is True

    def test_browserlayer(self, browser_layers):
        """Test that IPloneConferenceWebsite2070Layer is registered."""
        from plone_conference_website_2070.interfaces import IPloneConferenceWebsite2070Layer

        assert IPloneConferenceWebsite2070Layer in browser_layers

    def test_latest_version(self, profile_last_version):
        """Test latest version of default profile."""
        assert profile_last_version(f"{PACKAGE_NAME}:default") == "20240129001"
