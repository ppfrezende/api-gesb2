import { prisma } from '@/lib/prisma';
import { CustomerProjectManager, Prisma } from '@prisma/client';
import { CustomerProjectManagersRepository } from '../customers-project-managers-repository';

export class PrismaCustomerProjectManagersRepository
  implements CustomerProjectManagersRepository
{
  async findById(id: string): Promise<CustomerProjectManager | null> {
    const project_manager = await prisma.customerProjectManager.findUnique({
      where: {
        id,
      },
    });

    return project_manager;
  }

  async create(data: Prisma.CustomerProjectManagerUncheckedCreateInput) {
    const project_manager = await prisma.customerProjectManager.create({
      data,
    });

    return project_manager;
  }

  async update(id: string, data: Prisma.CustomerProjectManagerUpdateInput) {
    const project_manager = await prisma.customerProjectManager.update({
      where: {
        id,
      },
      data,
    });

    return project_manager;
  }

  async delete(id: string) {
    await prisma.customerProjectManager.delete({
      where: {
        id,
      },
    });

    return;
  }
}
