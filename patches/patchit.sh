#!/bin/bash
patch --quiet -p0 -N node_modules/razzle/config/createJestConfig.js < patches/razzle-jest.patch
patch --quiet -p0 -N node_modules/razzle/config/loadPlugins.js < patches/razzle-plugins.patch
