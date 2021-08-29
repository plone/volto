# -*- coding: utf-8 -*-
from Acquisition import aq_inner
from Missing import Missing
from plone.app.layout.navigation.root import getNavigationRoot
from plone.registry.interfaces import IRegistry
from Products.CMFCore.utils import getToolByName
from Products.CMFPlone import utils
from Products.CMFPlone.browser.interfaces import INavigationTabs
from Products.CMFPlone.browser.navigation import get_id
from Products.CMFPlone.browser.navigation import get_view_url
from Products.CMFPlone.interfaces import INavigationSchema
from Products.Five import BrowserView
from zope.component import getMultiAdapter
from zope.component import getUtility
from zope.interface import implementer


@implementer(INavigationTabs)
class CatalogNavigationTabs(BrowserView):
    def _getNavQuery(self):
        # check whether we only want actions
        registry = getUtility(IRegistry)
        navigation_settings = registry.forInterface(
            INavigationSchema, prefix="plone", check=False
        )
        customQuery = getattr(self.context, "getCustomNavQuery", False)
        if customQuery is not None and utils.safe_callable(customQuery):
            query = customQuery()
        else:
            query = {}

        query["path"] = {"query": getNavigationRoot(self.context), "depth": 1}
        query["portal_type"] = [t for t in navigation_settings.displayed_types]
        query["sort_on"] = navigation_settings.sort_tabs_on
        if navigation_settings.sort_tabs_reversed:
            query["sort_order"] = "reverse"
        else:
            query["sort_order"] = "ascending"

        if navigation_settings.filter_on_workflow:
            query["review_state"] = navigation_settings.workflow_states_to_show

        query["is_default_page"] = False

        if not navigation_settings.show_excluded_items:
            query["exclude_from_nav"] = False

        if not navigation_settings.nonfolderish_tabs:
            query["is_folderish"] = True

        return query

    def topLevelTabs(self, actions=None, category="portal_tabs"):
        context = aq_inner(self.context)
        registry = getUtility(IRegistry)
        navigation_settings = registry.forInterface(
            INavigationSchema, prefix="plone", check=False
        )
        mtool = getToolByName(context, "portal_membership")
        member = mtool.getAuthenticatedMember().id
        catalog = getToolByName(context, "portal_catalog")

        if actions is None:
            context_state = getMultiAdapter(
                (context, self.request), name=u"plone_context_state"
            )
            actions = context_state.actions(category)

        # Build result dict
        result = []
        # first the actions
        for actionInfo in actions:
            data = actionInfo.copy()
            data["name"] = data["title"]
            self.customize_entry(data)
            result.append(data)

        # check whether we only want actions
        if not navigation_settings.generate_tabs:
            return result

        query = self._getNavQuery()

        rawresult = catalog.searchResults(query)

        def _get_url(item):
            if item.getRemoteUrl and not member == item.Creator:
                return (get_id(item), item.getRemoteUrl)
            return get_view_url(item)

        context_path = "/".join(context.getPhysicalPath())

        # now add the content to results
        for item in rawresult:
            if item.exclude_from_nav and not context_path.startswith(
                item.getPath()
            ):  # noqa: E501
                # skip excluded items if they're not in our context path
                continue
            cid, item_url = _get_url(item)

            # Guard in case the nav_title field behavior is not applied to the
            # object and returns 'Missing.Value'
            if getattr(item, "nav_title", "").__class__ == Missing:
                nav_title = ""
            else:
                nav_title = getattr(item, "nav_title", "")

            data = {
                "name": nav_title or utils.pretty_title_or_id(context, item),
                "id": item.getId,
                "url": item_url,
                "description": item.Description,
                "review_state": item.review_state,
            }
            self.customize_entry(data, item)
            result.append(data)

        return result

    def customize_entry(self, entry, brain=None):
        """a little helper to enlarge customizability."""
        pass
