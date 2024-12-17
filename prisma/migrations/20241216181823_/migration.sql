-- AlterTable
ALTER TABLE "interventions" ADD COLUMN     "isApproved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "resume_total_value" INTEGER;

-- AlterTable
ALTER TABLE "timesheet_days" ADD COLUMN     "deletedBy" TEXT,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;
