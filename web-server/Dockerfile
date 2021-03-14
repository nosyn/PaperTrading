FROM node:alpine

WORKDIR /web-server 

COPY package.json yarn.lock ./

RUN yarn --non-interactive --production

COPY . .

CMD ["yarn","run" ,"start"]




