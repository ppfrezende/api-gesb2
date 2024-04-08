/*
  Warnings:

  - You are about to drop the column `technicianId` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `technicianId` on the `service_providers` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_technicianId_fkey";

-- DropForeignKey
ALTER TABLE "service_providers" DROP CONSTRAINT "service_providers_technicianId_fkey";

-- AlterTable
ALTER TABLE "employees" DROP COLUMN "technicianId";

-- AlterTable
ALTER TABLE "service_providers" DROP COLUMN "technicianId";
