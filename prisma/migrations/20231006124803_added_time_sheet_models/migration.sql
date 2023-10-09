-- CreateTable
CREATE TABLE "timesheet_days" (
    "id" TEXT NOT NULL,
    "day" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "departure" DECIMAL(65,30) NOT NULL,
    "arrival" DECIMAL(65,30) NOT NULL,
    "rangeAfrom" DECIMAL(65,30) NOT NULL,
    "rangeAto" DECIMAL(65,30) NOT NULL,
    "rangeBfrom" DECIMAL(65,30) NOT NULL,
    "rangeBto" DECIMAL(65,30) NOT NULL,
    "rangeCfrom" DECIMAL(65,30) NOT NULL,
    "rangeCto" DECIMAL(65,30) NOT NULL,
    "rangeDfrom" DECIMAL(65,30) NOT NULL,
    "rangeDto" DECIMAL(65,30) NOT NULL,
    "on_offshore" BOOLEAN NOT NULL,
    "technician_id" TEXT NOT NULL,
    "timeSheetDataId" TEXT,

    CONSTRAINT "timesheet_days_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimeSheetData" (
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
    "international_allowance" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TimeSheetData_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "timesheet_days" ADD CONSTRAINT "timesheet_days_timeSheetDataId_fkey" FOREIGN KEY ("timeSheetDataId") REFERENCES "TimeSheetData"("id") ON DELETE SET NULL ON UPDATE CASCADE;
