import { PrismaTimeSheetsDataRepository } from '@/repositories/prisma/prisma-timesheets-data-repository';
import { DisconnectTimeSheetToInterventionUseCase } from '../../../timesheets/timesheet-data/disconnect-timesheet-to-intervention';

export function makeDisconnectTimeSheetToInterventionUseCase() {
  const prismaTimeSheetDataRepository = new PrismaTimeSheetsDataRepository();
  const useCase = new DisconnectTimeSheetToInterventionUseCase(
    prismaTimeSheetDataRepository,
  );

  return useCase;
}
