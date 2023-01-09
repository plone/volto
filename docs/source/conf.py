# Configuration file for the Sphinx documentation builder.
# Plone Documentation build configuration file


# -- Path setup --------------------------------------------------------------

from datetime import datetime

# If extensions (or modules to document with autodoc) are in another directory,
# add these directories to sys.path here. If the directory is relative to the
# documentation root, use os.path.abspath to make it absolute, like shown here.
#
# import os
# import sys
# sys.path.insert(0, os.path.abspath("."))

import os
import json

# -- Project information -----------------------------------------------------

project = "Volto Documentation"
copyright = "Volto Foundation"
author = "the Plone community"
trademark_name = "Plone"
now = datetime.now()
year = str(now.year)

# The version info for the project you're documenting, acts as replacement for
# |version| and |release|, also used in various other places throughout the
# built documents.
#

with open(os.path.join(os.path.abspath('.'), '../../package.json'), 'r') as package_json:
    data=package_json.read()

version_from_package_json = json.loads(data)['version']

if version_from_package_json:
    # The short X.Y version.
    version = version_from_package_json
    # The full version, including alpha/beta/rc tags.
    release = version_from_package_json
else:
    version = "14.8.1"
    release = "14.8.1"

# -- General configuration ----------------------------------------------------

# Add any paths that contain templates here, relative to this directory.
templates_path = ["_templates"]

# Add any Sphinx extension module names here, as strings.
# They can be extensions coming with Sphinx (named "sphinx.ext.*")
# or your custom ones.
extensions = [
    "myst_parser",
    "sphinx.ext.autodoc",
    "sphinx.ext.ifconfig",
    "sphinx.ext.intersphinx",
    "sphinx.ext.todo",
    "sphinx_copybutton",
    "sphinxext.opengraph",
]


# If true, the Docutils Smart Quotes transform, originally based on SmartyPants
# (limited to English) and currently applying to many languages, will be used
# to convert quotes and dashes to typographically correct entities.
# Note to maintainers: setting this to `True` will cause contractions and
# hyphenated words to be marked as misspelled by spellchecker.
smartquotes=False

# The name of the Pygments (syntax highlighting) style to use.
# pygments_style = "sphinx.pygments_styles.PyramidStyle"
pygments_style = "sphinx"

# Options for the linkcheck builder
# Ignore localhost
linkcheck_ignore = [
    # TODO: Before release, clean up any links to ignore
    r"http://localhost",
    r"http://0.0.0.0",
    r"http://127.0.0.1",
    r"https://www.linode.com/",
    r"https://github.com/plone/documentation/issues/new/choose",  # requires auth
    # Ignore specific anchors
    r"https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors#Identifying_the_issue",
    r"https://docs.cypress.io/guides/references/migration-guide#Migrating-to-Cypress-version-10-0",
    r"https://github.com/browserslist/browserslist#queries",
    r"https://github.com/nodejs/release#release-schedule",
    r"https://github.com/plone/plone.docker#for-basic-usage",
    r"https://github.com/plone/plone.rest#cors",
    r"https://github.com/plone/plone.volto/blob/6f5382c74f668935527e962490b81cb72bf3bc94/src/kitconcept/volto/upgrades.py#L6-L54",
    r"https://github.com/plone/volto/issues/new/choose",
    r"https://github.com/tc39/proposals/blob/HEAD/finished-proposals.md#finished-proposals",
]
linkcheck_anchors = True
linkcheck_timeout = 10
linkcheck_retries = 2

# This is our wordlist with known words, like Github or Plone ...
spelling_word_list_filename = "spelling_wordlist.txt"
spelling_ignore_pypi_package_names = True

# The suffix of source filenames.
source_suffix = {
    ".md": "markdown",
}

# The master toctree document.
master_doc = "index"

# List of patterns, relative to source directory, that match files and
# directories to ignore when looking for source files.
# This pattern also affects html_static_path and html_extra_path.
exclude_patterns = [
    "spelling_wordlist.txt",
    "**/CHANGES.rst",
    "**/LICENSE.rst",
    "developer-guidelines/branch-policy.md",
]

html_extra_path = [
    "robots.txt",
]

html_static_path = [
    "_static",
]

# -- Options for myST markdown conversion to html -----------------------------

