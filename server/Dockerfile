FROM node:latest

ENV PORT=5000

WORKDIR /app
COPY . .
RUN yarn --non-interactive install

CMD ["yarn", "start"]




