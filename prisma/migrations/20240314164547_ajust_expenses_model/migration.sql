/*
  Warnings:

  - You are about to alter the column `currency_quote` on the `expenses` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `expense_value` on the `expenses` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `total_converted` on the `expenses` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "expenses" ALTER COLUMN "currency_quote" SET DATA TYPE INTEGER,
ALTER COLUMN "expense_value" SET DATA TYPE INTEGER,
ALTER COLUMN "total_converted" SET DATA TYPE INTEGER;
