/*
  Warnings:

  - You are about to drop the `_CategoryToNote` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToNote" DROP CONSTRAINT "_CategoryToNote_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToNote" DROP CONSTRAINT "_CategoryToNote_B_fkey";

-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "categoryId" INTEGER;

-- DropTable
DROP TABLE "_CategoryToNote";

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
