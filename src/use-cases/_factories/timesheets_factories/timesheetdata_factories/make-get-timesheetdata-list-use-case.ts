import { PrismaTimeSheetsDataRepository } from '@/repositories/prisma/prisma-timesheets-data-repository';
import { GetTimeSheetDataListUseCase } from '../../../timesheets/timesheet-data/get-timesheet-data-list';

export function makeGetTimeSheetDataListUseCase() {
  const prismaTimeSheetDataRepository = new PrismaTimeSheetsDataRepository();
  const useCase = new GetTimeSheetDataListUseCase(
    prismaTimeSheetDataRepository,
  );

  return useCase;
}
