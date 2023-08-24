-- DropForeignKey
ALTER TABLE "userMetas" DROP CONSTRAINT "userMetas_userId_fkey";

-- AddForeignKey
ALTER TABLE "userMetas" ADD CONSTRAINT "userMetas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
