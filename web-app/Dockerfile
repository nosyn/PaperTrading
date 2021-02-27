FROM node:alpine

WORKDIR /web-app

COPY . .

RUN yarn --non-interactive install

CMD ["yarn", "run", "start"]