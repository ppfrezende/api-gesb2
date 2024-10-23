/*
  Warnings:

  - You are about to drop the column `factor_HE_offshore` on the `billing_orders` table. All the data in the column will be lost.
  - You are about to drop the column `factor_HE_onshore` on the `billing_orders` table. All the data in the column will be lost.
  - You are about to drop the column `factor_HN_offshore` on the `billing_orders` table. All the data in the column will be lost.
  - You are about to drop the column `factor_HN_onshore` on the `billing_orders` table. All the data in the column will be lost.
  - You are about to drop the column `factor_holiday_offshore` on the `billing_orders` table. All the data in the column will be lost.
  - You are about to drop the column `factor_holiday_onshore` on the `billing_orders` table. All the data in the column will be lost.
  - You are about to drop the column `factor_night_offshore` on the `billing_orders` table. All the data in the column will be lost.
  - You are about to drop the column `factor_night_onshore` on the `billing_orders` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `billing_orders` table. All the data in the column will be lost.
  - You are about to drop the column `time_offshore` on the `billing_orders` table. All the data in the column will be lost.
  - You are about to drop the column `time_onshore` on the `billing_orders` table. All the data in the column will be lost.
  - You are about to drop the column `time_travel` on the `billing_orders` table. All the data in the column will be lost.
  - You are about to drop the column `serviceTaskId` on the `interventions` table. All the data in the column will be lost.
  - You are about to drop the `service_tasks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "interventions" DROP CONSTRAINT "interventions_serviceTaskId_fkey";

-- DropForeignKey
ALTER TABLE "service_tasks" DROP CONSTRAINT "service_tasks_billingOrderId_fkey";

-- DropIndex
DROP INDEX "billing_orders_name_key";

-- AlterTable
ALTER TABLE "billing_orders" DROP COLUMN "factor_HE_offshore",
DROP COLUMN "factor_HE_onshore",
DROP COLUMN "factor_HN_offshore",
DROP COLUMN "factor_HN_onshore",
DROP COLUMN "factor_holiday_offshore",
DROP COLUMN "factor_holiday_onshore",
DROP COLUMN "factor_night_offshore",
DROP COLUMN "factor_night_onshore",
DROP COLUMN "name",
DROP COLUMN "time_offshore",
DROP COLUMN "time_onshore",
DROP COLUMN "time_travel",
ADD COLUMN     "customerId" TEXT,
ADD COLUMN     "isDoubled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "max_hours_day_offshore" TEXT,
ADD COLUMN     "max_hours_day_onshore" TEXT,
ADD COLUMN     "max_hours_day_travel" TEXT,
ADD COLUMN     "monthly_total_value" INTEGER,
ADD COLUMN     "offshore_double_hour_value" INTEGER DEFAULT 0,
ADD COLUMN     "offshore_extra_hour_value" INTEGER DEFAULT 0,
ADD COLUMN     "offshore_night_hour_value" INTEGER DEFAULT 0,
ADD COLUMN     "offshore_normal_hour_value" INTEGER DEFAULT 0,
ADD COLUMN     "offshore_over_hour_value" INTEGER DEFAULT 0,
ADD COLUMN     "offshore_travel_hour_value" INTEGER DEFAULT 0,
ADD COLUMN     "onshore_double_hour_value" INTEGER DEFAULT 0,
ADD COLUMN     "onshore_extra_hour_value" INTEGER DEFAULT 0,
ADD COLUMN     "onshore_night_hour_value" INTEGER DEFAULT 0,
ADD COLUMN     "onshore_normal_hour_value" INTEGER DEFAULT 0,
ADD COLUMN     "onshore_over_hour_value" INTEGER DEFAULT 0,
ADD COLUMN     "onshore_travel_hour_value" INTEGER DEFAULT 0,
ALTER COLUMN "isMonthly" SET DEFAULT false;

-- AlterTable
ALTER TABLE "interventions" DROP COLUMN "serviceTaskId";

-- DropTable
DROP TABLE "service_tasks";

-- AddForeignKey
ALTER TABLE "billing_orders" ADD CONSTRAINT "billing_orders_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
