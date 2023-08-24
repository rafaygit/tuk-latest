/*
  Warnings:

  - You are about to drop the column `userId` on the `tickets` table. All the data in the column will be lost.
  - Added the required column `userId` to the `conversations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requesterId` to the `tickets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_userId_fkey";

-- AlterTable
ALTER TABLE "conversations" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "tickets" DROP COLUMN "userId",
ADD COLUMN     "requesterId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
