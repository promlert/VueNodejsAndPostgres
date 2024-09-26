FROM node:20.8.1-bullseye-slim
#FROM gcr.io/distroless/nodejs22-debian12
#WORKDIR /FrontEnd
RUN mkdir -p /home/www/node/node_modules && chown -R node:node /home/www/node

RUN mkdir -p /var/log/supervisor && chown -R node:node /var/log/supervisor

WORKDIR /home/www/node
COPY package*.json ./
RUN npm install


RUN npm ci --only=production

COPY --chown=node:node . ./

CMD ["npm", "run", "serve"]

# ARG BUILD_IMAGE=node:20.1.0
# ARG RUN_IMAGE=gcr.io/distroless/nodejs20-debian11

# # Build stage
# FROM $BUILD_IMAGE AS build-env


# COPY . /app
# WORKDIR /app
# RUN npm ci && npm run build
# # Prepare production dependencies
# FROM $BUILD_IMAGE AS deps-env
# COPY package.json package-lock.json ./
# RUN npm ci --omit=dev

# # Create final production stage
# FROM $RUN_IMAGE AS run-env
# WORKDIR /usr/app
# COPY --from=deps-env /node_modules ./node_modules
# COPY --from=build-env /app/build ./build
# COPY package.json ./

# ENV NODE_ENV="production"

# CMD ["npm", "run", "serve"]
