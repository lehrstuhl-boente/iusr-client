# IusR Client

Frontend for an open source code learning platform.

## Project Setup

### Development Environment

1. run `npm install` from root directory
2. copy .env.example, save it as .env and change the values if needed
3. run `npm run dev` to run development server

### Production Environment

Node.js Version 18.14

#### Docker

Build Docker image: `docker build -t iusr-client .`  
Run Docker container: `docker run -p 3000:3000 -e BASE_URL='http://localhost:3001/api' iusr-client`

#### Docker

`docker run -p 3002:3000 -e BASE_URL='http://localhost:3001/api' iusr-client`

## Techstack

**Framework:** Nuxt.js 3, https://nuxt.com/
