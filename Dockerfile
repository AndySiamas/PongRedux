FROM node:7.6-alpine

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN npm install

RUN npm install nodemon

EXPOSE 3002

CMD [ "npm", "run", "server"]