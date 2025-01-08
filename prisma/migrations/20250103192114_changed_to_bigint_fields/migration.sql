-- AlterTable
ALTER TABLE "intervention_expenses" ALTER COLUMN "expense_value" SET DATA TYPE BIGINT,
ALTER COLUMN "total_converted" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "technician_expenses" ALTER COLUMN "expense_value" SET DATA TYPE BIGINT,
ALTER COLUMN "total_converted" SET DATA TYPE BIGINT;
