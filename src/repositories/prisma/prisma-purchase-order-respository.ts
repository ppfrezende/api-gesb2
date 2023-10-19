import { prisma } from '@/lib/prisma';
import { PurchaseOrder, Prisma } from '@prisma/client';
import { PurchaseOrdersRepository } from '../purchase-orders-repository';

export class PrismaPurchaseOrdersRepository
  implements PurchaseOrdersRepository
{
  async findById(id: string): Promise<PurchaseOrder | null> {
    const purchase_order = await prisma.purchaseOrder.findUnique({
      where: {
        id,
      },
      include: {
        skills: true,
      },
    });

    return purchase_order;
  }

  async findByName(name?: string): Promise<PurchaseOrder | null> {
    const purchase_order = await prisma.purchaseOrder.findUnique({
      where: {
        name,
      },
    });

    return purchase_order;
  }

  async listMany(page: number) {
    const purchase_orders = await prisma.purchaseOrder.findMany({
      take: 100,
      skip: (page - 1) * 100,
      include: {
        skills: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return purchase_orders;
  }

  async searchMany(query: string, page: number) {
    const purchase_orders = await prisma.purchaseOrder.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      take: 100,
      skip: (page - 1) * 100,
      include: {
        skills: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return purchase_orders;
  }

  async create(data: Prisma.PurchaseOrderUncheckedCreateInput) {
    const purchase_order = await prisma.purchaseOrder.create({
      data,
      include: {
        skills: true,
      },
    });

    return purchase_order;
  }

  async update(id: string, data: Prisma.PurchaseOrderUpdateInput) {
    const purchase_order = await prisma.purchaseOrder.update({
      where: {
        id,
      },
      data,
    });

    return purchase_order;
  }

  async delete(id: string) {
    const deleteSkills = prisma.skill.deleteMany({
      where: {
        id_PO: id,
      },
    });

    const deletePO = prisma.purchaseOrder.delete({
      where: {
        id,
      },
    });

    return prisma.$transaction([deleteSkills, deletePO]);
  }
}
