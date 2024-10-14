### Defensive settings for make:
#     https://tech.davis-hansson.com/p/make/
SHELL:=bash
.ONESHELL:
.SHELLFLAGS:=-eu -o pipefail -c
.SILENT:
.DELETE_ON_ERROR:
MAKEFLAGS+=--warn-undefined-variables
MAKEFLAGS+=--no-builtin-rules

# Sphinx variables
# You can set these variables from the command line.
SPHINXOPTS      ?=
VALEOPTS        ?=
# Internal variables.
SPHINXBUILD     = "$(realpath bin/sphinx-build)"
SPHINXAUTOBUILD = "$(realpath bin/sphinx-autobuild)"
DOCS_DIR        = ./docs/
BUILDDIR        = ./_build/
ALLSPHINXOPTS   = -d $(BUILDDIR)/doctrees $(SPHINXOPTS) .
VALEFILES       := $(shell find $(DOCS_DIR) -type f -name "*.md" -print)

# We like colors
# From: https://coderwall.com/p/izxssa/colored-makefile-for-golang-projects
RED=`tput setaf 1`
GREEN=`tput setaf 2`
RESET=`tput sgr0`
YELLOW=`tput setaf 3`

## Docs

bin/python: ## Create a Python virtual environment with the latest pip, and install documentation requirements
	python3 -m venv . || virtualenv --clear --python=python3 .
	bin/python -m pip install --upgrade pip
	@echo "Python environment created."
	bin/pip install -r ../../requirements-docs.txt
	@echo "Requirements installed."

.PHONY: docs-clean
docs-clean:  ## Clean current and legacy docs build directories, and Python virtual environment
	rm -rf bin include lib
	rm -rf docs/_build
	cd $(DOCS_DIR) && rm -rf $(BUILDDIR)/

.PHONY: docs-html
docs-html: bin/python  ## Build html
	cd $(DOCS_DIR) && $(SPHINXBUILD) -b html $(ALLSPHINXOPTS) $(BUILDDIR)/html
	@echo
	@echo "Build finished. The HTML pages are in $(BUILDDIR)/html."

.PHONY: docs-livehtml
docs-livehtml: bin/python  ## Rebuild Sphinx documentation on changes, with live-reload in the browser
	cd "$(DOCS_DIR)" && ${SPHINXAUTOBUILD} \
		--ignore "*.swp" \
		-b html . "$(BUILDDIR)/html" $(SPHINXOPTS)

.PHONY: docs-linkcheck
docs-linkcheck: bin/python  ## Run linkcheck
	cd $(DOCS_DIR) && $(SPHINXBUILD) -b linkcheck $(ALLSPHINXOPTS) $(BUILDDIR)/linkcheck
	@echo
	@echo "Link check complete; look for any errors in the above output " \
		"or in $(BUILDDIR)/linkcheck/ ."

.PHONY: docs-linkcheckbroken
docs-linkcheckbroken: bin/python  ## Run linkcheck and show only broken links
	cd $(DOCS_DIR) && $(SPHINXBUILD) -b linkcheck $(ALLSPHINXOPTS) $(BUILDDIR)/linkcheck | GREP_COLORS='0;31' grep -wi "broken\|redirect" --color=always | GREP_COLORS='0;31' grep -vi "https://github.com/plone/volto/issues/" --color=always && if test $$? -eq 0; then exit 1; fi || test $$? -ne 0

.PHONY: docs-vale
docs-vale: bin/python  ## Install (once) and run Vale style, grammar, and spell checks
	bin/vale sync
	bin/vale --no-wrap $(VALEOPTS) $(VALEFILES)
	@echo
	@echo "Vale is finished; look for any errors in the above output."

.PHONY: docs-rtd-pr-preview
docs-rtd-pr-preview: ## Build previews of pull requests that have documentation changes on Read the Docs via CI
	pip install -r requirements-docs.txt
	cd $(DOCS_DIR) && sphinx-build -b html $(ALLSPHINXOPTS) ${READTHEDOCS_OUTPUT}/html/

.PHONY: docs-rtd-registry
docs-rtd-registry: ## Build Plone Registry docs on RTD
	pip install -r ../../requirements-docs.txt && cd $(DOCS_DIR) && sphinx-build -b html $(ALLSPHINXOPTS) ${READTHEDOCS_OUTPUT}/html/

## Build

.PHONY: rename-to-cjs
rename-to-cjs: ## Rename the built files js -> cjs
	mv dist/cjs/addon-registry.js dist/cjs/addon-registry.cjs
	mv dist/cjs/create-addons-loader.js dist/cjs/create-addons-loader.cjs
	mv dist/cjs/create-theme-loader.js dist/cjs/create-theme-loader.cjs
