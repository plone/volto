#!/usr/bin/env bash
if [ ! -d "env" ]; then ./install.sh; fi
./env/bin/jupyter notebook
