FROM node:18.14-buster as builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npx nuxi generate

FROM nginx:1.21.1 as prod
COPY ./default.conf.template /etc/nginx/templates/
RUN useradd -r appuser
COPY --chown=appuser:appuser --from=builder /app/.output/public /usr/share/nginx/html