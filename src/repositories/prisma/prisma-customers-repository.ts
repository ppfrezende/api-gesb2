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
        project_managers: {
          where: {
            isDeleted: false,
          },
        },
        interventions: {
          where: {
            isDeleted: false,
          },
        },
        billing_orders: {
          where: {
            isDeleted: false,
          },
        },
      },
    });

    return customer;
  }

  async listMany(page: number) {
    const customers = await prisma.customer.findMany({
      where: {
        isDeleted: false,
      },
      include: {
        project_managers: {
          where: {
            isDeleted: false,
          },
        },
        interventions: {
          where: {
            isDeleted: false,
          },
        },
        billing_orders: {
          where: {
            isDeleted: false,
          },
        },
      },
      take: 10,
      skip: (page - 1) * 10,
      orderBy: {
        created_at: 'desc',
      },
    });

    return customers;
  }

  async listAll() {
    const customers = await prisma.customer.findMany({
      where: {
        isDeleted: false,
      },
      include: {
        project_managers: {
          where: {
            isDeleted: false,
          },
        },
        interventions: {
          where: {
            isDeleted: false,
          },
        },
        billing_orders: {
          where: {
            isDeleted: false,
          },
        },
      },

      orderBy: {
        created_at: 'desc',
      },
    });

    return customers;
  }

  async listAllCustomersTrash() {
    const customers = await prisma.customer.findMany({
      where: {
        isDeleted: true,
      },
      include: {
        project_managers: true,
        billing_orders: true,
      },

      orderBy: {
        created_at: 'desc',
      },
    });

    return customers;
  }

  async searchMany(query: string, page: number) {
    const customers = await prisma.customer.findMany({
      where: {
        isDeleted: false,

        OR: [
          {
            company_name: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            city: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            uf: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            street: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            billing_orders: {
              some: {
                description: {
                  contains: query,
                  mode: 'insensitive',
                },
              },
            },
          },
        ],
      },
      include: {
        project_managers: {
          where: {
            isDeleted: false,
          },
        },
        interventions: {
          where: {
            isDeleted: false,
          },
        },
        billing_orders: {
          where: {
            isDeleted: false,
          },
        },
      },
      take: 10,
      skip: (page - 1) * 10,
      orderBy: {
        created_at: 'desc',
      },
    });

    return customers;
  }

  async create(data: Prisma.CustomerUncheckedCreateInput) {
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
    const customer = await prisma.customer.create({
      data: dataToCreate,
    });

    return customer;
  }

  async update(
    id: string,
    updatedBy: string,
    data: Prisma.CustomerUpdateInput,
  ) {
    const dataToUpdate = {
      ...data,
      updatedBy,
    };
    const customer = await prisma.customer.update({
      where: {
        id,
      },
      data: dataToUpdate,
    });

    return customer;
  }

  async delete(id: string, deletedBy: string) {
    const deleteProjectManagers = prisma.customerProjectManager.updateMany({
      where: {
        customerId: id,
      },
      data: {
        isDeleted: true,
        deleted_at: new Date(),
        deletedBy,
      },
    });

    const deleteBillingOrders = prisma.billingOrder.updateMany({
      where: {
        customerId: id,
      },
      data: {
        isDeleted: true,
        deleted_at: new Date(),
        deletedBy,
      },
    });

    const deleteCustomer = prisma.customer.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
        deleted_at: new Date(),
        deletedBy,
      },
    });

    return prisma.$transaction([
      deleteProjectManagers,
      deleteBillingOrders,
      deleteCustomer,
    ]);
  }
}
