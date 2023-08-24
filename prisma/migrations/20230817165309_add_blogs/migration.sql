-- CreateEnum
CREATE TYPE "BlogTypes" AS ENUM ('OTHERS');

-- CreateTable
CREATE TABLE "blogs" (
    "id" SERIAL NOT NULL,
    "author" TEXT NOT NULL,
    "type" "BlogTypes" NOT NULL,
    "title" TEXT NOT NULL,
    "subTitle" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blogs_pkey" PRIMARY KEY ("id")
);
