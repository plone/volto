---
html_meta:
  "description": "Integrate Plone backend using the Plone API framework"
  "property=og:description": "Integrate Plone backend using the Plone API framework"
  "property=og:title": "Integration with the backend"
  "keywords": "Volto, Plone, frontend, React, Backend integration"
---

# Integration with the backend

## Plone backend integration

Integration with the Plone CMS is provided by the Plone API framework, namely
[plone.restapi](https://github.com/plone/plone.restapi) and its lower-level
[plone.rest](https://github.com/plone/plone.rest). For details please check
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

### Proxied backend routes

Accessing to images and files are a special use case in Volto.
Usually used as in plain HTML (`src` and `href` attributes) resource calls, they can't be wrapped in a JavaScript backend call.
This is problematic when dealing with protected resources that need the user to be authenticated to access them.
For this reason, this resources are rerouted through an internal route in Node Express server in order to be wrapped with the proper authentication headers.

These proxied backend routes are in place for accessing URLs containing `@@downloads` `@@display-file` and `@@images` backend views.
These are the backend `BrowserView`s routes that retrieve images and file resources.
So the Node Express server take care of proxy and enhancing them at the same time with the authentication headers.

```{note}
This section contains pointers for backend integration with Plone.
Contributions for the Guillotina backend are needed.
```
