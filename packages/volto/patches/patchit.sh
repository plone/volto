#!/bin/bash
patch --quiet -p0 -N node_modules/@plone/razzle/config/createJestConfig.js < patches/razzle-jest.patch
