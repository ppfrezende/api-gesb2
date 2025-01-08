import { prisma } from '@/lib/prisma';
import { BillingOrder, Prisma } from '@prisma/client';
import { BillingOrdersRepository } from '../billing-orders-repository';

export class PrismaBillingOrdersRepository implements BillingOrdersRepository {
  async findById(id: string): Promise<BillingOrder | null> {
    const billing_order = await prisma.billingOrder.findUnique({
      where: {
        id,
      },
      include: {
        interventions: true,
      },
    });

    return billing_order;
  }

  async listMany(page: number) {
    const billing_orders = await prisma.billingOrder.findMany({
      where: {
        isDeleted: false,
      },
      take: 10,
      skip: (page - 1) * 10,
      include: {
        interventions: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return billing_orders;
  }

  async listAllBillingOrdersTrash() {
    const billing_orders = await prisma.billingOrder.findMany({
      where: {
        isDeleted: true,
      },
      include: {
        interventions: {
          where: {
            isDeleted: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return billing_orders;
  }

  async searchMany(query: string, page: number) {
    const billing_orders = await prisma.billingOrder.findMany({
      where: {
        isDeleted: true,
        OR: [
          {
            description: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      },
      take: 10,
      skip: (page - 1) * 10,
      include: {
        interventions: {
          where: {
            isDeleted: false,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return billing_orders;
  }

  async create(data: Prisma.BillingOrderUncheckedCreateInput) {
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
    const billing_order = await prisma.billingOrder.create({
      data: dataToCreate,
    });

    return billing_order;
  }

  async update(
    id: string,
    updatedBy: string,
    data: Prisma.BillingOrderUpdateInput,
  ) {
    const dataToUpdate = {
      ...data,
      updatedBy,
    };
    const purchase_order = await prisma.billingOrder.update({
      where: {
        id,
      },
      data: dataToUpdate,
    });

    return purchase_order;
  }

  async delete(id: string, deletedBy: string) {
    await prisma.billingOrder.update({
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
