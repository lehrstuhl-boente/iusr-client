FROM node:18.14-buster as builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18.14-buster as prod
ENV NODE_ENV=production
WORKDIR /app
RUN chown -R node /app
USER node
COPY --chown=node:node --from=builder /app/.output ./.output
COPY --chown=node:node --from=builder /app/node_modules ./node_modules
CMD ["node", ".output/server/index.mjs"]