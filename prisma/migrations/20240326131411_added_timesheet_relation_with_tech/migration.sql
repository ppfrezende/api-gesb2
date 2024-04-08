/*
  Warnings:

  - You are about to drop the column `technician_id` on the `timesheet_days` table. All the data in the column will be lost.
  - You are about to drop the column `technician_id` on the `timesheets_data` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "timesheet_days" DROP COLUMN "technician_id",
ADD COLUMN     "technicianId" TEXT;

-- AlterTable
ALTER TABLE "timesheets_data" DROP COLUMN "technician_id",
ADD COLUMN     "technicianId" TEXT;

-- AddForeignKey
ALTER TABLE "timesheet_days" ADD CONSTRAINT "timesheet_days_technicianId_fkey" FOREIGN KEY ("technicianId") REFERENCES "technicians"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timesheets_data" ADD CONSTRAINT "timesheets_data_technicianId_fkey" FOREIGN KEY ("technicianId") REFERENCES "technicians"("id") ON DELETE SET NULL ON UPDATE CASCADE;
