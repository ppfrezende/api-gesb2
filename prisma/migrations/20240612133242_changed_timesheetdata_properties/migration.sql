-- AlterTable
ALTER TABLE "timesheets_data" ADD COLUMN     "customerId" TEXT,
ADD COLUMN     "siteId" TEXT;

-- AddForeignKey
ALTER TABLE "timesheets_data" ADD CONSTRAINT "timesheets_data_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timesheets_data" ADD CONSTRAINT "timesheets_data_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "sites"("id") ON DELETE SET NULL ON UPDATE CASCADE;
