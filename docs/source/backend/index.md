# Integration with the backend

## Plone backend integration

Integration with the Plone CMS is provided by the Plone API framework, namely
[plone.restapi](https://github.com/plone/plone.restapi.git) and its lower-level
[plone.rest](https://github.com/plone/plone.rest.git). For details please check
the plone.restapi [documentation website](https://plonerestapi.readthedocs.io/en/latest/).

Some of the more interesting integration features that you can look up in the
plone.restapi documentation:

- **Endpoints**: the equivalent of Plone "views", these are REST Api endpoints
  that you can call from the frontend. The response should be in JSON format.
  You'll use these for any type of interaction with the backend.
- **Content expansions**: additional information that can be added to the main
  response. For example, when fetching "content" information, you may want to
  also include information about the author, so you could write an expand that
  automatically inserts that information if the `?expand=author` is present in
  the request. It is also possible to create expand elements that will
  automatically insert their content in the response, without the need for the
  request parameter.
- **Block transformers**: these are named subscribers that can be used to
  automatically change the information that is sent to the frontend for some of
  the blocks, but they can also do the opposite, to process the information
  coming from the frontend (on create or update operations) and change the way
  the block value is stored in the database. There are multiple use cases for
  this type of feature, for example to automatically convert incoming links in
  block values to resolveuid-based links (and to convert them back to absolute
  URLs when retrieving the block value from the frontend).
- **Search and indexing integration**: by providing the right adapters, you can
  extract searchable text from blocks.

!!! note
    This section contains pointers for backend integration with Plone.
    Contributions for the Guillotina backend are needed.

