FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache ca-certificates

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 10000
CMD ["node","src/server.js"]
