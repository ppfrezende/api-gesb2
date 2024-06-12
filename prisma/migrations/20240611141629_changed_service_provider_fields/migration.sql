/*
  Warnings:

  - You are about to drop the column `contract_value` on the `service_providers` table. All the data in the column will be lost.
  - You are about to drop the column `day_hour` on the `service_providers` table. All the data in the column will be lost.
  - You are about to drop the column `extra_hour` on the `service_providers` table. All the data in the column will be lost.
  - You are about to drop the column `normal_hour` on the `service_providers` table. All the data in the column will be lost.
  - Added the required column `company` to the `service_providers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "service_providers" DROP COLUMN "contract_value",
DROP COLUMN "day_hour",
DROP COLUMN "extra_hour",
DROP COLUMN "normal_hour",
ADD COLUMN     "company" TEXT NOT NULL,
ADD COLUMN     "start_of_contract" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
