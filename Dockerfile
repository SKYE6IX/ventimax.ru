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


ARG NEXT_PUBLIC_ROCKET_CHAT_URL
ARG NEXT_PUBLIC_SERVICE_ID
ARG NEXT_PUBLIC_TEMPLATE_ID
ARG NEXT_PUBLIC_PUBLIC_KEY

ENV NEXT_PUBLIC_ROCKET_CHAT_URL=$NEXT_PUBLIC_ROCKET_CHAT_URL

ENV NEXT_PUBLIC_SERVICE_ID=$NEXT_PUBLIC_SERVICE_ID

ENV NEXT_PUBLIC_TEMPLATE_ID=$NEXT_PUBLIC_TEMPLATE_ID

ENV NEXT_PUBLIC_PUBLIC_KEY=$NEXT_PUBLIC_PUBLIC_KEY

RUN echo "Injected NEXT_PUBLIC_ROCKET_CHAT_URL is: $NEXT_PUBLIC_ROCKET_CHAT_URL"

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

CMD ["node", "server.js"]