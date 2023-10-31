-- AlterTable
ALTER TABLE "consultives" ADD COLUMN     "skillId" TEXT;

-- AddForeignKey
ALTER TABLE "consultives" ADD CONSTRAINT "consultives_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "skills"("id") ON DELETE SET NULL ON UPDATE CASCADE;
