ARG NODE_ENV
ARG PORT

# ------------------------------------------------> The build image
FROM node:20-alpine AS builder

ENV NODE_ENV=${NODE_ENV:-production}
ENV PORT=${PORT:-3000}

WORKDIR /builder

COPY package*.json ./

RUN npm install -g pnpm
RUN pnpm install

COPY . ./
RUN pnpm run build


# ------------------------------------------------> The production image
FROM alpine AS production

ENV NODE_ENV=${NODE_ENV:-production}
ENV PORT=${PORT:-3000}

WORKDIR /usr/src/app

# Add required binaries
RUN apt-get update && apt-get install -y --no-install-recommends libstdc++6 dumb-init
RUN rm -rf /var/lib/apt/lists/*

# Create group and user
RUN groupadd -g 1000 node || true
RUN id -u node &>/dev/null || useradd -u 1000 -g node -s /bin/sh -m node

# Set permissions
RUN chown node:node ./

COPY --from=builder /usr/local/bin/node /usr/local/bin/
COPY --from=builder /usr/local/bin/docker-entrypoint.sh /usr/local/bin/
ENTRYPOINT ["docker-entrypoint.sh"]

USER node

COPY --from=builder /builder/node_modules ./node_modules
COPY --from=builder /builder/dist ./dist

# Run with dumb-init to not start node with PID=1, since Node.js was not designed to run as PID 1
CMD ["dumb-init", "node", "dist/index.js"]