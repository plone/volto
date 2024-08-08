# syntax=docker/dockerfile:1
ARG VOLTO_VERSION
FROM plone/frontend-builder:${VOLTO_VERSION} as builder

ARG ADDON_NAME
ARG ADDON_PATH

# Copy addon code
COPY --chown=node:node ./ /app/src/addons/${ADDON_PATH}/

# Install
RUN <<EOT
    set -e
    /setupAddon
    yarn install --network-timeout 1000000
    yarn build
    rm -rf cache omelette .yarn/cache
EOT

FROM plone/frontend-prod-config:${VOLTO_VERSION}

LABEL maintainer="maintainer <maintainer@plone.org>" \
      org.label-schema.name="ghcr.io/voltovolto-project" \
      org.label-schema.description="Volto project with volto-volto-project" \
      org.label-schema.vendor="Plone CMS"

COPY --from=builder /app/ /app/
