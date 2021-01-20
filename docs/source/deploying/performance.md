# critical.css (above the fold) optimizations

A very important technique to improve the perceived initial load performance of
a website is to inline the CSS that is used for the first thing the visitors
see, the so-called "above the fold" content.

With a CMS like Plone and its Volto frontend, it is difficult to decide, at
"build time" what exactly represents that optimal "above the fold" CSS. This
CSS could come from various addons installed, it depends on the blocks
activated on the frontpage, etc. So this CSS is something that's very specific
to every deployed website. Fortunately there are ways to automate extracting
the critical CSS. One such tool is provided from the Volto repository:
[critical-css-cli](https://github.com/collective/critical-css-cli) which can
generate a `critical.css` file from a live website. This tool uses internally
[Puppeteer](https://pptr.dev/) and a headless Chrome instance to extract the
critical css from a running website.

Run it like:

```
critical-cli -h
critical-cli https://example.com/ -o critical.css
```

You can pass multiple URLs and screen dimmensions and the extracted CSS will be
optimized (duplicate rules will be eliminated, etc). See the [Advanced preset
of
cssnano](https://cssnano.co/docs/optimisations) for details. One last
optimization applied strips all `@import` declarations from the generated CSS.

Then copy this file to the `public/critical.css` path. When this file exists,
Volto changes the way the CSS files are loaded. By default, the CSS is loaded
with two elements in the `<head>`:

```
<link rel="preload" href="static/1234.chunk.css" as="style"/>
<link rel="stylesheet" href="1234.chunk.css" />
```

With critical.css present, the file content is inlined into a `<style>` tag in
the HTML and the `<link rel="stylesheet" />` links are moved to the bottom of
the generated HTML.
