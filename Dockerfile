# Start from the node image v18
FROM node:22.4.1-alpine

# Change the work directory app
WORKDIR /app

COPY ./package.json .
# Install dependencies
RUN npm install

# Copy the directory
COPY . .

RUN npx prisma generate

# Compile files in the dist folder
RUN npm run build


EXPOSE 3000


# Run the server
CMD ["npm","run","start:prod"]