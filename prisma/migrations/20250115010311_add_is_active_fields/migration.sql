-- AlterTable
ALTER TABLE "employees" ADD COLUMN     "dismissed_at" TIMESTAMP(3),
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "service_providers" ADD COLUMN     "dismissed_at" TIMESTAMP(3),
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;
