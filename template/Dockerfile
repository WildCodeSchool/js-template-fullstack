#syntax=docker/dockerfile:1.4
FROM node:20-alpine

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# hadolint ignore=DL3018
RUN apk add --no-cache libc6-compat

WORKDIR /usr/src/app

RUN corepack enable && \
	corepack prepare --activate pnpm@latest && \
	pnpm config -g set store-dir /.pnpm-store

COPY --link ./server/package.json ./server/
COPY --link ./client/package.json ./client/

RUN cd client && \
    pnpm fetch && \
    pnpm install
RUN cd server && \
    pnpm fetch && \
    pnpm install

COPY ./client ./client

RUN cd client && \
    pnpm run build

COPY ./server ./server
COPY docker-entry.sh .

CMD ["sh","./docker-entry.sh"]
