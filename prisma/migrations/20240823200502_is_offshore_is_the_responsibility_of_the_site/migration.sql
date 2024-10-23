/*
  Warnings:

  - You are about to drop the column `isOffshore` on the `interventions` table. All the data in the column will be lost.
  - You are about to drop the column `po_number` on the `interventions` table. All the data in the column will be lost.
  - Added the required column `customer_po_number` to the `interventions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "interventions" DROP COLUMN "isOffshore",
DROP COLUMN "po_number",
ADD COLUMN     "customer_po_number" TEXT NOT NULL;
