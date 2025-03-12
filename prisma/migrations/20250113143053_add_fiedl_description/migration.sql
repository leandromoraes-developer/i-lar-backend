/*
  Warnings:

  - Added the required column `description` to the `houses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "houses" ADD COLUMN     "description" TEXT NOT NULL;
