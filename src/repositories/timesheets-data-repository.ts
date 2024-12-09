import { TimeSheetData, Prisma } from '@prisma/client';

export interface TimeSheetsDataRepository {
  findById(id?: string): Promise<TimeSheetData | null>;
  listManyByTechnicianId(
    technicianId: string,
    page: number,
  ): Promise<TimeSheetData[] | []>;
  listMany(page: number): Promise<TimeSheetData[] | []>;
  listAllTimesheetsTrash(): Promise<TimeSheetData[] | []>;
  create(
    data: Prisma.TimeSheetDataUncheckedCreateInput,
  ): Promise<TimeSheetData>;
  update(
    id: string,
    data: Prisma.TimeSheetDataUpdateInput,
  ): Promise<TimeSheetData | null>;
  delete(id: string, deletedBy: string): Promise<unknown>;
  connectToIntervention(
    timesheetId: string,
    interventionId: string,
  ): Promise<void>;
  disconnectToIntervention(timesheetId: string): Promise<void>;
}
