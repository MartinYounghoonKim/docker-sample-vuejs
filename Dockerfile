FROM node:carbon

RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV NODE_ENV=local

ADD package.json /usr/src/app/package.json
RUN npm install forever -g

RUN npm install
EXPOSE 3000

CMD npm run serve:local
