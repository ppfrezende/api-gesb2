/*
  Warnings:

  - A unique constraint covering the columns `[progressive]` on the table `consultives` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "consultives" ADD COLUMN     "userName" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "consultives_progressive_key" ON "consultives"("progressive");

-- AddForeignKey
ALTER TABLE "consultives" ADD CONSTRAINT "consultives_userName_fkey" FOREIGN KEY ("userName") REFERENCES "users"("name") ON DELETE SET NULL ON UPDATE CASCADE;
