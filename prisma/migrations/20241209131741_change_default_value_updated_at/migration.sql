-- AlterTable
ALTER TABLE "billing_orders" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "customer_project_managers" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "customers" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "employees" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "intervention_expenses" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "interventions" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "invoice_to_customer" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "service_providers" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "sites" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "technician_expenses" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "technicians" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "timesheets_data" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "updated_at" DROP DEFAULT;
