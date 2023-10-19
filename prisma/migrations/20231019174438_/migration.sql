-- AlterTable
ALTER TABLE "consultives" ADD COLUMN     "customerId" TEXT;

-- AddForeignKey
ALTER TABLE "consultives" ADD CONSTRAINT "consultives_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
