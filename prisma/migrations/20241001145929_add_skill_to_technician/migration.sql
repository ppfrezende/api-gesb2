-- CreateTable
CREATE TABLE "skills" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userName" TEXT,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TechSkill" (
    "technicianId" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,

    CONSTRAINT "TechSkill_pkey" PRIMARY KEY ("skillId","technicianId")
);

-- CreateTable
CREATE TABLE "_SkillToTechnician" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "skills_description_key" ON "skills"("description");

-- CreateIndex
CREATE UNIQUE INDEX "_SkillToTechnician_AB_unique" ON "_SkillToTechnician"("A", "B");

-- CreateIndex
CREATE INDEX "_SkillToTechnician_B_index" ON "_SkillToTechnician"("B");

-- AddForeignKey
ALTER TABLE "skills" ADD CONSTRAINT "skills_userName_fkey" FOREIGN KEY ("userName") REFERENCES "users"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechSkill" ADD CONSTRAINT "TechSkill_technicianId_fkey" FOREIGN KEY ("technicianId") REFERENCES "technicians"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechSkill" ADD CONSTRAINT "TechSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "skills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SkillToTechnician" ADD CONSTRAINT "_SkillToTechnician_A_fkey" FOREIGN KEY ("A") REFERENCES "skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SkillToTechnician" ADD CONSTRAINT "_SkillToTechnician_B_fkey" FOREIGN KEY ("B") REFERENCES "technicians"("id") ON DELETE CASCADE ON UPDATE CASCADE;
