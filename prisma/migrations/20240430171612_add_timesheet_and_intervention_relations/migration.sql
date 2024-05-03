-- AlterTable
ALTER TABLE "timesheets_data" ADD COLUMN     "interventionId" TEXT;

-- AddForeignKey
ALTER TABLE "timesheets_data" ADD CONSTRAINT "timesheets_data_interventionId_fkey" FOREIGN KEY ("interventionId") REFERENCES "interventions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
