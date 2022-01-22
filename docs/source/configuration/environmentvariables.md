---
html_meta:
  "description": ""
  "property=og:description": ""
  "property=og:title": ""
  "keywords": ""
---

# Environment variables

All the environment variables defined at runtime that have the "RAZZLE_" prefix, are available in the browser under window.env

ex:
If we start the application with an env variable

```bash
RAZZLE_MY_VARIABLE=some_value build/server.js
```

In the frontend we can access this variable with:

```bash
window.env.RAZZLE_MY_VARIABLE
```

## RAZZLE_LEGACY_TRAVERSE

From Volto 14 onwards, Seamless mode is the recommended way of setting up your depoloyments. However, it forces you to upgrade several packages in the backend (`plone.restapi` and `plone.rest`) and adjust your web server configuration accordingly.

In case you can't afford or change your deployment, you can still upgrade Volto by using the `RAZZLE_LEGACY_TRAVERSE` flag.

```bash
RAZZLE_LEGACY_TRAVERSE=true yarn start:prod
```

## VOLTO_ROBOTSTXT

You can override the robots.txt file with an environment variable called
`VOLTO_ROBOTSTXT`. This is useful when using the same build on multiple
websites (for example a test website) to forbid robots from crawling it.

```
$ VOLTO_ROBOTSTXT="User-agent: *
Disallow: /" yarn start
```

!!! note
    If you want to use the `VOLTO_ROBOTSTXT` environment variable, make sure to
    delete the file `public/robots.txt` from your project.


### DEBUG

It will enable the log several logging points scattered through the Volto code. It uses the `volto:` namespace.

```bash
DEBUG=volto:i18n yarn start
```

or

```bash
DEBUG=volto:shadowing yarn start
```

also

```bash
DEBUG=volto:* yarn start
```

#### Component Shadowing errors (shadowing)

It displays the errors of the non-compliant customizations (in server console) if you are experiencing problems with a customization not working.

#### Internationalization errors (i18n)

It will enable the log of missing i18n messages (in console).
