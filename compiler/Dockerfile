# Use Node.js base image
FROM node:18-alpine

# Install compilers/interpreters for Alpine Linux
RUN apk update && \
    apk add --no-cache g++ python3 py3-pip openjdk17 && \
    rm -rf /var/cache/apk/*

# Create app directory
WORKDIR /usr/src/app

# Install Node dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose the port your backend listens on
EXPOSE 8100

# Start the compiler server
CMD ["npm", "run", "dev"]
