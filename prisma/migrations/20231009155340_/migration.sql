/*
  Warnings:

  - You are about to alter the column `traveled_hours` on the `timesheet_data` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `normal_hours_range_A` on the `timesheet_data` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `normal_hours_range_B` on the `timesheet_data` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `extra_hours_range_C` on the `timesheet_data` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `extra_hours_range_D` on the `timesheet_data` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "timesheet_data" ALTER COLUMN "traveled_hours" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "normal_hours_range_A" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "normal_hours_range_B" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "extra_hours_range_C" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "extra_hours_range_D" SET DATA TYPE DOUBLE PRECISION;
