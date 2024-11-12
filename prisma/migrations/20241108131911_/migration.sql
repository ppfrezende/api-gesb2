/*
  Warnings:

  - Made the column `offshore_double_hour_value` on table `billing_orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `offshore_extra_hour_value` on table `billing_orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `offshore_night_hour_value` on table `billing_orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `offshore_normal_hour_value` on table `billing_orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `offshore_over_hour_value` on table `billing_orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `offshore_travel_hour_value` on table `billing_orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `onshore_double_hour_value` on table `billing_orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `onshore_extra_hour_value` on table `billing_orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `onshore_night_hour_value` on table `billing_orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `onshore_normal_hour_value` on table `billing_orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `onshore_over_hour_value` on table `billing_orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `onshore_travel_hour_value` on table `billing_orders` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "billing_orders" ALTER COLUMN "offshore_double_hour_value" SET NOT NULL,
ALTER COLUMN "offshore_extra_hour_value" SET NOT NULL,
ALTER COLUMN "offshore_night_hour_value" SET NOT NULL,
ALTER COLUMN "offshore_normal_hour_value" SET NOT NULL,
ALTER COLUMN "offshore_over_hour_value" SET NOT NULL,
ALTER COLUMN "offshore_travel_hour_value" SET NOT NULL,
ALTER COLUMN "onshore_double_hour_value" SET NOT NULL,
ALTER COLUMN "onshore_extra_hour_value" SET NOT NULL,
ALTER COLUMN "onshore_night_hour_value" SET NOT NULL,
ALTER COLUMN "onshore_normal_hour_value" SET NOT NULL,
ALTER COLUMN "onshore_over_hour_value" SET NOT NULL,
ALTER COLUMN "onshore_travel_hour_value" SET NOT NULL;
