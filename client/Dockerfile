
FROM node:12.20.1-alpine as build

RUN mkdir /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build
FROM nginx:1.17.1-alpine

COPY --from=build /app/build /usr/share/nginx/html