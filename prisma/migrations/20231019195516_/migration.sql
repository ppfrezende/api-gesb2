/*
  Warnings:

  - You are about to drop the column `on_offshore` on the `consultives` table. All the data in the column will be lost.
  - You are about to drop the column `on_offshore` on the `sites` table. All the data in the column will be lost.
  - You are about to drop the column `on_offshore` on the `timesheet_days` table. All the data in the column will be lost.
  - You are about to drop the column `international_allowance` on the `timesheets_data` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "consultives" DROP COLUMN "on_offshore",
ADD COLUMN     "isOffshore" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "sites" DROP COLUMN "on_offshore",
ADD COLUMN     "isOffshore" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "timesheet_days" DROP COLUMN "on_offshore",
ADD COLUMN     "isOffshore" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "timesheets_data" DROP COLUMN "international_allowance",
ADD COLUMN     "isInternational" BOOLEAN DEFAULT false;
