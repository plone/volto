FROM node:10.14.2-slim

RUN apt-get update -y
# RUN apt-get install -y libpng12-dev

WORKDIR /opt/app/

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN RAZZLE_API_PATH=VOLTO_API_PATH yarn build

ENV PUBLIC_URL /

EXPOSE 3000

ENTRYPOINT ["/opt/app/entrypoint.sh"]
CMD yarn start:prod
