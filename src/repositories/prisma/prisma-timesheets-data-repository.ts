import { prisma } from '@/lib/prisma';
import { TimeSheetData, Prisma } from '@prisma/client';
import { TimeSheetsDataRepository } from '../timesheets-data-repository';

export class PrismaTimeSheetsDataRepository
  implements TimeSheetsDataRepository
{
  async findById(id?: string): Promise<TimeSheetData | null> {
    const timesheetdata = await prisma.timeSheetData.findUnique({
      where: {
        id,
      },
      include: {
        timesheetdays: true,
        Intervention: true,
        Technician: true,
      },
    });

    return timesheetdata;
  }

  async connectToIntervention(
    timesheetId: string,
    interventionId: string,
  ): Promise<void> {
    await prisma.timeSheetData.update({
      where: {
        id: timesheetId,
      },
      data: {
        Intervention: {
          connect: {
            id: interventionId,
          },
        },
      },
    });
  }

  async disconnectToIntervention(timesheetId: string): Promise<void> {
    await prisma.timeSheetData.update({
      where: {
        id: timesheetId,
      },
      data: {
        Intervention: {
          disconnect: true,
        },
      },
    });
  }

  async connectToInvoiceToCustomer(
    timesheetId: string,
    invoiceToCustomerId: string,
  ): Promise<void> {
    await prisma.timeSheetData.update({
      where: {
        id: timesheetId,
      },
      data: {
        InvoiceToCustomer: {
          connect: {
            id: invoiceToCustomerId,
          },
        },
      },
    });
  }

  async disconnectToInvoiceToCustomer(timesheetId: string): Promise<void> {
    await prisma.timeSheetData.update({
      where: {
        id: timesheetId,
      },
      data: {
        InvoiceToCustomer: {
          disconnect: true,
        },
      },
    });
  }

  async listManyByTechnicianId(
    technicianId: string,
    page: number,
  ): Promise<TimeSheetData[] | []> {
    const timesheetsdata = await prisma.timeSheetData.findMany({
      where: {
        technicianId,
      },
      take: 100,
      skip: (page - 1) * 100,
      include: {
        timesheetdays: true,
        Technician: true,
        Intervention: true,
      },
      orderBy: {
        first_date: 'asc',
      },
    });

    return timesheetsdata;
  }

  async listMany(page: number): Promise<TimeSheetData[] | []> {
    const timesheetsdata = await prisma.timeSheetData.findMany({
      take: 100,
      skip: (page - 1) * 100,
      include: {
        timesheetdays: true,
        Intervention: true,
        Technician: true,
      },
      orderBy: {
        first_date: 'asc',
      },
    });

    return timesheetsdata;
  }

  async create(data: Prisma.TimeSheetDataUncheckedCreateInput) {
    const timesheetdata = await prisma.timeSheetData.create({
      data,
    });

    return timesheetdata;
  }

  async update(id: string, data: Prisma.TimeSheetDataUpdateInput) {
    const timesheetdata = await prisma.timeSheetData.update({
      where: {
        id,
      },
      data,
    });

    return timesheetdata;
  }

  async delete(id: string) {
    await prisma.timeSheetData.delete({
      where: {
        id,
      },
    });

    return;
  }
}
