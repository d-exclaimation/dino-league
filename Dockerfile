FROM node:lts

WORKDIR /app

# Use pnpm
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm
RUN npm install -g turbo

# Root configs
COPY package.json .
COPY pnpm-lock.yaml .
COPY pnpm-workspace.yaml .
COPY turbo.json .
COPY .npmrc .

# Copy workspaces' package.json
COPY packages/common/package.json .
COPY packages/prisma/package.json .
COPY packages/server/package.json .
COPY packages/tsconfig/package.json .

# Fetch
RUN pnpm fetch 

# All files
COPY . .

# Install
RUN pnpm install

# Generate
RUN turbo run generate --filter=prisma

# Build
RUN turbo run build --filter=server

# Start
CMD [ "pnpm", "start" ]


