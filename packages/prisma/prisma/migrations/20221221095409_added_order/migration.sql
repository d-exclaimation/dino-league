/*
  Warnings:

  - A unique constraint covering the columns `[order]` on the table `Party` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Party" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Party_order_key" ON "Party"("order");
