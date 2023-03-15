---
myst:
  html_meta:
    "description": "Integrate Plone backend using the Plone API framework"
    "property=og:description": "Integrate Plone backend using the Plone API framework"
    "property=og:title": "Integration with the backend"
    "keywords": "Volto, Plone, frontend, React, Backend integration"
---

# Integration with the backend

Integration with the Plone CMS is provided by the Plone API framework, namely [`plone.restapi`](https://github.com/plone/plone.restapi) and its lower-level [`plone.rest`](https://github.com/plone/plone.rest).
For details, check the {doc}`plone.restapi/docs/source/index` documentation.

Some of the more interesting integration features that you can look up in the `plone.restapi` documentation include the following.

Endpoints
:   The equivalent of Plone "views", these are REST API endpoints that you can call from the frontend.
    The response should be in JSON format.
    You'll use these for any type of interaction with the backend.

Content expansions
:   Additional information that can be added to the main response.
    For example, when fetching "content" information, you may want to also include information about the author.
    You could write an expansion that automatically inserts that information if the HTTP GET parameter `?expand=author` is present in the request.
    It is also possible to create expansion elements that will automatically insert their content in the response, without the need for the request parameter.

Block transformers
:   These are named subscribers that can be used to automatically change the information that is sent to the frontend for some of the blocks.
    They can also do the opposite, to process the information coming from the frontend on create or update operations, and change the way the block value is stored in the database.
    There are multiple use cases for this type of feature.
    For example to automatically convert incoming links in block values to resolveuid-based links, and to convert them back to absolute URLs when retrieving the block value from the frontend.

Search and indexing integration
:   By providing the right adapters, you can extract searchable text from blocks.


## Proxied backend routes

Access to images and files are a special use case in Volto.
Usually in plain HTML, `src` and `href` attributes resource calls cannot be wrapped in a JavaScript backend call.
This is problematic when dealing with protected resources that need the user to be authenticated to access them.
For this reason, these resources are rerouted through an internal route in Node Express server and wrapped with the proper authentication headers.

These proxied backend routes are in place for accessing URLs containing `@@downloads` `@@display-file`, and `@@images` backend views.
These are the backend `BrowserView`s routes that retrieve images and file resources.
Thus the Node Express server takes care of proxying and enhancing them at the same time as the authentication headers.

```{todo}
This section contains pointers for backend integration with Plone.
Contributions for the Guillotina backend are needed.
See https://github.com/plone/volto/issues/4430
```
