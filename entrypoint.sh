#!/usr/bin/env bash
set -Ex

REBUILD=""

if [ -z "$API_PATH" ]; then
  API_PATH="http://localhost:8080/Plone"
fi

if [ -z "$INTERNAL_API_PATH" ]; then
  INTERNAL_API_PATH="http://plone:8080/Plone"
fi

function apply_volto {
    yo --force --no-insight @plone/volto --volto=$VOLTO --no-interactive --skip-install
    REBUILD="$REBUILD $VOLTO"
}

function apply_addons {
    install=""
    for addon in $ADDONS; do
      install="$install --addon $addon"
    done
    if [ -z "$VOLTO" ]; then
        VOLTO=$(jq -r '.dependencies["@plone/volto"]' package.json)
    fi
    yo --force --no-insight @plone/volto --volto=$VOLTO --no-interactive --skip-install $install
    REBUILD="$REBUILD $ADDONS"
}

function apply_rebuild {
  RAZZLE_API_PATH=VOLTO_API_PATH RAZZLE_INTERNAL_API_PATH=VOLTO_INTERNAL_API_PATH yarn
  RAZZLE_API_PATH=VOLTO_API_PATH RAZZLE_INTERNAL_API_PATH=VOLTO_INTERNAL_API_PATH yarn build
}

function apply_path {
    mainjs=./build/server.js
    bundlejs=./build/public/static/js/*.js
    test -f $mainjs

    echo "Check that we have API_PATH and API vars"
    test -n "$API_PATH"

    echo "Changing built files inplace"
    sed -i "s#VOLTO_API_PATH#${API_PATH}#g" $mainjs
    sed -i "s#VOLTO_API_PATH#${API_PATH}#g" $bundlejs
    sed -i "s#VOLTO_INTERNAL_API_PATH#${INTERNAL_API_PATH}#g" $mainjs
    sed -i "s#VOLTO_INTERNAL_API_PATH#${INTERNAL_API_PATH}#g" $bundlejs

    echo "Zipping JS Files"
    gzip -fk $mainjs
}

# Should we install other version of Volto?
test -n "$VOLTO" && apply_volto

# Should we install any Volto add-on?
test -n "$ADDONS" && apply_addons

# Should we re-build
test -n "$REBUILD" && apply_rebuild

# Should we monkey patch?
test -n "$API_PATH" && apply_path

# Sentry
./create-sentry-release.sh

echo "Starting Volto"
exec "$@"
