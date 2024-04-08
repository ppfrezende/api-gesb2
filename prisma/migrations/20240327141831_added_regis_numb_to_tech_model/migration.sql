/*
  Warnings:

  - A unique constraint covering the columns `[registration_number]` on the table `technicians` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "technicians" ADD COLUMN     "registration_number" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "technicians_registration_number_key" ON "technicians"("registration_number");
