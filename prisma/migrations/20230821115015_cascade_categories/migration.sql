-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_parentId_fkey";

-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_uiKitId_fkey";

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_uiKitId_fkey" FOREIGN KEY ("uiKitId") REFERENCES "uiKits"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
