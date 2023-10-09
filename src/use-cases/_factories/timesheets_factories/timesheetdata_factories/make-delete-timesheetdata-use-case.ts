import { PrismaTimeSheetsDataRepository } from '@/repositories/prisma/prisma-timesheets-data-repository';
import { DeleteTimeSheetDataUseCaseResponse } from '../../../timesheets/timesheet-data/delete-timesheet-data';

export function makeDeleteTimeSheetDataUseCaseResponse() {
  const prismaTimeSheetDataRepository = new PrismaTimeSheetsDataRepository();
  const useCase = new DeleteTimeSheetDataUseCaseResponse(
    prismaTimeSheetDataRepository,
  );

  return useCase;
}
