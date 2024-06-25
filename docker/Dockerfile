FROM node:alpine

RUN apk update && apk add bash
WORKDIR /cache
COPY package.json .
COPY yarn.lock .
RUN yarn
WORKDIR /app
COPY . .
ENV PATH /app/node_modules/.bin:$PATH
