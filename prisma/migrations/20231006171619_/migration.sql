/*
  Warnings:

  - A unique constraint covering the columns `[technician_id]` on the table `timesheet_data` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[technician_id]` on the table `timesheet_days` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "timesheet_data_technician_id_key" ON "timesheet_data"("technician_id");

-- CreateIndex
CREATE UNIQUE INDEX "timesheet_days_technician_id_key" ON "timesheet_days"("technician_id");
