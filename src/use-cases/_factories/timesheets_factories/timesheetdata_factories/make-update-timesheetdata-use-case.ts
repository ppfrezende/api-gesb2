import { PrismaTimeSheetsDataRepository } from '@/repositories/prisma/prisma-timesheets-data-repository';
import { UpdateTimeSheetDataUseCase } from '../../../timesheets/timesheet-data/update-timesheet-data';

export function makeUpdateTimeSheetDataUseCase() {
  const prismaTimeSheetDataRepository = new PrismaTimeSheetsDataRepository();
  const useCase = new UpdateTimeSheetDataUseCase(prismaTimeSheetDataRepository);

  return useCase;
}
