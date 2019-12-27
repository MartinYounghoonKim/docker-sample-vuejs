FROM node:carbon

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install nodemon -g

RUN npm install
EXPOSE 4000

COPY . .

CMD npm run server:dev
