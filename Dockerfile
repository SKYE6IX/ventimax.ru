# syntax=docker.io/docker/dockerfile:1

FROM node:18-alpine AS base

# Gather all files
FROM base AS builder

WORKDIR /app

COPY package.json package-lock.json*  ./

RUN npm ci

COPY src ./src

COPY messages ./messages

COPY public ./public

COPY next.config.ts .

COPY tsconfig.json .

ARG CACHE_BUST

ARG ROCKET_CHAT_URL
ARG SERVICE_ID
ARG TEMPLATE_ID
ARG PUBLIC_KEY

ENV NEXT_PUBLIC_ROCKET_CHAT_URL=$ROCKET_CHAT_URL

ENV NEXT_PUBLIC_SERVICE_ID=$SERVICE_ID

ENV NEXT_PUBLIC_TEMPLATE_ID=$TEMPLATE_ID

ENV NEXT_PUBLIC_PUBLIC_KEY=$PUBLIC_KEY

RUN echo "Injected NEXT_PUBLIC_ROCKET_CHAT_URL is: $NEXT_PUBLIC_ROCKET_CHAT_URL"

RUN echo "Cache bust: $CACHE_BUST"

RUN npm run build

# Production image, copy all the files
FROM base AS runner

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs

RUN adduser --system --uid 1001 nextjs

USER nextjs

COPY --from=builder /app/public ./public

COPY --from=builder /app/messages ./messages

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

ARG ROCKET_CHAT_URL
ARG SERVICE_ID
ARG TEMPLATE_ID
ARG PUBLIC_KEY

ENV NEXT_PUBLIC_ROCKET_CHAT_URL=$ROCKET_CHAT_URL

ENV NEXT_PUBLIC_SERVICE_ID=$SERVICE_ID

ENV NEXT_PUBLIC_TEMPLATE_ID=$TEMPLATE_ID

ENV NEXT_PUBLIC_PUBLIC_KEY=$PUBLIC_KEY

CMD ["node", "server.js"]