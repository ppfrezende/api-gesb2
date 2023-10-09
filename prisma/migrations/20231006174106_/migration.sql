-- AlterTable
ALTER TABLE "timesheet_data" ALTER COLUMN "departure_date" DROP NOT NULL,
ALTER COLUMN "arrival_date" DROP NOT NULL,
ALTER COLUMN "traveled_hours" DROP NOT NULL,
ALTER COLUMN "normal_hours_range_A" DROP NOT NULL,
ALTER COLUMN "normal_hours_range_B" DROP NOT NULL,
ALTER COLUMN "extra_hours_range_C" DROP NOT NULL,
ALTER COLUMN "extra_hours_range_D" DROP NOT NULL,
ALTER COLUMN "technician_id" DROP NOT NULL,
ALTER COLUMN "intervention_description" DROP NOT NULL,
ALTER COLUMN "international_allowance" DROP NOT NULL;

-- AlterTable
ALTER TABLE "timesheet_days" ALTER COLUMN "departure" DROP NOT NULL,
ALTER COLUMN "arrival" DROP NOT NULL,
ALTER COLUMN "rangeAfrom" DROP NOT NULL,
ALTER COLUMN "rangeAto" DROP NOT NULL,
ALTER COLUMN "rangeBfrom" DROP NOT NULL,
ALTER COLUMN "rangeBto" DROP NOT NULL,
ALTER COLUMN "rangeCfrom" DROP NOT NULL,
ALTER COLUMN "rangeCto" DROP NOT NULL,
ALTER COLUMN "rangeDfrom" DROP NOT NULL,
ALTER COLUMN "rangeDto" DROP NOT NULL,
ALTER COLUMN "on_offshore" DROP NOT NULL,
ALTER COLUMN "technician_id" DROP NOT NULL;
