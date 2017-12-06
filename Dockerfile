# Dockerfile (tag: v3)
FROM mhart/alpine-node:8.9.1

WORKDIR /

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install

CMD [ "npm", "run", "export" ]
