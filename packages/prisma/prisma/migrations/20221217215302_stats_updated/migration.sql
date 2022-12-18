/*
  Warnings:

  - Added the required column `healing` to the `Dino` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Dino` table without a default value. This is not possible if the table is not empty.
  - Added the required column `speed` to the `Dino` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dino" ADD COLUMN     "healing" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "speed" DOUBLE PRECISION NOT NULL;
