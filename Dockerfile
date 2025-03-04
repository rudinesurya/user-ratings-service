FROM node:18
RUN mkdir -p /var/www/user-ratings-service
WORKDIR /var/www/user-ratings-service
# Accept a build argument for the .npmrc content.
ARG NPMRC_CONTENT
# If NPMRC_CONTENT is provided, create /root/.npmrc with its contents.
RUN if [ -n "$NPMRC_CONTENT" ]; then echo "$NPMRC_CONTENT" > /root/.npmrc; fi
ADD . /var/www/user-ratings-service
RUN npm install
CMD npm run build && npm run start:prod