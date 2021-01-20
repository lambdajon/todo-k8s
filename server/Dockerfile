FROM node:12.20.1-alpine 

WORKDIR /server

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "node", "server.js" ]
