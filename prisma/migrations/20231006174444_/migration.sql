/*
  Warnings:

  - A unique constraint covering the columns `[intervention_description]` on the table `timesheet_data` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[site]` on the table `timesheet_data` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "timesheet_data" ADD COLUMN     "site" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "timesheet_data_intervention_description_key" ON "timesheet_data"("intervention_description");

-- CreateIndex
CREATE UNIQUE INDEX "timesheet_data_site_key" ON "timesheet_data"("site");
