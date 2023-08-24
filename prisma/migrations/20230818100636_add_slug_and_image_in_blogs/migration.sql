/*
  Warnings:

  - Added the required column `slug` to the `blogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "blogs" ADD COLUMN     "image" TEXT,
ADD COLUMN     "slug" TEXT NOT NULL;
