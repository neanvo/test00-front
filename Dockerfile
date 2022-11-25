FROM node:19-alpine3.15 as build

ARG SERVER_PORT=null
ARG SERVER_DOMAIN=null
ENV SERVER_PORT=${SERVER_PORT}
ENV SERVER_DOMAIN=${SERVER_DOMAIN}

USER root

RUN set -eux \
    & apk add \
    --no-cache \
    nodejs \
    yarn

WORKDIR /app

COPY ./public /app/public
COPY ./src /app/src
COPY ./tsconfig.json /app
COPY ./package.json /app
COPY ./package-lock.json /app

RUN yarn install --only=production

RUN yarn build

FROM nginx:latest

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html
