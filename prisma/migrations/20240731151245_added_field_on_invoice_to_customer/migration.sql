/*
  Warnings:

  - You are about to drop the column `final_total` on the `invoice_to_customer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "invoice_to_customer" DROP COLUMN "final_total",
ADD COLUMN     "total_value" INTEGER,
ADD COLUMN     "total_value_in_dollar" INTEGER;
