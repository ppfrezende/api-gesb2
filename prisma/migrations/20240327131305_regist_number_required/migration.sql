/*
  Warnings:

  - Made the column `registration_number` on table `employees` required. This step will fail if there are existing NULL values in that column.
  - Made the column `registration_number` on table `service_providers` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "employees" ALTER COLUMN "registration_number" SET NOT NULL;

-- AlterTable
ALTER TABLE "service_providers" ALTER COLUMN "registration_number" SET NOT NULL;
