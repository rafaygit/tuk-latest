/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `uiKits` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "uiKits" ADD COLUMN     "parentId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "uiKits_name_key" ON "uiKits"("name");

-- AddForeignKey
ALTER TABLE "uiKits" ADD CONSTRAINT "uiKits_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "uiKits"("id") ON DELETE SET NULL ON UPDATE CASCADE;
