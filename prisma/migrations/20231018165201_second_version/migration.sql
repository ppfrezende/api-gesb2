/*
  Warnings:

  - You are about to drop the column `userEmail` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `day_H_before_extra_offshore` on the `purchase_orders` table. All the data in the column will be lost.
  - You are about to drop the column `day_H_before_extra_onshore` on the `purchase_orders` table. All the data in the column will be lost.
  - You are about to drop the column `factor_HN` on the `purchase_orders` table. All the data in the column will be lost.
  - You are about to drop the column `userEmail` on the `purchase_orders` table. All the data in the column will be lost.
  - You are about to drop the column `userEmail` on the `service_providers` table. All the data in the column will be lost.
  - You are about to drop the column `userEmail` on the `sites` table. All the data in the column will be lost.
  - You are about to drop the column `HN_offshore` on the `skills` table. All the data in the column will be lost.
  - You are about to drop the column `HN_onshore` on the `skills` table. All the data in the column will be lost.
  - You are about to drop the column `userEmail` on the `skills` table. All the data in the column will be lost.
  - You are about to drop the `interventions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `projects` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `job_title` to the `employees` table without a default value. This is not possible if the table is not empty.
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
  - Added the required column `job_title` to the `service_providers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `normal_hour` to the `skills` table without a default value. This is not possible if the table is not empty.
  - Added the required column `travel_hour` to the `skills` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_userEmail_fkey";

-- DropForeignKey
ALTER TABLE "interventions" DROP CONSTRAINT "interventions_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "interventions" DROP CONSTRAINT "interventions_purchaseOrderId_fkey";

-- DropForeignKey
ALTER TABLE "interventions" DROP CONSTRAINT "interventions_serviceProviderId_fkey";

-- DropForeignKey
ALTER TABLE "interventions" DROP CONSTRAINT "interventions_siteId_fkey";

-- DropForeignKey
ALTER TABLE "interventions" DROP CONSTRAINT "interventions_userEmail_fkey";

-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_userEmail_fkey";

-- DropForeignKey
ALTER TABLE "purchase_orders" DROP CONSTRAINT "purchase_orders_userEmail_fkey";

-- DropForeignKey
ALTER TABLE "service_providers" DROP CONSTRAINT "service_providers_userEmail_fkey";

-- DropForeignKey
ALTER TABLE "sites" DROP CONSTRAINT "sites_userEmail_fkey";

-- DropForeignKey
ALTER TABLE "skills" DROP CONSTRAINT "skills_userEmail_fkey";

-- AlterTable
ALTER TABLE "employees" DROP COLUMN "userEmail",
ADD COLUMN     "job_title" TEXT NOT NULL,
ADD COLUMN     "userName" TEXT;

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
ALTER TABLE "service_providers" DROP COLUMN "userEmail",
ADD COLUMN     "job_title" TEXT NOT NULL,
ADD COLUMN     "userName" TEXT;

-- AlterTable
ALTER TABLE "sites" DROP COLUMN "userEmail",
ADD COLUMN     "userName" TEXT;

-- AlterTable
ALTER TABLE "skills" DROP COLUMN "HN_offshore",
DROP COLUMN "HN_onshore",
DROP COLUMN "userEmail",
ADD COLUMN     "normal_hour" INTEGER NOT NULL,
ADD COLUMN     "travel_hour" INTEGER NOT NULL;

-- DropTable
DROP TABLE "interventions";

-- DropTable
DROP TABLE "projects";

-- CreateTable
CREATE TABLE "technicians" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "job_title" TEXT NOT NULL,
    "userName" TEXT,

    CONSTRAINT "technicians_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TechSite" (
    "technicianId" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,

    CONSTRAINT "TechSite_pkey" PRIMARY KEY ("siteId","technicianId")
);

-- CreateTable
CREATE TABLE "timesheet_days" (
    "id" TEXT NOT NULL,
    "day" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "departure" DOUBLE PRECISION,
    "arrival" DOUBLE PRECISION,
    "rangeAfrom" DOUBLE PRECISION,
    "rangeAto" DOUBLE PRECISION,
    "rangeBfrom" DOUBLE PRECISION,
    "rangeBto" DOUBLE PRECISION,
    "rangeCfrom" DOUBLE PRECISION,
    "rangeCto" DOUBLE PRECISION,
    "rangeDfrom" DOUBLE PRECISION,
    "rangeDto" DOUBLE PRECISION,
    "on_offshore" BOOLEAN,
    "technician_id" TEXT,
    "timeSheetDataId" TEXT,

    CONSTRAINT "timesheet_days_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timesheets_data" (
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

    CONSTRAINT "timesheets_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consultives" (
    "id" TEXT NOT NULL,
    "progressive" TEXT NOT NULL,
    "intervention_number" TEXT NOT NULL,
    "po_number" TEXT NOT NULL,
    "job_number" TEXT NOT NULL,
    "on_offshore" BOOLEAN NOT NULL,
    "initial_at" TIMESTAMP(3),
    "finished_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "technicianId" TEXT,
    "siteId" TEXT,

    CONSTRAINT "consultives_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userName" TEXT,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer_project_managers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "customerId" TEXT,

    CONSTRAINT "customer_project_managers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SiteToTechnician" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "technicians_email_key" ON "technicians"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_SiteToTechnician_AB_unique" ON "_SiteToTechnician"("A", "B");

-- CreateIndex
CREATE INDEX "_SiteToTechnician_B_index" ON "_SiteToTechnician"("B");

-- CreateIndex
CREATE UNIQUE INDEX "users_name_key" ON "users"("name");

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_userName_fkey" FOREIGN KEY ("userName") REFERENCES "users"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_providers" ADD CONSTRAINT "service_providers_userName_fkey" FOREIGN KEY ("userName") REFERENCES "users"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "technicians" ADD CONSTRAINT "technicians_userName_fkey" FOREIGN KEY ("userName") REFERENCES "users"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sites" ADD CONSTRAINT "sites_userName_fkey" FOREIGN KEY ("userName") REFERENCES "users"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechSite" ADD CONSTRAINT "TechSite_technicianId_fkey" FOREIGN KEY ("technicianId") REFERENCES "technicians"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechSite" ADD CONSTRAINT "TechSite_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "sites"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_orders" ADD CONSTRAINT "purchase_orders_userName_fkey" FOREIGN KEY ("userName") REFERENCES "users"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timesheet_days" ADD CONSTRAINT "timesheet_days_timeSheetDataId_fkey" FOREIGN KEY ("timeSheetDataId") REFERENCES "timesheets_data"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timesheets_data" ADD CONSTRAINT "timesheets_data_userName_fkey" FOREIGN KEY ("userName") REFERENCES "users"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consultives" ADD CONSTRAINT "consultives_technicianId_fkey" FOREIGN KEY ("technicianId") REFERENCES "technicians"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consultives" ADD CONSTRAINT "consultives_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "sites"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_userName_fkey" FOREIGN KEY ("userName") REFERENCES "users"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_project_managers" ADD CONSTRAINT "customer_project_managers_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SiteToTechnician" ADD CONSTRAINT "_SiteToTechnician_A_fkey" FOREIGN KEY ("A") REFERENCES "sites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SiteToTechnician" ADD CONSTRAINT "_SiteToTechnician_B_fkey" FOREIGN KEY ("B") REFERENCES "technicians"("id") ON DELETE CASCADE ON UPDATE CASCADE;
