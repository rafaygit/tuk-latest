-- DropForeignKey
ALTER TABLE "components" DROP CONSTRAINT "components_categoryId_fkey";

-- AddForeignKey
ALTER TABLE "components" ADD CONSTRAINT "components_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
