/*
  Warnings:

  - You are about to drop the column `factor_holiday` on the `purchase_orders` table. All the data in the column will be lost.
  - You are about to drop the column `factor_night` on the `purchase_orders` table. All the data in the column will be lost.
  - Added the required column `factor_holiday_offshore` to the `purchase_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `factor_holiday_onshore` to the `purchase_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `factor_night_offshore` to the `purchase_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `factor_night_onshore` to the `purchase_orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "purchase_orders" DROP COLUMN "factor_holiday",
DROP COLUMN "factor_night",
ADD COLUMN     "factor_holiday_offshore" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "factor_holiday_onshore" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "factor_night_offshore" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "factor_night_onshore" DOUBLE PRECISION NOT NULL;
