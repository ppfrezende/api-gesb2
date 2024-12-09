import { PrismaTimeSheetsDataRepository } from '@/repositories/prisma/prisma-timesheets-data-repository';
import { GetTimeSheetDataTrashListUseCase } from '../../../timesheets/timesheet-data/get-all-timesheets-trash';

export function makeGetTimeSheetDataTrashListUseCase() {
  const prismaTimeSheetDataRepository = new PrismaTimeSheetsDataRepository();
  const useCase = new GetTimeSheetDataTrashListUseCase(
    prismaTimeSheetDataRepository,
  );

  return useCase;
}
