/*
  Warnings:

  - You are about to alter the column `expense_value` on the `intervention_expenses` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `total_converted` on the `intervention_expenses` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `expense_value` on the `technician_expenses` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `total_converted` on the `technician_expenses` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "intervention_expenses" ALTER COLUMN "expense_value" SET DATA TYPE INTEGER,
ALTER COLUMN "total_converted" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "technician_expenses" ALTER COLUMN "expense_value" SET DATA TYPE INTEGER,
ALTER COLUMN "total_converted" SET DATA TYPE INTEGER;
