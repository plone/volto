from zope.component import queryUtility
from zope.interface import directlyProvides
from zope.interface import implementer
from zope.schema.interfaces import ITitledTokenizedTerm
from zope.schema.interfaces import ITokenizedTerm
from zope.schema.interfaces import IVocabularyFactory
from zope.schema.vocabulary import SimpleVocabulary
from plone.app.layout.navigation.root import getNavigationRootObject
from plone.app.vocabularies.terms import safe_encode
from plone.registry.interfaces import IRegistry
from zope.site.hooks import getSite

from BTrees.IIBTree import intersection
from Products.CMFCore.utils import getToolByName


@implementer(ITokenizedTerm)
class UnsafeSimpleSubjectTerm(object):
    """Simple tokenized term that allows unicode in the token"""

    def __init__(self, value, token, title):
        """Create a term for value and token. If token is omitted,
        str(value) is used for the token.  If title is provided,
        term implements ITitledTokenizedTerm.
        """
        self.value = value
        self.token = token
        self.title = title
        if title is not None:
            directlyProvides(self, ITitledTokenizedTerm)


# Override the keywords vocabulary with an unsafe version. plone.restapi
# currently store the raw token for the subject field. Override the vocabulary
# with a version that uses the Keyword as a token and does not encode it.
# Mostly copied from plone.app.vocabularies.catalog.
# See https://github.com/plone/plone.restapi/issues/782


def unsafe_simplevocabulary_from_values(values, query=None):
    return SimpleVocabulary(
        [
            UnsafeSimpleSubjectTerm(value, value, value)
            for value in values
            if query is None or safe_encode(query) in safe_encode(value)
        ]
    )


safe_simplevocabulary_from_values = unsafe_simplevocabulary_from_values


@implementer(IVocabularyFactory)
class KeywordsVocabulary(object):
    """Override Keywords vocabulary to provide the real Keyword as the token."""

    # Allow users to customize the index to easily create
    # KeywordVocabularies for other keyword indexes
    keyword_index = "Subject"
    path_index = "path"

    def section(self, context):
        """gets section from which subjects are used."""
        registry = queryUtility(IRegistry)
        if registry is None:
            return None
        if registry.get("plone.subjects_of_navigation_root", False):
            portal = getToolByName(context, "portal_url").getPortalObject()
            return getNavigationRootObject(context, portal)
        return None

    def all_keywords(self, kwfilter):
        site = getSite()
        self.catalog = getToolByName(site, "portal_catalog", None)
        if self.catalog is None:
            return SimpleVocabulary([])
        index = self.catalog._catalog.getIndex(self.keyword_index)
        return safe_simplevocabulary_from_values(index._index, query=kwfilter)

    def keywords_of_section(self, section, kwfilter):
        """Valid keywords under the given section."""
        pcat = getToolByName(section, "portal_catalog")
        cat = pcat._catalog
        path_idx = cat.indexes[self.path_index]
        tags_idx = cat.indexes[self.keyword_index]
        result = []
        # query all oids of path - low level
        pquery = {
            self.path_index: {"query": "/".join(section.getPhysicalPath()), "depth": -1}
        }
        kwfilter = safe_encode(kwfilter)
        # uses internal zcatalog specific details to quickly get the values.
        path_result, info = path_idx._apply_index(pquery)
        for tag in tags_idx.uniqueValues():
            if kwfilter and kwfilter not in safe_encode(tag):
                continue
            tquery = {self.keyword_index: tag}
            tags_result, info = tags_idx._apply_index(tquery)
            if intersection(path_result, tags_result):
                result.append(tag)
        # result should be sorted, because uniqueValues are.
        return safe_simplevocabulary_from_values(result)

    def __call__(self, context, query=None):
        section = self.section(context)
        if section is None:
            return self.all_keywords(query)
        return self.keywords_of_section(section, query)


KeywordsVocabularyFactory = KeywordsVocabulary()
