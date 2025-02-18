FROM node:18
RUN mkdir -p /var/www/user-ratings-service
WORKDIR /var/www/user-ratings-service
ADD . /var/www/user-ratings-service
RUN npm install
CMD npm run build && npm run start:prod