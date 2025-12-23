#server
#DOCKERFILE instruction to run backend

FROM node:20-alpine

WORKDIR/app

#Copies the packages
COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 5000
CMD ["node","server.js"]