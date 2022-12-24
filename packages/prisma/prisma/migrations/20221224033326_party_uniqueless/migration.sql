/*
  Warnings:

  - A unique constraint covering the columns `[userId,order]` on the table `Party` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Party_order_key";

-- CreateIndex
CREATE UNIQUE INDEX "Party_userId_order_key" ON "Party"("userId", "order");
