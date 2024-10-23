/*
  Warnings:

  - You are about to drop the `TechSkill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SkillToTechnician` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `skills` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TechSkill" DROP CONSTRAINT "TechSkill_skillId_fkey";

-- DropForeignKey
ALTER TABLE "TechSkill" DROP CONSTRAINT "TechSkill_technicianId_fkey";

-- DropForeignKey
ALTER TABLE "_SkillToTechnician" DROP CONSTRAINT "_SkillToTechnician_A_fkey";

-- DropForeignKey
ALTER TABLE "_SkillToTechnician" DROP CONSTRAINT "_SkillToTechnician_B_fkey";

-- DropForeignKey
ALTER TABLE "skills" DROP CONSTRAINT "skills_userName_fkey";

-- AlterTable
ALTER TABLE "technicians" ADD COLUMN     "skills" TEXT DEFAULT '';

-- DropTable
DROP TABLE "TechSkill";

-- DropTable
DROP TABLE "_SkillToTechnician";

-- DropTable
DROP TABLE "skills";
