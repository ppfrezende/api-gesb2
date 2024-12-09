/*
  Warnings:

  - You are about to drop the column `userName` on the `billing_orders` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `intervention_expenses` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `interventions` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `invoice_to_customer` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `service_providers` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `sites` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `technician_expenses` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `technicians` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `timesheets_data` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "billing_orders" DROP CONSTRAINT "billing_orders_userName_fkey";

-- DropForeignKey
ALTER TABLE "customers" DROP CONSTRAINT "customers_userName_fkey";

-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_userName_fkey";

-- DropForeignKey
ALTER TABLE "intervention_expenses" DROP CONSTRAINT "intervention_expenses_userName_fkey";

-- DropForeignKey
ALTER TABLE "interventions" DROP CONSTRAINT "interventions_userName_fkey";

-- DropForeignKey
ALTER TABLE "invoice_to_customer" DROP CONSTRAINT "invoice_to_customer_userName_fkey";

-- DropForeignKey
ALTER TABLE "service_providers" DROP CONSTRAINT "service_providers_userName_fkey";

-- DropForeignKey
ALTER TABLE "sites" DROP CONSTRAINT "sites_userName_fkey";

-- DropForeignKey
ALTER TABLE "technician_expenses" DROP CONSTRAINT "technician_expenses_userName_fkey";

-- DropForeignKey
ALTER TABLE "technicians" DROP CONSTRAINT "technicians_userName_fkey";

-- DropForeignKey
ALTER TABLE "timesheets_data" DROP CONSTRAINT "timesheets_data_userName_fkey";

-- DropIndex
DROP INDEX "users_email_key";

-- DropIndex
DROP INDEX "users_name_key";

-- AlterTable
ALTER TABLE "billing_orders" DROP COLUMN "userName",
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "customers" DROP COLUMN "userName",
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "employees" DROP COLUMN "userName",
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "intervention_expenses" DROP COLUMN "userName",
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "interventions" DROP COLUMN "userName",
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "invoice_to_customer" DROP COLUMN "userName",
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "service_providers" DROP COLUMN "userName",
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "sites" DROP COLUMN "userName",
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "technician_expenses" DROP COLUMN "userName",
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "technicians" DROP COLUMN "userName",
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "timesheets_data" DROP COLUMN "userName",
ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_providers" ADD CONSTRAINT "service_providers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "technicians" ADD CONSTRAINT "technicians_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sites" ADD CONSTRAINT "sites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "billing_orders" ADD CONSTRAINT "billing_orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timesheets_data" ADD CONSTRAINT "timesheets_data_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interventions" ADD CONSTRAINT "interventions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "intervention_expenses" ADD CONSTRAINT "intervention_expenses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "technician_expenses" ADD CONSTRAINT "technician_expenses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_to_customer" ADD CONSTRAINT "invoice_to_customer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
