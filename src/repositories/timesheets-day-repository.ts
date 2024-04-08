import { TimeSheetDay, Prisma } from '@prisma/client';

export interface TimeSheetDaysRepository {
  findByTechnicianId(technicianId: string): Promise<TimeSheetDay[] | null>;
  findByTimeSheetDataId(
    timeSheetDataId: string,
  ): Promise<TimeSheetDay[] | null>;
  listMany(page: number): Promise<TimeSheetDay[] | null>;
  createMany(data: Prisma.TimeSheetDayCreateManyInput[]): Promise<void>;
  delete(id: string): Promise<unknown>;
  deleteMany(timeSheetDataId: string): Promise<unknown>;
}
