#!/usr/bin/env bash
PARAM=$1
if [ -z $PARAM ]; then
  PARAM='not forced'
fi
if [ ! -z "$SENTRY_AUTH_TOKEN" ] && [ ! -z "$SENTRY_URL" ] && [ ! -z "$SENTRY_ORG" ] && [ ! -z "$SENTRY_PROJECT" ] && [ ! -z "$SENTRY_RELEASE" ]; then
  CREATE=1
  if [[ ! $PARAM = '--force' ]]; then
    if ./node_modules/@sentry/cli/sentry-cli releases info $SENTRY_RELEASE | grep -q $SENTRY_RELEASE; then
      CREATE=0
    fi
  fi
  if [ $CREATE = 1 ]; then
    ./node_modules/@sentry/cli/sentry-cli releases new $SENTRY_RELEASE
    ./node_modules/@sentry/cli/sentry-cli releases files $SENTRY_RELEASE upload ./build/public/static/ --url-prefix "~/static"
    ./node_modules/@sentry/cli/sentry-cli releases finalize $SENTRY_RELEASE
  fi
  if [ $CREATE = 0 ]; then
    echo "Release $SENTRY_RELEASE already exists"
    echo "Use --force if you still want to upload the source maps"
  fi
else
  echo "SENTRY is not configured"
fi
