import { prisma } from '@/lib/prisma';
import { TimeSheetDay, Prisma } from '@prisma/client';
import { TimeSheetDaysRepository } from '../timesheets-day-repository';

export class PrismaTimeSheetDaysRepository implements TimeSheetDaysRepository {
  async findByTechnicianId(
    technicianId: string,
  ): Promise<TimeSheetDay[] | null> {
    const timesheetdays = await prisma.timeSheetDay.findMany({
      where: {
        technicianId,
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

  async listMany(page: number): Promise<TimeSheetDay[] | null> {
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

  async delete(id: string, deletedBy: string) {
    await prisma.timeSheetDay.update({
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

  async deleteMany(timeSheetDataId: string, deletedBy: string) {
    await prisma.timeSheetDay.updateMany({
      where: {
        timeSheetDataId,
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
