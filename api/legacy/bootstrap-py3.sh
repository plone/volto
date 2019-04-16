#!/bin/sh
# Prerequisites: Python 3.7
# Usage:
#     ./bootstrap-py3.sh
rm -r ./lib ./include ./local ./bin
`which python3.7` -m venv .
./bin/pip install -r https://raw.githubusercontent.com/plone/buildout.coredev/5.2/requirements.txt
./bin/buildout -c buildout-py3.cfg
echo "run plone with: ./bin/wsgi"

