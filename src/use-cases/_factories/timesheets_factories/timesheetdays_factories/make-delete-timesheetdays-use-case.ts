import { PrismaTimeSheetDaysRepository } from '@/repositories/prisma/prisma-timesheet-days-repository';
import { DeleteTimeSheetDaysUseCaseResponse } from '../../../timesheets/timesheet-days/delete-timesheet-days';

export function makeDeleteTimeSheetDaysUseCaseResponse() {
  const prismaTimeSheetDaysRepository = new PrismaTimeSheetDaysRepository();
  const useCase = new DeleteTimeSheetDaysUseCaseResponse(
    prismaTimeSheetDaysRepository,
  );

  return useCase;
}
