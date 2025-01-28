/*
  Warnings:

  - You are about to drop the column `offshore_travel_hour_value` on the `billing_orders` table. All the data in the column will be lost.
  - You are about to drop the column `onshore_travel_hour_value` on the `billing_orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "billing_orders" DROP COLUMN "offshore_travel_hour_value",
DROP COLUMN "onshore_travel_hour_value",
ADD COLUMN     "travel_hour_value" DECIMAL(20,2) DEFAULT 0;
