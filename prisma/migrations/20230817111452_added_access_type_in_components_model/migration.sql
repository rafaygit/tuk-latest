-- CreateEnum
CREATE TYPE "ComponentAccessType" AS ENUM ('PAID', 'FREE');

-- AlterTable
ALTER TABLE "components" ADD COLUMN     "accessType" "ComponentAccessType" NOT NULL DEFAULT 'PAID';
