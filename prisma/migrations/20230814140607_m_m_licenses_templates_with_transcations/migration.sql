/*
  Warnings:

  - You are about to drop the column `checkoutSessionId` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `licenseId` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `templateId` on the `transactions` table. All the data in the column will be lost.
  - Added the required column `method` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Made the column `amount` on table `transactions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `transactions` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "PaymentGatewayProvider" AS ENUM ('STRIPE');

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_licenseId_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_templateId_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_userId_fkey";

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "checkoutSessionId",
DROP COLUMN "customerId",
DROP COLUMN "licenseId",
DROP COLUMN "status",
DROP COLUMN "templateId",
ADD COLUMN     "paidStatus" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "method",
ADD COLUMN     "method" "PaymentGatewayProvider" NOT NULL,
ALTER COLUMN "amount" SET NOT NULL,
ALTER COLUMN "amount" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "userId" SET NOT NULL;

-- CreateTable
CREATE TABLE "transactionMetas" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "transactionId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transactionMetas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_licensesTotransactions" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_templatesTotransactions" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_licensesTotransactions_AB_unique" ON "_licensesTotransactions"("A", "B");

-- CreateIndex
CREATE INDEX "_licensesTotransactions_B_index" ON "_licensesTotransactions"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_templatesTotransactions_AB_unique" ON "_templatesTotransactions"("A", "B");

-- CreateIndex
CREATE INDEX "_templatesTotransactions_B_index" ON "_templatesTotransactions"("B");

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactionMetas" ADD CONSTRAINT "transactionMetas_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_licensesTotransactions" ADD CONSTRAINT "_licensesTotransactions_A_fkey" FOREIGN KEY ("A") REFERENCES "licenses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_licensesTotransactions" ADD CONSTRAINT "_licensesTotransactions_B_fkey" FOREIGN KEY ("B") REFERENCES "transactions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_templatesTotransactions" ADD CONSTRAINT "_templatesTotransactions_A_fkey" FOREIGN KEY ("A") REFERENCES "templates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_templatesTotransactions" ADD CONSTRAINT "_templatesTotransactions_B_fkey" FOREIGN KEY ("B") REFERENCES "transactions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
