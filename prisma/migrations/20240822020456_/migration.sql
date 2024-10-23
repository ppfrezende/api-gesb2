/*
  Warnings:

  - You are about to drop the column `isMonthly` on the `billing_orders` table. All the data in the column will be lost.
  - You are about to drop the column `monthly_total_value` on the `billing_orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "billing_orders" DROP COLUMN "isMonthly",
DROP COLUMN "monthly_total_value";

-- AlterTable
ALTER TABLE "interventions" ADD COLUMN     "isMonthly" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "total_value" INTEGER;
