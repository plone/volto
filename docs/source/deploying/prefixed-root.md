---
html_meta:
  "description": ""
  "property=og:description": ""
  "property=og:title": ""
  "keywords": ""
---

# Prefixed (non-root) deployment

If you're integrating a Volto website with another, existing website, you may
need to have Volto running on an "folder" inside that website, rather than
having Volto serve directly the root folder.

The first step is to set an environment variable, `RAZZLE_PREFIX_PATH` to the
path "prefixed path" of your Volto. For example, if I want Volto's root to be
hosted at https://example.com/my/volto/site, you need to start Volto with:

```
RAZZLE_PREFIX_PATH=my/volto/site yarn start
```

Notice the absence of the first slash. Correct: `my-prefix`, incorrect:
`/my-prefix`.
