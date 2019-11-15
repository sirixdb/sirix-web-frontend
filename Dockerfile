FROM node:11.13.0-alpine

# create destination directory
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

# update and install dependency
RUN apk update && apk upgrade
RUN apk add --no-cache --virtual deps \
  git \
  python \
  build-base

# copy the app, note .dockerignore
COPY . /usr/src/nuxt-app/
RUN npm install --global node-gyp
RUN npm i g
RUN apk del deps

# build necessary, even if no static files are needed,
# since it builds the server as well
RUN npm run build

# expose 3005 on container
EXPOSE 3005

# set app serving to permissive / assigned
ENV NUXT_HOST=0.0.0.0
# set app port
ENV NUXT_PORT=3005

# start the app
CMD [ "npm", "start" ]
