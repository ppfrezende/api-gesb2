/*
  Warnings:

  - Made the column `invoice_currency_quote` on table `invoice_to_customer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "invoice_to_customer" ALTER COLUMN "invoice_currency_quote" SET NOT NULL,
ALTER COLUMN "invoice_currency_quote" SET DEFAULT 1;
