# Source: https://github.com/vercel/next.js/blob/canary/examples/with-docker/README.md

# Install dependencies only when needed
FROM node:20.10.0-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json  ./
COPY package-lock.json ./

RUN npm install -g npm@10.8.3

RUN npm ci --legacy-peer-deps

# Rebuild the source code only when needed
FROM node:20.10.0-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image, copy all the files and run next
FROM node:20.10.0-alpine AS runner
WORKDIR /app

ENV NODE_ENV production


# You only need to copy next.config.js if you are NOT using the default configuration
#COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static
#COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.env ./.env
#COPY --from=builder /app/ecosystem.config.js ./

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

EXPOSE 4000

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
# ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT=4000

CMD HOST="0.0.0.0" node server.js