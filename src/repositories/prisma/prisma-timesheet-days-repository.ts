import { prisma } from '@/lib/prisma';
import { TimeSheetDay, Prisma } from '@prisma/client';
import { TimeSheetDaysRepository } from '../timesheets-day-repository';

export class PrismaTimeSheetDaysRepository implements TimeSheetDaysRepository {
  async findByTechnicianId(
    technician_id: string,
  ): Promise<TimeSheetDay[] | null> {
    const timesheetdays = await prisma.timeSheetDay.findMany({
      where: {
        technician_id,
      },
      include: {
        TimeSheetData: true,
      },
    });

    return timesheetdays;
  }

  async findByTimeSheetDataId(
    timeSheetDataId: string,
  ): Promise<TimeSheetDay[] | null> {
    const timesheetdays = await prisma.timeSheetDay.findMany({
      where: {
        timeSheetDataId,
      },
    });

    return timesheetdays;
  }

  async listMany(page: number) {
    const timesheetdays = await prisma.timeSheetDay.findMany({
      take: 16,
      skip: (page - 1) * 16,
      include: {
        TimeSheetData: true,
      },
    });

    return timesheetdays;
  }

  async createMany(data: Prisma.TimeSheetDayCreateManyInput[]) {
    await prisma.timeSheetDay.createMany({
      data,
    });

    return;
  }

  async delete(id: string) {
    await prisma.timeSheetDay.delete({
      where: {
        id,
      },
    });

    return;
  }

  async deleteMany(timeSheetDataId: string) {
    await prisma.timeSheetDay.deleteMany({
      where: {
        timeSheetDataId,
      },
    });

    return;
  }
}
