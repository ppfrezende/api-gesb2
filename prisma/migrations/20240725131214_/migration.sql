/*
  Warnings:

  - You are about to drop the `expenses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "expenses" DROP CONSTRAINT "expenses_interventionId_fkey";

-- DropForeignKey
ALTER TABLE "expenses" DROP CONSTRAINT "expenses_technicianId_fkey";

-- DropForeignKey
ALTER TABLE "expenses" DROP CONSTRAINT "expenses_userName_fkey";

-- DropTable
DROP TABLE "expenses";

-- CreateTable
CREATE TABLE "intervention_expenses" (
    "id" TEXT NOT NULL,
    "expense_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expense_type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "currency_quote" INTEGER NOT NULL,
    "expense_value" INTEGER NOT NULL,
    "total_converted" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "interventionId" TEXT,
    "userName" TEXT,

    CONSTRAINT "intervention_expenses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "technician_expenses" (
    "id" TEXT NOT NULL,
    "expense_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expense_type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "currency_quote" INTEGER NOT NULL,
    "expense_value" INTEGER NOT NULL,
    "total_converted" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userName" TEXT,
    "technicianId" TEXT,

    CONSTRAINT "technician_expenses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "intervention_expenses" ADD CONSTRAINT "intervention_expenses_interventionId_fkey" FOREIGN KEY ("interventionId") REFERENCES "interventions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "intervention_expenses" ADD CONSTRAINT "intervention_expenses_userName_fkey" FOREIGN KEY ("userName") REFERENCES "users"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "technician_expenses" ADD CONSTRAINT "technician_expenses_userName_fkey" FOREIGN KEY ("userName") REFERENCES "users"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "technician_expenses" ADD CONSTRAINT "technician_expenses_technicianId_fkey" FOREIGN KEY ("technicianId") REFERENCES "technicians"("id") ON DELETE SET NULL ON UPDATE CASCADE;
