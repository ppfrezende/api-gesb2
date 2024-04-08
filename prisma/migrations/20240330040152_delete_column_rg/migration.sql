/*
  Warnings:

  - You are about to drop the column `rg` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `rg` on the `service_providers` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "employees_rg_key";

-- DropIndex
DROP INDEX "service_providers_rg_key";

-- AlterTable
ALTER TABLE "employees" DROP COLUMN "rg",
ADD COLUMN     "technicianId" TEXT;

-- AlterTable
ALTER TABLE "service_providers" DROP COLUMN "rg",
ADD COLUMN     "technicianId" TEXT;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_technicianId_fkey" FOREIGN KEY ("technicianId") REFERENCES "technicians"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_providers" ADD CONSTRAINT "service_providers_technicianId_fkey" FOREIGN KEY ("technicianId") REFERENCES "technicians"("id") ON DELETE SET NULL ON UPDATE CASCADE;
