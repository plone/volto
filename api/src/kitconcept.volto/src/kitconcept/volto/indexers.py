from kitconcept.volto.behaviors.preview import IPreview
from plone.indexer.decorator import indexer


@indexer(IPreview)
def hasPreviewImage(obj):
    """
    Indexer for knowing in a catalog search if a content with the IPreview behavior has
    a preview_image
    """
    if obj.aq_base.preview_image:
        return True
    return False
