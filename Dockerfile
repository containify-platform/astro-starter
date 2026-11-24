FROM node:24-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# import.meta.env values are baked into the build: declare each one you use, e.g.
# ARG PUBLIC_SITE_NAME
RUN npm run build

FROM node:24-alpine
WORKDIR /app
# Containify sets HOST=::, so the server listens on IPv6 and IPv4. PORT is the port the
# HTTP endpoint points at.
ENV NODE_ENV=production \
    PORT=4321
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/package.json ./
COPY --from=build /app/dist ./dist
USER node
EXPOSE 4321
CMD ["node", "dist/server/entry.mjs"]
