import { PrismaTimeSheetsDataRepository } from '@/repositories/prisma/prisma-timesheets-data-repository';
import { GetTimeSheetDataByTechIdListUseCase } from '../../../timesheets/timesheet-data/get-timesheet-data-list-by-tech-id';

export function makeGetTimeSheetDataByTechIdListUseCase() {
  const prismaTimeSheetDataRepository = new PrismaTimeSheetsDataRepository();
  const useCase = new GetTimeSheetDataByTechIdListUseCase(
    prismaTimeSheetDataRepository,
  );

  return useCase;
}
