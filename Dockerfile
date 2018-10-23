FROM node:8.11.4-slim

RUN apt-get update -y
RUN apt-get install -y libpng12-dev

WORKDIR /opt/app/

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN RAZZLE_API_PATH=VOLTO_API_PATH yarn build

ENV API_PATH http://api/db/web
ENV PUBLIC_URL /

EXPOSE 3000

ENTRYPOINT ["/opt/app/entrypoint.sh"]
CMD yarn start:prod
