FROM node:12.20.1-alpine as build

WORKDIR /app

COPY package.json /app/package.json

RUN npm install

RUN npm install react-scripts -g

COPY . /app

RUN npm run build

# => Run container
FROM nginx

COPY --from=build /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

# Start Nginx server
CMD ["/bin/bash", "-c", "nginx -g \"daemon off;\""] 
