FROM node:8.11.4-slim

RUN apt-get update -y 
RUN apt-get install -y libpng12-dev

WORKDIR /opt/app/

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

ENV API_PATH http://api/db/web
ENV API guillotina

CMD yarn start