FROM node:lts

WORKDIR /app

# Use pnpm
RUN npm install -g pnpm
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

# Install
RUN pnpm install

# All files
COPY . .

# Generate
RUN turbo run generate --filter=prisma

# Build
RUN turbo run build --filter=server

# Start
CMD [ "pnpm", "start" ]


