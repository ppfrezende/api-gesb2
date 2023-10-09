import { PrismaTimeSheetsDataRepository } from '@/repositories/prisma/prisma-timesheets-data-repository';
import { CreateTimeSheetDataUseCase } from '../../../timesheets/timesheet-data/create-timesheet-data';

export function makeCreateTimeSheetDataUseCase() {
  const prismaTimeSheetDataRepository = new PrismaTimeSheetsDataRepository();
  const useCase = new CreateTimeSheetDataUseCase(prismaTimeSheetDataRepository);

  return useCase;
}
