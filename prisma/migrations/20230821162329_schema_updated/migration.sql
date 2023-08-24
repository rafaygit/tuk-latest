/*
  Warnings:

  - You are about to drop the column `codeJS` on the `templateIntegrations` table. All the data in the column will be lost.
  - You are about to drop the column `markup` on the `templateIntegrations` table. All the data in the column will be lost.
  - Added the required column `zipFile` to the `templateIntegrations` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ComponentTags" AS ENUM ('NEW', 'DEPRECIATED');

-- AlterTable
ALTER TABLE "components" ADD COLUMN     "tag" "ComponentTags";

-- AlterTable
ALTER TABLE "templateIntegrations" DROP COLUMN "codeJS",
DROP COLUMN "markup",
ADD COLUMN     "zipFile" TEXT NOT NULL;
