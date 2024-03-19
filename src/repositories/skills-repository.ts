import { Skill, Prisma } from '@prisma/client';

export interface SkillsRepository {
  findById(id: string): Promise<Skill | null>;
  findByPO(id_PO: string): Promise<Skill[]>;
  listMany(page: number): Promise<Skill[]>;
  create(data: Prisma.SkillUncheckedCreateInput): Promise<Skill>;
  update(id: string, data: Prisma.SkillUpdateInput): Promise<Skill | null>;
  delete(id: string): Promise<void | null>;
}
