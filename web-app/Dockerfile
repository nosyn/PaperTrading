FROM node:alpine

WORKDIR /web-app
RUN pwd
COPY . .

RUN yarn --non-interactive install

CMD ["yarn", "run", "start"]