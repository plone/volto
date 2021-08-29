from copy import deepcopy
from plone.restapi.behaviors import IBlocks
from plone.restapi.deserializer.blocks import path2uid
from plone.restapi.interfaces import IBlockFieldDeserializationTransformer
from plone.restapi.interfaces import IBlockFieldSerializationTransformer
from plone.restapi.serializer.blocks import uid_to_url
from Products.CMFPlone.interfaces import IPloneSiteRoot
from six import string_types
from zope.component import adapter
from zope.interface import implementer
from zope.publisher.interfaces.browser import IBrowserRequest
from zope.component import subscribers


class NestedResolveUIDDeserializerBase(object):
    """The "url" smart block field for nested blocks

    This is a generic handler. In all blocks, it converts any "url"
    field from using resolveuid to an "absolute" URL
    """

    order = 1
    block_type = None

    def __init__(self, context, request):
        self.context = context
        self.request = request

    def _transform(self, block):
        """ this mutates the object directly """

        block_type = block.get("@type", "")
        handlers = []
        for h in subscribers(
            (self.context, self.request), IBlockFieldDeserializationTransformer
        ):
            if h.block_type == block_type or h.block_type is None:
                h.blockid = block.get("id", None)
                handlers.append(h)

        for handler in sorted(handlers, key=lambda h: h.order):
            block = handler(block)

        return block

    def __call__(self, block):
        for column_name in ["columns", "hrefList", "slides"]:
            column_field = block.get(column_name, [])
            if block.get(column_name, False):
                for index, item in enumerate(column_field):
                    for field in ["url", "href", "preview_image"]:
                        link = item.get(field, "")
                        if link and isinstance(link, string_types):
                            block[column_name][index][field] = path2uid(
                                context=self.context, link=link
                            )
                        elif link and isinstance(link, list):
                            # Detect if it has an object inside with an "@id" key (object_widget)
                            if (
                                len(link) > 0
                                and isinstance(link[0], dict)
                                and "@id" in link[0]
                            ):
                                result = []
                                for itemlink in link:
                                    item_clone = deepcopy(itemlink)
                                    item_clone["@id"] = path2uid(
                                        context=self.context, link=item_clone["@id"]
                                    )
                                    result.append(item_clone)

                                block[column_name][index][field] = result
                            else:
                                block[column_name][index][field] = [
                                    path2uid(context=self.context, link=linkitem)
                                    for linkitem in link
                                ]

                    # Support for applying transforms to the subblocks in volto-blocks-grid
                    # TODO: It's the upper code needed any longer?
                    self._transform(item)

        return block


@adapter(IBlocks, IBrowserRequest)
@implementer(IBlockFieldDeserializationTransformer)
class NestedResolveUIDDeserializer(NestedResolveUIDDeserializerBase):
    """ Deserializer for content-types that implements IBlocks behavior """


@adapter(IPloneSiteRoot, IBrowserRequest)
@implementer(IBlockFieldDeserializationTransformer)
class NestedResolveUIDDeserializerRoot(NestedResolveUIDDeserializerBase):
    """ Deserializer for site root """


class NestedResolveUIDSerializerBase(object):
    order = 1
    block_type = None

    def __init__(self, context, request):
        self.context = context
        self.request = request

    def _transform(self, block):
        """ this mutates the object directly """

        block_type = block.get("@type", "")
        handlers = []
        for h in subscribers(
            (self.context, self.request), IBlockFieldSerializationTransformer
        ):
            if h.block_type == block_type or h.block_type is None:
                h.blockid = block.get("id", None)
                handlers.append(h)

        for handler in sorted(handlers, key=lambda h: h.order):
            block = handler(block)

        return block

    def __call__(self, value):
        for column_name in ["columns", "hrefList", "slides"]:
            column_field = value.get(column_name, [])
            if value.get(column_name, False):
                for index, item in enumerate(column_field):
                    for field in ["url", "href", "preview_image"]:
                        if field in item.keys():
                            link = item.get(field, "")
                            if isinstance(link, string_types):
                                value[column_name][index][field] = uid_to_url(link)
                            elif isinstance(link, list):
                                if (
                                    len(link) > 0
                                    and isinstance(link[0], dict)
                                    and "@id" in link[0]
                                ):
                                    result = []
                                    for itemlink in link:
                                        item_clone = deepcopy(itemlink)
                                        item_clone["@id"] = uid_to_url(
                                            item_clone["@id"]
                                        )
                                        result.append(item_clone)

                                    value[column_name][index][field] = result
                                else:
                                    value[column_name][index][field] = [
                                        uid_to_url(linkitem) for linkitem in link
                                    ]

                    # Support for applying transforms to the subblocks in volto-blocks-grid
                    # TODO: It's the upper code needed any longer?
                    self._transform(item)

        return value


@adapter(IBlocks, IBrowserRequest)
@implementer(IBlockFieldDeserializationTransformer)
class NestedResolveUIDSerializer(NestedResolveUIDSerializerBase):
    """ Deserializer for content-types that implements IBlocks behavior """


@adapter(IPloneSiteRoot, IBrowserRequest)
@implementer(IBlockFieldDeserializationTransformer)
class NestedResolveUIDSerializerRoot(NestedResolveUIDSerializerBase):
    """ Deserializer for site root """
