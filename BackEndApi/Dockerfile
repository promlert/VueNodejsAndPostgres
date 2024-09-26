# FROM node:bullseye-slim
# #FROM gcr.io/distroless/nodejs
# #MAKE WORKING DIRECTORY AND LOGS DIRECTORY

# RUN mkdir -p /home/www/node/node_modules && chown -R node:node /home/www/node

# RUN mkdir -p /var/log/supervisor && chown -R node:node /var/log/supervisor

# WORKDIR /home/www/node
# COPY package*.json ./
# RUN npm install

# # COPY . .
# # EXPOSE 3000
# CMD [ "node", "server.js" ]

# COPY --chown=node:node . ./

# EXPOSE 3000


FROM node:20.8.1-bullseye-slim AS build-env
COPY . /app
WORKDIR /app

RUN npm ci --omit=dev

FROM gcr.io/distroless/nodejs20-debian12
COPY --from=build-env /app /app
WORKDIR /app

EXPOSE 3000
CMD ["server.js"]




