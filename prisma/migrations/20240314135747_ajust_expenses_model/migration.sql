/*
  Warnings:

  - Added the required column `total_converted` to the `expenses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "expenses" ADD COLUMN     "total_converted" INTEGER NOT NULL;
