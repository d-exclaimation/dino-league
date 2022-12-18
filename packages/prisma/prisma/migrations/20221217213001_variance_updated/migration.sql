/*
  Warnings:

  - The values [aardonyx,abelisaurus,alosaur] on the enum `Variant` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Variant_new" AS ENUM ('blue', 'black', 'green', 'pink', 'red', 'slate', 'white', 'yellow');
ALTER TABLE "Dino" ALTER COLUMN "variant" TYPE "Variant_new" USING ("variant"::text::"Variant_new");
ALTER TYPE "Variant" RENAME TO "Variant_old";
ALTER TYPE "Variant_new" RENAME TO "Variant";
DROP TYPE "Variant_old";
COMMIT;

-- AddForeignKey
ALTER TABLE "Dino" ADD CONSTRAINT "Dino_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Party" ADD CONSTRAINT "Party_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Party" ADD CONSTRAINT "Party_dinoId_fkey" FOREIGN KEY ("dinoId") REFERENCES "Dino"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
