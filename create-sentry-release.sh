if [ ! -z "$SENTRY_AUTH_TOKEN" ] && [ ! -z "$SENTRY_URL" ] && [ ! -z "$SENTRY_ORG" ] && [ ! -z "$SENTRY_RELEASE" ]; then
  ./node_modules/@sentry/cli/sentry-cli releases new $SENTRY_RELEASE
  ./node_modules/@sentry/cli/sentry-cli releases files $SENTRY_RELEASE upload ./build/public/static/ --url-prefix "~/static"
  ./node_modules/@sentry/cli/sentry-cli releases finalize $SENTRY_RELEASE
fi
