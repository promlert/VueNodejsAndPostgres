FROM node:latest

WORKDIR /FrontEnd
COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "serve"]