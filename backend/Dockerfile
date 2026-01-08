FROM node:20-alpine

WORKDIR /app

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

COPY package*.json ./
RUN npm ci --only=production

COPY . .

USER nodejs

EXPOSE 5000

CMD ["node", "src/server.js"]