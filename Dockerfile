FROM node:carbon-alpine
WORKDIR /app

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

COPY package*.json ./

RUN npm install babel-cli -g
RUN npm install

COPY . .

RUN npm run build

EXPOSE $PORT

CMD /wait && npm run sync-db && npm run start
