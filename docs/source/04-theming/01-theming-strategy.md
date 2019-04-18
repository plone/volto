# Theming Strategy

One approaches the theming of a Volto site usually with a predefined mockup or
design from a design agency or an UX/UI designer in the form of Sketch files
(a common design and prototyping tool), a series of photoshop or PDFs with the
desired result on how the site would look like showing the homepage, landing
pages, different views, inner pages, etc.

The strategy is to try to map what Volto already provides like the headers,
breadcrumbs, footer, main content area, etc to the mockup ones. Then decide
which ones will stay as they are (not customized) and which ones will be
required to be customized.

There is a great chance that the vast majority of components (and main building
blocks) will remain the same, only modified by how they look by using basic
styling (CSS) theming.

As an example, if you need to customize the logo, there is a big chance that you
only need to replace and customize the svg file that the `Logo.jsx` component
exposes, without having to customize the whole component.

The same might apply for other components or big block components, like the
`Header.jsx`.

Before you start, it is advisable to try to familiarize yourself with how Volto
is built. Take a look at its building blocks in order to not repeat yourself.
Take a tour inside the `components` folder, and try to map all the components
with Volto page. Try to figure out what is the frame, the part that is constant
(header, content area, footer), the moving parts, then go to the more complex
ones (widgets, forms, etc). Then start theming the components per blocks 
(header, content area, footer).

Try to stick with the container and grid model of Semantic UI, including its
breakpoints (and helpers). Use React Semantic UI building blocks whenever it's
possible since it will help you things fit together easily.

# Talks

You might find interesting this talk as resource on how theming works in Volto:

https://2018.ploneconf.org/talks/theming-plone-react
