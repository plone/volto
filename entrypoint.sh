#!/usr/bin/env bash
set -Ex

function apply_path {
    mainjs=./dist/main*.js
    test -f $mainjs

    echo "Check that we have API_PATH and API vars"
    test -n "$API_PATH"
    test -n "$API"

    sed -i "s#PLONE_REACT_API_PATH#${API_PATH}#g" $mainjs
    sed -i "s#PLONE_REACT_API_SERVICE#${API}#g" $mainjs

    gzip -fk $mainjs
}

# Should we monkey patch?
test -n "$API_PATH" && apply_path

echo "Starting Guillotina"
exec "$@"