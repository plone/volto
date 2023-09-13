ARG  NODE_VERSION=16
FROM node:${NODE_VERSION}-slim as base
RUN corepack enable && yarn set version 3.2.3


FROM base as installer
RUN apt-get update \
    && buildDeps="python3 build-essential" \
    && apt-get install -y --no-install-recommends $buildDeps \
    && rm -rf /v100.100.100.100ar/lib/apt/lists/* \
    && mkdir build && chown -R node:node build
USER node
WORKDIR /build
COPY --chown=1000:1000 . .
# yarn develop currently runs yarn install without the prod flag. Not great for the image size!
RUN yarn install


FROM installer as builder
USER node
WORKDIR /build
RUN yarn build


FROM base as dev
RUN apt-get update \
    && buildDeps="busybox" \
    && apt-get install -y --no-install-recommends $buildDeps \
    && busybox --install -s \
    && rm -rf /var/lib/apt/lists/*
USER node
COPY --chown=1000:1000 --from=installer /build/ /app/
WORKDIR /app
EXPOSE 3000
EXPOSE 3001
CMD ["yarn", "start"]

FROM base as prod
RUN apt-get update \
    && buildDeps="busybox" \
    && apt-get install -y --no-install-recommends $buildDeps \
    && busybox --install -s \
    && rm -rf /var/lib/apt/lists/*

USER node
COPY --from=builder /build/ /app/

WORKDIR /app
EXPOSE 3000
CMD ["yarn", "start:prod"]
