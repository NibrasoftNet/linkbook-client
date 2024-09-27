# Stage 1: Install dependencies only when needed
FROM node:20.10.0-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies using npm
COPY package.json package-lock.json* ./
RUN npm ci --legacy-peer-deps

# Stage 2: Rebuild the source code only when needed
FROM node:20.10.0-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable Next.js telemetry if you want
# ENV NEXT_TELEMETRY_DISABLED 1

# Build the project using npm
RUN npm run build

# Stage 3: Production image, copy the necessary files and run Next.js
FROM node:20.10.0-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV PORT 4000
ENV HOSTNAME "0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 4000

# Run the Next.js server on port 4000
CMD ["node", "server.js"]
