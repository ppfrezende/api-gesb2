import { prisma } from '@/lib/prisma';
import { Customer, Prisma } from '@prisma/client';
import { CustomersRepository } from '../customers-repository';

export class PrismaCustomersRepository implements CustomersRepository {
  async findById(id: string): Promise<Customer | null> {
    const customer = await prisma.customer.findUnique({
      where: {
        id,
      },
      include: {
        project_managers: true,
        interventions: true,
      },
    });

    return customer;
  }

  async listMany(page: number) {
    const customers = await prisma.customer.findMany({
      include: {
        project_managers: true,
      },
      take: 100,
      skip: (page - 1) * 100,
      orderBy: {
        created_at: 'desc',
      },
    });

    return customers;
  }

  async searchMany(query: string, page: number) {
    const customers = await prisma.customer.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      include: {
        project_managers: true,
      },
      take: 100,
      skip: (page - 1) * 100,
      orderBy: {
        created_at: 'desc',
      },
    });

    return customers;
  }

  async create(data: Prisma.CustomerUncheckedCreateInput) {
    const customer = await prisma.customer.create({
      data,
    });

    return customer;
  }

  async update(id: string, data: Prisma.CustomerUpdateInput) {
    const customer = await prisma.customer.update({
      where: {
        id,
      },
      data,
    });

    return customer;
  }

  async delete(id: string) {
    const deleteProjectManagers = prisma.customerProjectManager.deleteMany({
      where: {
        customerId: id,
      },
    });

    const deleteCustomer = prisma.customer.delete({
      where: {
        id,
      },
    });

    return prisma.$transaction([deleteProjectManagers, deleteCustomer]);
  }
}
