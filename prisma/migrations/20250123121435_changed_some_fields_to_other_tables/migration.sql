/*
  Warnings:

  - You are about to drop the column `isDoubled` on the `billing_orders` table. All the data in the column will be lost.
  - You are about to drop the column `offshore_double_hour_value` on the `billing_orders` table. All the data in the column will be lost.
  - You are about to drop the column `onshore_double_hour_value` on the `billing_orders` table. All the data in the column will be lost.
  - You are about to drop the column `currency` on the `interventions` table. All the data in the column will be lost.
  - You are about to drop the column `expense_administration_tax` on the `interventions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "billing_orders" DROP COLUMN "isDoubled",
DROP COLUMN "offshore_double_hour_value",
DROP COLUMN "onshore_double_hour_value",
ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'BRL',
ADD COLUMN     "expense_administration_tax" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "customers" ALTER COLUMN "cnpj" DROP NOT NULL;

-- AlterTable
ALTER TABLE "interventions" DROP COLUMN "currency",
DROP COLUMN "expense_administration_tax";
