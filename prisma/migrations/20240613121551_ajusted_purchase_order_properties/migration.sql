/*
  Warnings:

  - You are about to drop the column `factor_over_xd` on the `purchase_orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "purchase_orders" DROP COLUMN "factor_over_xd",
ADD COLUMN     "over_days" INTEGER,
ALTER COLUMN "factor_HE_onshore" DROP NOT NULL,
ALTER COLUMN "factor_HE_offshore" DROP NOT NULL,
ALTER COLUMN "factor_HN_offshore" DROP NOT NULL,
ALTER COLUMN "factor_HN_onshore" DROP NOT NULL,
ALTER COLUMN "factor_holiday_offshore" DROP NOT NULL,
ALTER COLUMN "factor_holiday_onshore" DROP NOT NULL,
ALTER COLUMN "factor_night_offshore" DROP NOT NULL,
ALTER COLUMN "factor_night_onshore" DROP NOT NULL;
