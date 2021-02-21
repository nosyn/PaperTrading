FROM node:alpine

ENV PORT=5000

WORKDIR /server

COPY . .

RUN yarn --non-interactive

CMD ["yarn", "start"]




