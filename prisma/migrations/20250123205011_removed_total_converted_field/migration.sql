/*
  Warnings:

  - You are about to drop the column `total_converted` on the `intervention_expenses` table. All the data in the column will be lost.
  - You are about to drop the column `total_converted` on the `technician_expenses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "intervention_expenses" DROP COLUMN "total_converted";

-- AlterTable
ALTER TABLE "technician_expenses" DROP COLUMN "total_converted";
