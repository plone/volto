# -*- coding: utf-8 -*-
from Acquisition import aq_inner
from plone.app.layout.navigation.interfaces import INavigationRoot
from plone.app.layout.navigation.root import getNavigationRoot
from Products.CMFPlone import utils
from Products.CMFPlone.browser.interfaces import INavigationBreadcrumbs
from Products.CMFPlone.browser.navigation import get_view_url
from Products.CMFPlone.interfaces import IHideFromBreadcrumbs
from Products.Five import BrowserView
from zope.component import getMultiAdapter
from zope.interface import implementer


@implementer(INavigationBreadcrumbs)
class PhysicalNavigationBreadcrumbs(BrowserView):
    def breadcrumbs(self):
        context = aq_inner(self.context)
        request = self.request
        container = utils.parent(context)

        name, item_url = get_view_url(context)

        if container is None:
            return (
                {
                    "absolute_url": item_url,
                    "Title": utils.pretty_title_or_id(context, context),
                    "nav_title": getattr(context, "nav_title", ""),
                },
            )

        # Replicate Products.CMFPlone.browser.navigaton.RootPhysicalNavigationBreadcrumbs.breadcrumbs()
        # cause it is not registered during tests
        if INavigationRoot.providedBy(context):
            return ()

        view = getMultiAdapter((container, request), name="breadcrumbs_view")
        base = tuple(view.breadcrumbs())

        # Some things want to be hidden from the breadcrumbs
        if IHideFromBreadcrumbs.providedBy(context):
            return base

        rootPath = getNavigationRoot(context)
        itemPath = "/".join(context.getPhysicalPath())

        # don't show default pages in breadcrumbs or pages above the navigation
        # root
        if not utils.isDefaultPage(context, request) and not rootPath.startswith(
            itemPath
        ):
            base += (
                {
                    "absolute_url": item_url,
                    "Title": utils.pretty_title_or_id(context, context),
                    "nav_title": getattr(context, "nav_title", ""),
                },
            )
        return base
