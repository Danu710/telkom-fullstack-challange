# Gunakan Node.js versi terbaru
FROM node:18

# Set working directory
WORKDIR /app

# Copy file package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy seluruh kode ke dalam container
COPY . .

# Expose port sesuai ENV
EXPOSE 4500

# Jalankan server
CMD ["npm", "run", "dev"]
