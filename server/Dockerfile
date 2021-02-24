FROM node:alpine

ENV PORT=5000

WORKDIR /server

COPY package.json yarn.lock ./

RUN yarn --non-interactive --production

COPY . .

CMD ["yarn","run" ,"start"]




