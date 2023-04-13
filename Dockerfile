# Use the official Node.js base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files into the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the API files into the container
COPY . .

# Install PostgreSQL
RUN apt-get update \
    && apt-get install -y postgresql \
    && rm -rf /var/lib/apt/lists/*

RUN apt install sudo -y

# Start PostgreSQL service
RUN sudo service postgresql start

# Create a database named "social"
RUN psql -U postgres -c "CREATE DATABASE social;"

# Expose port 3000 for the API to listen on
EXPOSE 3000

# Start the API
CMD ["npm", "start"]
