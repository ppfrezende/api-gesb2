-- AlterTable
ALTER TABLE "billing_orders" ADD COLUMN     "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "customer_project_managers" ADD COLUMN     "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "employees" ADD COLUMN     "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "intervention_expenses" ADD COLUMN     "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "interventions" ADD COLUMN     "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "service_providers" ADD COLUMN     "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "sites" ADD COLUMN     "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "technician_expenses" ADD COLUMN     "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "technicians" ADD COLUMN     "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "timesheets_data" ADD COLUMN     "updatedBy" TEXT;
