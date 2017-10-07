# Dockerfile (tag: v3)
FROM mhart/alpine-node:8.4.0

WORKDIR /usr/src/app

COPY package.json package.json

RUN npm install --no-optional

CMD [ "npm", "run", "production" ]
