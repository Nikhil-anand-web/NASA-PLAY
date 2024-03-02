FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./
COPY test.js ./
COPY client/package*.json client/
COPY server/package*.json server/
RUN npm run i

COPY client/ client/
RUN npm run build --prefix client
COPY server/ server/
USER node

CMD ["npm","run","server_pro"]

EXPOSE 8002