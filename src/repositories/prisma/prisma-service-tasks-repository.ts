import { prisma } from '@/lib/prisma';
import { ServiceTask, Prisma } from '@prisma/client';
import { ServiceTasksRepository } from '../service-tasks-repository';

export class PrismaServiceTasksRepository implements ServiceTasksRepository {
  async findById(id: string): Promise<ServiceTask | null> {
    const service_task = await prisma.serviceTask.findUnique({
      where: {
        id,
      },
      include: {
        interventions: true,
      },
    });

    return service_task;
  }

  async listMany(page: number) {
    const service_tasks = await prisma.serviceTask.findMany({
      take: 100,
      skip: (page - 1) * 100,
      include: {
        interventions: true,
      },
    });

    return service_tasks;
  }

  async create(data: Prisma.ServiceTaskUncheckedCreateInput) {
    const service_task = await prisma.serviceTask.create({
      data,
    });

    return service_task;
  }

  async delete(id: string) {
    await prisma.serviceTask.delete({
      where: {
        id,
      },
    });

    return;
  }
}
