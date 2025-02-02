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

  async listAllCustomerProjectManagersTrash() {
    const customers = await prisma.customerProjectManager.findMany({
      where: {
        isDeleted: true,
      },

      orderBy: {
        created_at: 'desc',
      },
    });

    return customers;
  }

  async create(data: Prisma.CustomerProjectManagerUncheckedCreateInput) {
    const now = new Date();
    const createdAtUTC = new Date(
      Date.UTC(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        now.getHours(),
        now.getMinutes(),
        now.getSeconds(),
        now.getMilliseconds(),
      ),
    ).toISOString();

    const dataToCreate = {
      ...data,
      created_at: createdAtUTC,
    };
    const project_manager = await prisma.customerProjectManager.create({
      data: dataToCreate,
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

  async delete(id: string, deletedBy: string) {
    await prisma.customerProjectManager.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
        deleted_at: new Date(),
        deletedBy,
      },
    });

    return;
  }
}
