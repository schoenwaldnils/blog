# Dockerfile (tag: v3)
FROM mhart/alpine-node:8.9.1

# ----- install git -----
RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh ca-certificates && \
    update-ca-certificates && \
    mkdir -p /root/.ssh && \
    ssh-keyscan -t rsa github.com > ~/.ssh/known_hosts
# ----- /install git -----

WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install

CMD [ "npm", "run", "production" ]
