/*
  Warnings:

  - You are about to alter the column `departure` on the `timesheet_days` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal`.
  - You are about to alter the column `arrival` on the `timesheet_days` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal`.
  - You are about to alter the column `rangeAfrom` on the `timesheet_days` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal`.
  - You are about to alter the column `rangeAto` on the `timesheet_days` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal`.
  - You are about to alter the column `rangeBfrom` on the `timesheet_days` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal`.
  - You are about to alter the column `rangeBto` on the `timesheet_days` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal`.
  - You are about to alter the column `rangeCfrom` on the `timesheet_days` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal`.
  - You are about to alter the column `rangeCto` on the `timesheet_days` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal`.
  - You are about to alter the column `rangeDfrom` on the `timesheet_days` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal`.
  - You are about to alter the column `rangeDto` on the `timesheet_days` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal`.

*/
-- AlterTable
ALTER TABLE "billing_orders" ALTER COLUMN "offshore_extra_hour_value" DROP NOT NULL,
ALTER COLUMN "offshore_extra_hour_value" SET DEFAULT 0,
ALTER COLUMN "offshore_extra_hour_value" SET DATA TYPE DECIMAL(20,2),
ALTER COLUMN "offshore_night_hour_value" DROP NOT NULL,
ALTER COLUMN "offshore_night_hour_value" SET DEFAULT 0,
ALTER COLUMN "offshore_night_hour_value" SET DATA TYPE DECIMAL(20,2),
ALTER COLUMN "offshore_normal_hour_value" DROP NOT NULL,
ALTER COLUMN "offshore_normal_hour_value" SET DEFAULT 0,
ALTER COLUMN "offshore_normal_hour_value" SET DATA TYPE DECIMAL(20,2),
ALTER COLUMN "offshore_over_hour_value" DROP NOT NULL,
ALTER COLUMN "offshore_over_hour_value" SET DEFAULT 0,
ALTER COLUMN "offshore_over_hour_value" SET DATA TYPE DECIMAL(20,2),
ALTER COLUMN "offshore_travel_hour_value" DROP NOT NULL,
ALTER COLUMN "offshore_travel_hour_value" SET DEFAULT 0,
ALTER COLUMN "offshore_travel_hour_value" SET DATA TYPE DECIMAL(20,2),
ALTER COLUMN "onshore_extra_hour_value" DROP NOT NULL,
ALTER COLUMN "onshore_extra_hour_value" SET DEFAULT 0,
ALTER COLUMN "onshore_extra_hour_value" SET DATA TYPE DECIMAL(20,2),
ALTER COLUMN "onshore_night_hour_value" DROP NOT NULL,
ALTER COLUMN "onshore_night_hour_value" SET DEFAULT 0,
ALTER COLUMN "onshore_night_hour_value" SET DATA TYPE DECIMAL(20,2),
ALTER COLUMN "onshore_normal_hour_value" DROP NOT NULL,
ALTER COLUMN "onshore_normal_hour_value" SET DEFAULT 0,
ALTER COLUMN "onshore_normal_hour_value" SET DATA TYPE DECIMAL(20,2),
ALTER COLUMN "onshore_over_hour_value" DROP NOT NULL,
ALTER COLUMN "onshore_over_hour_value" SET DEFAULT 0,
ALTER COLUMN "onshore_over_hour_value" SET DATA TYPE DECIMAL(20,2),
ALTER COLUMN "onshore_travel_hour_value" DROP NOT NULL,
ALTER COLUMN "onshore_travel_hour_value" SET DEFAULT 0,
ALTER COLUMN "onshore_travel_hour_value" SET DATA TYPE DECIMAL(20,2);

-- AlterTable
ALTER TABLE "technician_expenses" ALTER COLUMN "currency_quote" DROP NOT NULL,
ALTER COLUMN "currency_quote" SET DATA TYPE DECIMAL(20,2),
ALTER COLUMN "expense_value" DROP NOT NULL,
ALTER COLUMN "expense_value" SET DATA TYPE DECIMAL(20,2);

-- AlterTable
ALTER TABLE "timesheet_days" ALTER COLUMN "departure" SET DATA TYPE DECIMAL,
ALTER COLUMN "arrival" SET DATA TYPE DECIMAL,
ALTER COLUMN "rangeAfrom" SET DATA TYPE DECIMAL,
ALTER COLUMN "rangeAto" SET DATA TYPE DECIMAL,
ALTER COLUMN "rangeBfrom" SET DATA TYPE DECIMAL,
ALTER COLUMN "rangeBto" SET DATA TYPE DECIMAL,
ALTER COLUMN "rangeCfrom" SET DATA TYPE DECIMAL,
ALTER COLUMN "rangeCto" SET DATA TYPE DECIMAL,
ALTER COLUMN "rangeDfrom" SET DATA TYPE DECIMAL,
ALTER COLUMN "rangeDto" SET DATA TYPE DECIMAL;
