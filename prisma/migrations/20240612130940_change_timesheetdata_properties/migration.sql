/*
  Warnings:

  - You are about to drop the column `arrival_date` on the `timesheets_data` table. All the data in the column will be lost.
  - You are about to drop the column `departure_date` on the `timesheets_data` table. All the data in the column will be lost.
  - You are about to drop the column `extra_hours_range_C` on the `timesheets_data` table. All the data in the column will be lost.
  - You are about to drop the column `extra_hours_range_D` on the `timesheets_data` table. All the data in the column will be lost.
  - You are about to drop the column `intervention_description` on the `timesheets_data` table. All the data in the column will be lost.
  - You are about to drop the column `normal_hours_range_A` on the `timesheets_data` table. All the data in the column will be lost.
  - You are about to drop the column `normal_hours_range_B` on the `timesheets_data` table. All the data in the column will be lost.
  - You are about to drop the column `site` on the `timesheets_data` table. All the data in the column will be lost.
  - You are about to drop the column `traveled_hours` on the `timesheets_data` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "timesheets_data" DROP COLUMN "arrival_date",
DROP COLUMN "departure_date",
DROP COLUMN "extra_hours_range_C",
DROP COLUMN "extra_hours_range_D",
DROP COLUMN "intervention_description",
DROP COLUMN "normal_hours_range_A",
DROP COLUMN "normal_hours_range_B",
DROP COLUMN "site",
DROP COLUMN "traveled_hours",
ADD COLUMN     "intervention_number" TEXT;
