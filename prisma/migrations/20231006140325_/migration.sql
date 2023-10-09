/*
  Warnings:

  - You are about to drop the `TimeSheetData` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "timesheet_days" DROP CONSTRAINT "timesheet_days_timeSheetDataId_fkey";

-- AlterTable
ALTER TABLE "timesheet_days" ADD COLUMN     "userName" TEXT;

-- DropTable
DROP TABLE "TimeSheetData";

-- CreateTable
CREATE TABLE "timesheet_data" (
    "id" TEXT NOT NULL,
    "departure_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "arrival_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "traveled_hours" DECIMAL(65,30) NOT NULL,
    "normal_hours_range_A" DECIMAL(65,30) NOT NULL,
    "normal_hours_range_B" DECIMAL(65,30) NOT NULL,
    "extra_hours_range_C" DECIMAL(65,30) NOT NULL,
    "extra_hours_range_D" DECIMAL(65,30) NOT NULL,
    "technician_id" TEXT NOT NULL,
    "intervention_description" TEXT NOT NULL,
    "international_allowance" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userName" TEXT,

    CONSTRAINT "timesheet_data_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_name_key" ON "users"("name");

-- AddForeignKey
ALTER TABLE "timesheet_days" ADD CONSTRAINT "timesheet_days_timeSheetDataId_fkey" FOREIGN KEY ("timeSheetDataId") REFERENCES "timesheet_data"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timesheet_days" ADD CONSTRAINT "timesheet_days_userName_fkey" FOREIGN KEY ("userName") REFERENCES "users"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timesheet_data" ADD CONSTRAINT "timesheet_data_userName_fkey" FOREIGN KEY ("userName") REFERENCES "users"("name") ON DELETE SET NULL ON UPDATE CASCADE;
