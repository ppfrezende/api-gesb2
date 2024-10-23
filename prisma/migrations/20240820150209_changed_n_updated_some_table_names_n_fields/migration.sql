/*
  Warnings:

  - You are about to drop the column `name` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `purchaseOrderId` on the `interventions` table. All the data in the column will be lost.
  - You are about to drop the column `skillId` on the `interventions` table. All the data in the column will be lost.
  - You are about to drop the `purchase_orders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `skills` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `company_name` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `sites` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "interventions" DROP CONSTRAINT "interventions_purchaseOrderId_fkey";

-- DropForeignKey
ALTER TABLE "interventions" DROP CONSTRAINT "interventions_skillId_fkey";

-- DropForeignKey
ALTER TABLE "purchase_orders" DROP CONSTRAINT "purchase_orders_userName_fkey";

-- DropForeignKey
ALTER TABLE "skills" DROP CONSTRAINT "skills_id_PO_fkey";

-- AlterTable
ALTER TABLE "customer_project_managers" ADD COLUMN     "email" TEXT,
ADD COLUMN     "job_title" TEXT,
ADD COLUMN     "phone" TEXT;

-- AlterTable
ALTER TABLE "customers" DROP COLUMN "name",
ADD COLUMN     "cep" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "company_name" TEXT NOT NULL,
ADD COLUMN     "complement" TEXT,
ADD COLUMN     "establishment_number" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "street" TEXT,
ADD COLUMN     "uf" TEXT;

-- AlterTable
ALTER TABLE "interventions" DROP COLUMN "purchaseOrderId",
DROP COLUMN "skillId",
ADD COLUMN     "billingOrderId" TEXT,
ADD COLUMN     "serviceTaskId" TEXT;

-- AlterTable
ALTER TABLE "sites" ADD COLUMN     "administrator_email" TEXT,
ADD COLUMN     "administrator_name" TEXT,
ADD COLUMN     "administrator_phone" TEXT,
ADD COLUMN     "emergency_email" TEXT,
ADD COLUMN     "emergency_phone" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "operation_zone" TEXT,
ALTER COLUMN "description" DROP NOT NULL;

-- DropTable
DROP TABLE "purchase_orders";

-- DropTable
DROP TABLE "skills";

-- CreateTable
CREATE TABLE "billing_orders" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "factor_HE_onshore" INTEGER NOT NULL DEFAULT 1,
    "factor_HE_offshore" INTEGER NOT NULL DEFAULT 1,
    "factor_HN_onshore" INTEGER NOT NULL DEFAULT 1,
    "factor_HN_offshore" INTEGER NOT NULL DEFAULT 1,
    "factor_holiday_onshore" INTEGER NOT NULL DEFAULT 1,
    "factor_holiday_offshore" INTEGER NOT NULL DEFAULT 1,
    "factor_night_onshore" INTEGER NOT NULL DEFAULT 1,
    "factor_night_offshore" INTEGER NOT NULL DEFAULT 1,
    "over_days" INTEGER,
    "time_onshore" TEXT NOT NULL,
    "time_offshore" TEXT NOT NULL,
    "time_travel" TEXT NOT NULL,
    "isMonthly" BOOLEAN NOT NULL,
    "whatsCalendar" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "expense_administration_tax" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userName" TEXT,

    CONSTRAINT "billing_orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_tasks" (
    "id" TEXT NOT NULL,
    "service_task_description" TEXT NOT NULL,
    "travel_hour_value" INTEGER NOT NULL,
    "normal_hour_value" INTEGER NOT NULL,
    "tax_value" INTEGER NOT NULL,
    "net_value" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "billingOrderId" TEXT,

    CONSTRAINT "service_tasks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "billing_orders_name_key" ON "billing_orders"("name");

-- AddForeignKey
ALTER TABLE "billing_orders" ADD CONSTRAINT "billing_orders_userName_fkey" FOREIGN KEY ("userName") REFERENCES "users"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_tasks" ADD CONSTRAINT "service_tasks_billingOrderId_fkey" FOREIGN KEY ("billingOrderId") REFERENCES "billing_orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interventions" ADD CONSTRAINT "interventions_billingOrderId_fkey" FOREIGN KEY ("billingOrderId") REFERENCES "billing_orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interventions" ADD CONSTRAINT "interventions_serviceTaskId_fkey" FOREIGN KEY ("serviceTaskId") REFERENCES "service_tasks"("id") ON DELETE SET NULL ON UPDATE CASCADE;
