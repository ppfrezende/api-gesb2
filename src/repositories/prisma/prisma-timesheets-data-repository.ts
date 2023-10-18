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
      },
    });

    return timesheetdata;
  }

  async listManyByTechnicianId(technician_id: string, page: number) {
    const timesheetsdata = await prisma.timeSheetData.findMany({
      where: {
        technician_id,
      },
      take: 100,
      skip: (page - 1) * 100,
      include: {
        timesheetdays: true,
      },
    });

    return timesheetsdata;
  }

  async listMany(page: number) {
    const timesheetsdata = await prisma.timeSheetData.findMany({
      take: 100,
      skip: (page - 1) * 100,
      include: {
        timesheetdays: true,
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
