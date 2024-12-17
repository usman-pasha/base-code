FROM node:18.17.1

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

COPY nginx.conf /nginx.conf


CMD [ "npm","start" ]