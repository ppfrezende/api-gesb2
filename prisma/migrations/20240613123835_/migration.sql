/*
  Warnings:

  - You are about to drop the column `adictional` on the `purchase_orders` table. All the data in the column will be lost.
  - Added the required column `expense_administration_tax` to the `purchase_orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "purchase_orders" DROP COLUMN "adictional",
ADD COLUMN     "expense_administration_tax" INTEGER NOT NULL;
