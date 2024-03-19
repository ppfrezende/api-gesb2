import { prisma } from '@/lib/prisma';
import { Skill, Prisma } from '@prisma/client';
import { SkillsRepository } from '../skills-repository';

export class PrismaSkillsRepository implements SkillsRepository {
  async findById(id: string): Promise<Skill | null> {
    const skill = await prisma.skill.findUnique({
      where: {
        id,
      },
      include: {
        interventions: true,
      },
    });

    return skill;
  }

  async findByPO(id: string): Promise<Skill[]> {
    const skills = await prisma.skill.findMany({
      where: {
        id_PO: id,
      },
    });

    return skills;
  }

  async listMany(page: number) {
    const skills = await prisma.skill.findMany({
      take: 100,
      skip: (page - 1) * 100,
    });

    return skills;
  }

  async create(data: Prisma.SkillUncheckedCreateInput) {
    const skill = await prisma.skill.create({
      data,
    });

    return skill;
  }

  async update(id: string, data: Prisma.SkillUpdateInput) {
    const skill = await prisma.skill.update({
      where: {
        id,
      },
      data,
    });

    return skill;
  }

  async delete(id: string) {
    await prisma.skill.delete({
      where: {
        id,
      },
    });

    return;
  }
}
