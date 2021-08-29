#!/bin/bash
# i18ndude should be available in current $PATH (eg by running
# ``export PATH=$PATH:$BUILDOUT_DIR/bin`` when i18ndude is located in your buildout's bin directory)
#
# For every language you want to translate into you need a
# locales/[language]/LC_MESSAGES/kitconcept.volto.po
# (e.g. locales/de/LC_MESSAGES/kitconcept.volto.po)

domain=kitconcept.volto

../../../../bin/i18ndude rebuild-pot --pot $domain.pot --create $domain ../
../../../../bin/i18ndude sync --pot $domain.pot */LC_MESSAGES/$domain.po
