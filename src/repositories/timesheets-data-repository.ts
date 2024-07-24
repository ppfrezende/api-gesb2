import { TimeSheetData, Prisma } from '@prisma/client';

export interface TimeSheetsDataRepository {
  findById(id?: string): Promise<TimeSheetData | null>;
  listManyByTechnicianId(
    technicianId: string,
    page: number,
  ): Promise<TimeSheetData[] | []>;
  listMany(page: number): Promise<TimeSheetData[] | []>;
  create(
    data: Prisma.TimeSheetDataUncheckedCreateInput,
  ): Promise<TimeSheetData>;
  update(
    id: string,
    data: Prisma.TimeSheetDataUpdateInput,
  ): Promise<TimeSheetData | null>;
  delete(id: string): Promise<unknown>;
  connectToIntervention(
    timesheetId: string,
    interventionId: string,
  ): Promise<void>;
  disconnectToIntervention(timesheetId: string): Promise<void>;
  connectToInvoiceToCustomer(
    timesheetId: string,
    invoiceToCustomerId: string,
  ): Promise<void>;
  disconnectToInvoiceToCustomer(timesheetId: string): Promise<void>;
}
