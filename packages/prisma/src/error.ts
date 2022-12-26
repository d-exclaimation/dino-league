import { Prisma } from "@prisma/client";

export const PrismaKnownError = Prisma.PrismaClientKnownRequestError;
export type PrismaKnownError = Prisma.PrismaClientKnownRequestError;
export const PrismaUnknownError = Prisma.PrismaClientUnknownRequestError;
export type PrismaUnknownError = Prisma.PrismaClientUnknownRequestError;
export const PrismaEngineError = Prisma.PrismaClientRustPanicError;
export type PrismaEngineError = Prisma.PrismaClientRustPanicError;
