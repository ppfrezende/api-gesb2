/*
  Warnings:

  - A unique constraint covering the columns `[registration_number]` on the table `employees` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[registration_number]` on the table `service_providers` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "employees" ADD COLUMN     "registration_number" TEXT;

-- AlterTable
ALTER TABLE "service_providers" ADD COLUMN     "registration_number" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "employees_registration_number_key" ON "employees"("registration_number");

-- CreateIndex
CREATE UNIQUE INDEX "service_providers_registration_number_key" ON "service_providers"("registration_number");
