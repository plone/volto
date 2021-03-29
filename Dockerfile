FROM node:12-stretch-slim

RUN runDeps="openssl ca-certificates patch" \
 && apt-get update \
 && apt-get install -y --no-install-recommends $runDeps \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /opt/frontend \
 && chown -R node /opt/frontend

WORKDIR /opt/frontend/
RUN npm install -g yo @plone/generator-volto wait-on

USER node
RUN yo --no-insight @plone/volto --no-interactive

RUN RAZZLE_API_PATH=VOLTO_API_PATH RAZZLE_INTERNAL_API_PATH=VOLTO_INTERNAL_API_PATH yarn \
 && RAZZLE_API_PATH=VOLTO_API_PATH RAZZLE_INTERNAL_API_PATH=VOLTO_INTERNAL_API_PATH yarn build

COPY entrypoint.sh /

EXPOSE 3000 3001 4000 4001

ENTRYPOINT ["/entrypoint.sh"]
CMD ["yarn", "start:prod"]
