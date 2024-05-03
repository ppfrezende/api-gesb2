import { PrismaTimeSheetsDataRepository } from '@/repositories/prisma/prisma-timesheets-data-repository';
import { DisconnectTimeSheetToIntertventionUseCase } from '../../../timesheets/timesheet-data/disconnect-timesheet-to-intervention';

export function makeDisconnectTimeSheetToIntertventionUseCase() {
  const prismaTimeSheetDataRepository = new PrismaTimeSheetsDataRepository();
  const useCase = new DisconnectTimeSheetToIntertventionUseCase(
    prismaTimeSheetDataRepository,
  );

  return useCase;
}
