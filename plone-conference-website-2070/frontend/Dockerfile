# syntax=docker/dockerfile:1
FROM node:20-slim as base
FROM base as builder

RUN <<EOT
    set -e
    apt update
    apt install -y --no-install-recommends python3 build-essential
    mkdir /app
    chown -R node:node /app
    rm -rf /var/lib/apt/lists/*
EOT

COPY --chown=node . /build/
RUN corepack enable

USER node
WORKDIR /build
RUN <<EOT
    set -e
    make install
    yarn build
EOT

FROM base

LABEL maintainer="Elli <elli@plone.org>" \
      org.label-schema.name="plone-conference-website-2070-frontend" \
      org.label-schema.description="Plone Conference Website 2070 frontend image." \
      org.label-schema.vendor="Elli"

# Install busybox and wget
RUN <<EOT
    set -e
    apt update
    apt install -y --no-install-recommends busybox wget
    busybox --install -s
    rm -rf /var/lib/apt/lists/*
    mkdir /app
    chown -R node:node /app
EOT

# Run the image with user node
USER node

# Copy
COPY --from=builder /build/ /app/

# Set working directory to /app
WORKDIR /app

# Expose default Express port
EXPOSE 3000

# Set healthcheck to port 3000
HEALTHCHECK --interval=10s --timeout=5s --start-period=30s CMD [ -n "$LISTEN_PORT" ] || LISTEN_PORT=3000 ; wget -q http://127.0.0.1:"$LISTEN_PORT" -O - || exit 1

# Entrypoint would be yarn
ENTRYPOINT [ "yarn" ]

# And the image will run in production mode
CMD ["start:prod"]