# For more information see:
# https://myst-parser.readthedocs.io/en/latest/syntax/optional.html
myst_enable_extensions = [
    "deflist",  # You will be able to utilise definition lists
                # https://myst-parser.readthedocs.io/en/latest/syntax/optional.html#definition-lists
    "linkify",  # Identify “bare” web URLs and add hyperlinks.
    "colon_fence",  # You can also use ::: delimiters to denote code fences,\
                    #  instead of ```.
]


# -- Intersphinx configuration ----------------------------------

# This extension can generate automatic links to the documentation of objects
# in other projects. Usage is simple: whenever Sphinx encounters a
# cross-reference that has no matching target in the current documentation set,
# it looks for targets in the documentation sets configured in
# intersphinx_mapping. A reference like :py:class:`zipfile.ZipFile` can then
# linkto the Python documentation for the ZipFile class, without you having to
# specify where it is located exactly.
#
# https://www.sphinx-doc.org/en/master/usage/extensions/intersphinx.html
#
intersphinx_mapping = {
    "plone": ("https://6.docs.plone.org/", None),
    "python": ("https://docs.python.org/3/", None),
    "training": ("https://training.plone.org/", None),
}


# -- GraphViz configuration ----------------------------------

graphviz_output_format = "svg"


# -- OpenGraph configuration ----------------------------------

ogp_site_url = "https://6.docs.plone.org/"
ogp_description_length = 200
ogp_image = "https://6.docs.plone.org/_static/Plone_logo_square.png"
ogp_site_name = "Plone Documentation"
ogp_type = "website"
ogp_custom_meta_tags = [
    '<meta property="og:locale" content="en_US" />',
]


# -- sphinx_copybutton -----------------------
copybutton_prompt_text = r"^ {0,2}\d{1,3}"
copybutton_prompt_is_regexp = True


# -- Options for HTML output -------------------------------------------------

# The theme to use for HTML and HTML Help pages.  See the documentation for
# a list of builtin themes.
#
html_theme = "sphinx_book_theme"

html_logo = "_static/logo.svg"
html_favicon = "_static/favicon.ico"

html_css_files = ["custom.css",
                  ("print.css", {"media": "print"})]

# See http://sphinx-doc.org/ext/todo.html#confval-todo_include_todos
todo_include_todos = True

# Announce that we have an opensearch plugin
# https://www.sphinx-doc.org/en/master/usage/configuration.html#confval-html_use_opensearch
html_use_opensearch = "https://6.docs.plone.org"

html_theme_options = {
    # TODO: Either get a separate GA ID or enable this one once it is in production.
    # "google_analytics_id": "UA-1907133-6",
    "path_to_docs": "docs",
    "repository_url": "https://github.com/plone/volto",
    "repository_branch": "main",
    "use_repository_button": True,
    "use_issues_button": True,
    "use_edit_page_button": True,
    "extra_navbar": """
    <p class="ploneorglink">
        <a href="https://plone.org">
            <img src="/_static/logo.svg" alt="plone.org" /> plone.org</a>
    </p>""",
    "extra_footer": """<p>The text and illustrations in this website are licensed by the Plone Foundation under a Creative Commons Attribution 4.0 International license. Plone and the Plone® logo are registered trademarks of the Plone Foundation, registered in the United States and other countries. For guidelines on the permitted uses of the Plone trademarks, see <a href="https://plone.org/foundation/logo">https://plone.org/foundation/logo</a>. All other trademarks are owned by their respective owners.</p>
    <p><a href="https://www.netlify.com">
  <img src="https://www.netlify.com/img/global/badges/netlify-color-bg.svg" alt="Deploys by Netlify" />
</a></p>""",
}

# The name for this set of Sphinx documents.  If None, it defaults to
# "<project> v<release> documentation".
html_title = "%(project)s v%(release)s" % {"project": project, "release": release}

# If false, no index is generated.
html_use_index = True

# -- Options for HTML help output -------------------------------------------------

# Output file base name for HTML help builder.
htmlhelp_basename = "VoltoDocumentation"


# -- Options for LaTeX output -------------------------------------------------

# Grouping the document tree into LaTeX files. List of tuples
# (source start file, target name, title, author, documentclass [howto/manual])
latex_documents = [
    ("index", "VoltoDocumentation.tex", "Volto Documentation",
     "The Plone community", "manual"),
]

# The name of an image file (relative to this directory) to place at the top of
# the title page.
latex_logo = "_static/logo_2x.png"

def setup(app):
    app.add_config_value("context", "volto", "env")
