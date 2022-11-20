-- CreateEnum
CREATE TYPE "Arena" AS ENUM ('DESERT', 'GRASSLAND', 'HILLS', 'OCEAN', 'URBAN');

-- CreateEnum
CREATE TYPE "Variant" AS ENUM ('aardonyx', 'abelisaurus', 'alosaur');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dino" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "variant" "Variant" NOT NULL,
    "level" INTEGER NOT NULL,
    "hp" DOUBLE PRECISION NOT NULL,
    "attack" DOUBLE PRECISION NOT NULL,
    "arena" "Arena" NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Dino_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Party" (
    "userId" TEXT NOT NULL,
    "dinoId" TEXT NOT NULL,

    CONSTRAINT "Party_pkey" PRIMARY KEY ("userId","dinoId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Party_dinoId_key" ON "Party"("dinoId");
