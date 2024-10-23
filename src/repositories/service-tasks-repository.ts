import { ServiceTask, Prisma } from '@prisma/client';

export interface ServiceTasksRepository {
  findById(id: string): Promise<ServiceTask | null>;
  create(data: Prisma.ServiceTaskUncheckedCreateInput): Promise<ServiceTask>;
  delete(id: string): Promise<void | null>;
}
