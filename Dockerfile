# build image for local development

FROM node:22-alpine AS development

USER node

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm ci

# Bundle app source
COPY . .

# Expose port
EXPOSE 4000

# Command to run the app
CMD [ "npm", "run", "start" ]
