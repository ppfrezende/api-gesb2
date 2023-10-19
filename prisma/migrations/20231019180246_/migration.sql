-- AlterTable
ALTER TABLE "consultives" ADD COLUMN     "customerProjectManagerId" TEXT;

-- AddForeignKey
ALTER TABLE "consultives" ADD CONSTRAINT "consultives_customerProjectManagerId_fkey" FOREIGN KEY ("customerProjectManagerId") REFERENCES "customer_project_managers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
