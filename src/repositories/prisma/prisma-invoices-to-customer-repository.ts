import { prisma } from '@/lib/prisma';
import { InvoiceToCustomer, Prisma } from '@prisma/client';
import { InvoicesToCustomerRepository } from '../invoices-to-customers-repository';

export class PrismaInvoicesToCustomerRepository
  implements InvoicesToCustomerRepository
{
  async findById(id: string): Promise<InvoiceToCustomer | null> {
    const purchase_order = await prisma.invoiceToCustomer.findUnique({
      where: {
        id,
      },
      include: {
        Intervention: true,
        Customer: true,
        Site: true,
        Technician: true,
        timesheetsdata: true,
      },
    });

    return purchase_order;
  }

  async listMany(page: number) {
    const invoiceToCustomer = await prisma.invoiceToCustomer.findMany({
      take: 100,
      skip: (page - 1) * 100,
      include: {
        Intervention: true,
        Customer: true,
        Site: true,
        Technician: true,
        timesheetsdata: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return invoiceToCustomer;
  }

  async listManyApproved(page: number) {
    const invoiceToCustomer = await prisma.invoiceToCustomer.findMany({
      where: {
        isApproved: true,
      },
      take: 100,
      skip: (page - 1) * 100,
      include: {
        Intervention: true,
        Customer: true,
        Site: true,
        Technician: true,
        timesheetsdata: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return invoiceToCustomer;
  }
  async listManyNotApproved(page: number) {
    const invoiceToCustomer = await prisma.invoiceToCustomer.findMany({
      where: {
        isApproved: false,
      },
      take: 100,
      skip: (page - 1) * 100,
      include: {
        Intervention: true,
        Customer: true,
        Site: true,
        Technician: true,
        timesheetsdata: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return invoiceToCustomer;
  }

  async create(data: Prisma.InvoiceToCustomerUncheckedCreateInput) {
    const invoiceToCustomer = await prisma.invoiceToCustomer.create({
      data,
      include: {
        Intervention: true,
        Customer: true,
        Site: true,
        Technician: true,
        timesheetsdata: true,
      },
    });

    return invoiceToCustomer;
  }

  async delete(id: string) {
    await prisma.invoiceToCustomer.delete({
      where: {
        id,
      },
    });

    return;
  }

  async update(id: string, data: Prisma.InvoiceToCustomerUpdateInput) {
    const invoiceToCustomer = await prisma.invoiceToCustomer.update({
      where: {
        id,
      },
      data,
    });

    return invoiceToCustomer;
  }
}
