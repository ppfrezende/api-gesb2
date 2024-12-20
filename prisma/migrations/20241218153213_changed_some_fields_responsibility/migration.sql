/*
  Warnings:

  - You are about to drop the column `currency` on the `billing_orders` table. All the data in the column will be lost.
  - You are about to drop the column `expense_administration_tax` on the `billing_orders` table. All the data in the column will be lost.
  - Added the required column `currency` to the `interventions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expense_administration_tax` to the `interventions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "billing_orders" DROP COLUMN "currency",
DROP COLUMN "expense_administration_tax";

-- AlterTable
ALTER TABLE "interventions" ADD COLUMN     "currency" TEXT NOT NULL,
ADD COLUMN     "expense_administration_tax" INTEGER NOT NULL;
