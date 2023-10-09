import { PrismaTimeSheetsDataRepository } from '@/repositories/prisma/prisma-timesheets-data-repository';
import { GetTimeSheetDataUseCase } from '../../../timesheets/timesheet-data/get-timesheet-data';

export function makeGetTimeSheetDataUseCase() {
  const prismaTimeSheetDataRepository = new PrismaTimeSheetsDataRepository();
  const useCase = new GetTimeSheetDataUseCase(prismaTimeSheetDataRepository);

  return useCase;
}
