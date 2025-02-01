# Use Node 18 Alpine for a lightweight image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port Next.js runs on (default: 3000)
EXPOSE 3000

# Start Next.js in development mode
CMD ["npm", "run", "dev"]
