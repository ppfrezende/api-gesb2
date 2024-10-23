/*
  Warnings:

  - The `max_hours_day_offshore` column on the `billing_orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `max_hours_day_onshore` column on the `billing_orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `max_hours_day_travel` column on the `billing_orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "billing_orders" DROP COLUMN "max_hours_day_offshore",
ADD COLUMN     "max_hours_day_offshore" INTEGER,
DROP COLUMN "max_hours_day_onshore",
ADD COLUMN     "max_hours_day_onshore" INTEGER,
DROP COLUMN "max_hours_day_travel",
ADD COLUMN     "max_hours_day_travel" INTEGER;
