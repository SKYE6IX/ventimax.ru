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

RUN npm run build

# Production image, copy all the files
FROM base AS runner

WORKDIR /app

ARG _NEXT_PUBLIC_ROCKET_CHAT_URL
ARG _NEXT_PUBLIC_SERVICE_ID
ARG _NEXT_PUBLIC_TEMPLATE_ID
ARG _NEXT_PUBLIC_PUBLIC_KEY

ENV NEXT_PUBLIC_ROCKET_CHAT_URL=$_NEXT_PUBLIC_ROCKET_CHAT_URL

ENV NEXT_PUBLIC_SERVICE_ID=$_NEXT_PUBLIC_SERVICE_ID

ENV NEXT_PUBLIC_TEMPLATE_ID=$_NEXT_PUBLIC_TEMPLATE_ID

ENV NEXT_PUBLIC_PUBLIC_KEY=$_NEXT_PUBLIC_PUBLIC_KEY

RUN addgroup --system --gid 1001 nodejs

RUN adduser --system --uid 1001 nextjs

USER nextjs

COPY --from=builder /app/public ./public

COPY --from=builder /app/messages ./messages

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

EXPOSE 4000

CMD ["node", "server.js"]