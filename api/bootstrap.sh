#!/bin/sh
# Prerequisites: Python 2.7, virtualenv.
# Usage:
#     ./bootstrap.sh  # use buildout.cfg
#     ./bootstrap.sh -c coredev.cfg  # use coredev.cfg
rm -r ./lib ./include ./local ./bin
virtualenv -p python2.7 --clear .
./bin/pip install -r https://dist.plone.org/release/5.1-latest/requirements.txt
./bin/buildout "$@"
