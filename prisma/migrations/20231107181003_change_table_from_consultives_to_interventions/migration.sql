/*
  Warnings:

  - You are about to drop the `consultives` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "consultives" DROP CONSTRAINT "consultives_customerId_fkey";

-- DropForeignKey
ALTER TABLE "consultives" DROP CONSTRAINT "consultives_customerProjectManagerId_fkey";

-- DropForeignKey
ALTER TABLE "consultives" DROP CONSTRAINT "consultives_purchaseOrderId_fkey";

-- DropForeignKey
ALTER TABLE "consultives" DROP CONSTRAINT "consultives_siteId_fkey";

-- DropForeignKey
ALTER TABLE "consultives" DROP CONSTRAINT "consultives_skillId_fkey";

-- DropForeignKey
ALTER TABLE "consultives" DROP CONSTRAINT "consultives_technicianId_fkey";

-- DropForeignKey
ALTER TABLE "consultives" DROP CONSTRAINT "consultives_userName_fkey";

-- DropTable
DROP TABLE "consultives";

-- CreateTable
CREATE TABLE "interventions" (
    "id" TEXT NOT NULL,
    "progressive" TEXT NOT NULL,
    "intervention_number" TEXT NOT NULL,
    "po_number" TEXT NOT NULL,
    "job_number" TEXT NOT NULL,
    "isOffshore" BOOLEAN DEFAULT false,
    "initial_at" TIMESTAMP(3),
    "finished_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "technicianId" TEXT,
    "siteId" TEXT,
    "userName" TEXT,
    "customerId" TEXT,
    "customerProjectManagerId" TEXT,
    "purchaseOrderId" TEXT,
    "skillId" TEXT,

    CONSTRAINT "interventions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "interventions_progressive_key" ON "interventions"("progressive");

-- AddForeignKey
ALTER TABLE "interventions" ADD CONSTRAINT "interventions_technicianId_fkey" FOREIGN KEY ("technicianId") REFERENCES "technicians"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interventions" ADD CONSTRAINT "interventions_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "sites"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interventions" ADD CONSTRAINT "interventions_userName_fkey" FOREIGN KEY ("userName") REFERENCES "users"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interventions" ADD CONSTRAINT "interventions_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interventions" ADD CONSTRAINT "interventions_customerProjectManagerId_fkey" FOREIGN KEY ("customerProjectManagerId") REFERENCES "customer_project_managers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interventions" ADD CONSTRAINT "interventions_purchaseOrderId_fkey" FOREIGN KEY ("purchaseOrderId") REFERENCES "purchase_orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interventions" ADD CONSTRAINT "interventions_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "skills"("id") ON DELETE SET NULL ON UPDATE CASCADE;
