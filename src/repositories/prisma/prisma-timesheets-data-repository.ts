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

  async listManyByTechnicianId(
    technicianId: string,
    page: number,
  ): Promise<TimeSheetData[] | []> {
    const timesheetsdata = await prisma.timeSheetData.findMany({
      where: {
        technicianId,
        isDeleted: false,
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
      where: {
        isDeleted: false,
      },
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

  async listAllTimesheetsTrash(): Promise<TimeSheetData[] | []> {
    const timesheetsdata = await prisma.timeSheetData.findMany({
      where: {
        isDeleted: true,
      },
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
    const timesheetdata = await prisma.timeSheetData.create({
      data: dataToCreate,
    });

    return timesheetdata;
  }

  async update(
    id: string,
    updatedBy: string,
    data: Prisma.TimeSheetDataUpdateInput,
  ) {
    const dataToUpdate = {
      ...data,
      updatedBy,
    };
    const timesheetdata = await prisma.timeSheetData.update({
      where: {
        id,
      },
      data: dataToUpdate,
    });

    return timesheetdata;
  }

  async delete(id: string, deletedBy: string) {
    await prisma.timeSheetData.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
        deleted_at: new Date(),
        deletedBy,
        Intervention: {
          disconnect: true,
        },
      },
    });

    return;
  }
}
