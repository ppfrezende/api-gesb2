/*
  Warnings:

  - You are about to drop the column `invoiceToCustomerId` on the `timesheets_data` table. All the data in the column will be lost.
  - You are about to drop the `InvoiceToCustomerIntervention` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `invoice_to_customer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "InvoiceToCustomerIntervention" DROP CONSTRAINT "InvoiceToCustomerIntervention_interventionId_fkey";

-- DropForeignKey
ALTER TABLE "InvoiceToCustomerIntervention" DROP CONSTRAINT "InvoiceToCustomerIntervention_invoiceToCustomerId_fkey";

-- DropForeignKey
ALTER TABLE "invoice_to_customer" DROP CONSTRAINT "invoice_to_customer_customerId_fkey";

-- DropForeignKey
ALTER TABLE "invoice_to_customer" DROP CONSTRAINT "invoice_to_customer_interventionId_fkey";

-- DropForeignKey
ALTER TABLE "invoice_to_customer" DROP CONSTRAINT "invoice_to_customer_siteId_fkey";

-- DropForeignKey
ALTER TABLE "invoice_to_customer" DROP CONSTRAINT "invoice_to_customer_technicianId_fkey";

-- DropForeignKey
ALTER TABLE "invoice_to_customer" DROP CONSTRAINT "invoice_to_customer_userId_fkey";

-- DropForeignKey
ALTER TABLE "timesheets_data" DROP CONSTRAINT "timesheets_data_invoiceToCustomerId_fkey";

-- AlterTable
ALTER TABLE "timesheets_data" DROP COLUMN "invoiceToCustomerId";

-- DropTable
DROP TABLE "InvoiceToCustomerIntervention";

-- DropTable
DROP TABLE "invoice_to_customer";
