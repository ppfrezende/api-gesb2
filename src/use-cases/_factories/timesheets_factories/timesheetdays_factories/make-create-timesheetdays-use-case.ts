import { PrismaTimeSheetDaysRepository } from '@/repositories/prisma/prisma-timesheet-days-repository';
import { CreateTimeSheetDaysUseCase } from '../../../timesheets/timesheet-days/create-timesheet-days';

export function makeCreateTimeSheetDaysUseCase() {
  const prismaTimeSheetDaysRepository = new PrismaTimeSheetDaysRepository();
  const useCase = new CreateTimeSheetDaysUseCase(prismaTimeSheetDaysRepository);

  return useCase;
}
