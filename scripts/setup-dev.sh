#!/bin/bash

# Install
pnpm i

# Compile common, prisma, and server (which also gives common typing to frontend)
pnpm build --filter server
