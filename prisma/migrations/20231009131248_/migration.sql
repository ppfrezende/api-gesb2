/*
  Warnings:

  - You are about to alter the column `departure` on the `timesheet_days` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `arrival` on the `timesheet_days` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `rangeAfrom` on the `timesheet_days` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `rangeAto` on the `timesheet_days` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `rangeBfrom` on the `timesheet_days` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `rangeBto` on the `timesheet_days` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `rangeCfrom` on the `timesheet_days` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `rangeCto` on the `timesheet_days` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `rangeDfrom` on the `timesheet_days` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `rangeDto` on the `timesheet_days` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "timesheet_days" ALTER COLUMN "departure" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "arrival" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "rangeAfrom" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "rangeAto" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "rangeBfrom" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "rangeBto" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "rangeCfrom" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "rangeCto" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "rangeDfrom" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "rangeDto" SET DATA TYPE DOUBLE PRECISION;
