/*
  Warnings:

  - You are about to drop the column `purchaseOrderId` on the `interventions` table. All the data in the column will be lost.
  - You are about to drop the column `day_H_before_extra_offshore` on the `purchase_orders` table. All the data in the column will be lost.
  - You are about to drop the column `day_H_before_extra_onshore` on the `purchase_orders` table. All the data in the column will be lost.
  - You are about to drop the column `factor_HN` on the `purchase_orders` table. All the data in the column will be lost.
  - You are about to drop the column `userEmail` on the `purchase_orders` table. All the data in the column will be lost.
  - You are about to drop the column `userEmail` on the `sites` table. All the data in the column will be lost.
  - You are about to drop the column `HN_offshore` on the `skills` table. All the data in the column will be lost.
  - You are about to drop the column `HN_onshore` on the `skills` table. All the data in the column will be lost.
  - You are about to drop the column `userEmail` on the `skills` table. All the data in the column will be lost.
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
  - You are about to drop the `TimeSheetData` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `projects` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `adictional` to the `purchase_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency` to the `purchase_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `factor_HN_offshore` to the `purchase_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `factor_HN_onshore` to the `purchase_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `factor_holiday` to the `purchase_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `factor_night` to the `purchase_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `factor_over_xd` to the `purchase_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isMonthly` to the `purchase_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time_offshore` to the `purchase_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time_onshore` to the `purchase_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time_travel` to the `purchase_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `whatsCalendar` to the `purchase_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `normal_hour` to the `skills` table without a default value. This is not possible if the table is not empty.
  - Added the required column `travel_hour` to the `skills` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "interventions" DROP CONSTRAINT "interventions_purchaseOrderId_fkey";

-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_userEmail_fkey";

-- DropForeignKey
ALTER TABLE "purchase_orders" DROP CONSTRAINT "purchase_orders_userEmail_fkey";

-- DropForeignKey
ALTER TABLE "sites" DROP CONSTRAINT "sites_userEmail_fkey";

-- DropForeignKey
ALTER TABLE "skills" DROP CONSTRAINT "skills_userEmail_fkey";

-- DropForeignKey
ALTER TABLE "timesheet_days" DROP CONSTRAINT "timesheet_days_timeSheetDataId_fkey";

-- AlterTable
ALTER TABLE "interventions" DROP COLUMN "purchaseOrderId";

-- AlterTable
ALTER TABLE "purchase_orders" DROP COLUMN "day_H_before_extra_offshore",
DROP COLUMN "day_H_before_extra_onshore",
DROP COLUMN "factor_HN",
DROP COLUMN "userEmail",
ADD COLUMN     "adictional" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "currency" TEXT NOT NULL,
ADD COLUMN     "factor_HN_offshore" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "factor_HN_onshore" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "factor_holiday" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "factor_night" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "factor_over_xd" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "isMonthly" BOOLEAN NOT NULL,
ADD COLUMN     "time_offshore" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "time_onshore" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "time_travel" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "userName" TEXT,
ADD COLUMN     "whatsCalendar" INTEGER NOT NULL,
ALTER COLUMN "factor_HE_onshore" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "factor_HE_offshore" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "sites" DROP COLUMN "userEmail",
ADD COLUMN     "userName" TEXT;

-- AlterTable
ALTER TABLE "skills" DROP COLUMN "HN_offshore",
DROP COLUMN "HN_onshore",
DROP COLUMN "userEmail",
ADD COLUMN     "normal_hour" INTEGER NOT NULL,
ADD COLUMN     "travel_hour" INTEGER NOT NULL,
ADD COLUMN     "userName" TEXT;

-- AlterTable
ALTER TABLE "timesheet_days" ADD COLUMN     "userName" TEXT,
ALTER COLUMN "departure" DROP NOT NULL,
ALTER COLUMN "departure" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "arrival" DROP NOT NULL,
ALTER COLUMN "arrival" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "rangeAfrom" DROP NOT NULL,
ALTER COLUMN "rangeAfrom" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "rangeAto" DROP NOT NULL,
ALTER COLUMN "rangeAto" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "rangeBfrom" DROP NOT NULL,
ALTER COLUMN "rangeBfrom" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "rangeBto" DROP NOT NULL,
ALTER COLUMN "rangeBto" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "rangeCfrom" DROP NOT NULL,
ALTER COLUMN "rangeCfrom" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "rangeCto" DROP NOT NULL,
ALTER COLUMN "rangeCto" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "rangeDfrom" DROP NOT NULL,
ALTER COLUMN "rangeDfrom" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "rangeDto" DROP NOT NULL,
ALTER COLUMN "rangeDto" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "on_offshore" DROP NOT NULL,
ALTER COLUMN "technician_id" DROP NOT NULL;

-- DropTable
DROP TABLE "TimeSheetData";

-- DropTable
DROP TABLE "projects";

-- CreateTable
CREATE TABLE "timesheet_data" (
    "id" TEXT NOT NULL,
    "departure_date" TIMESTAMP(3),
    "arrival_date" TIMESTAMP(3),
    "traveled_hours" DOUBLE PRECISION,
    "normal_hours_range_A" DOUBLE PRECISION,
    "normal_hours_range_B" DOUBLE PRECISION,
    "extra_hours_range_C" DOUBLE PRECISION,
    "extra_hours_range_D" DOUBLE PRECISION,
    "technician_id" TEXT,
    "intervention_description" TEXT,
    "site" TEXT,
    "international_allowance" BOOLEAN,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userName" TEXT,

    CONSTRAINT "timesheet_data_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_name_key" ON "users"("name");

-- AddForeignKey
ALTER TABLE "purchase_orders" ADD CONSTRAINT "purchase_orders_userName_fkey" FOREIGN KEY ("userName") REFERENCES "users"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skills" ADD CONSTRAINT "skills_userName_fkey" FOREIGN KEY ("userName") REFERENCES "users"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sites" ADD CONSTRAINT "sites_userName_fkey" FOREIGN KEY ("userName") REFERENCES "users"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timesheet_days" ADD CONSTRAINT "timesheet_days_timeSheetDataId_fkey" FOREIGN KEY ("timeSheetDataId") REFERENCES "timesheet_data"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timesheet_days" ADD CONSTRAINT "timesheet_days_userName_fkey" FOREIGN KEY ("userName") REFERENCES "users"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timesheet_data" ADD CONSTRAINT "timesheet_data_userName_fkey" FOREIGN KEY ("userName") REFERENCES "users"("name") ON DELETE SET NULL ON UPDATE CASCADE;
