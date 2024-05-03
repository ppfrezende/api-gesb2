import { PrismaTimeSheetsDataRepository } from '@/repositories/prisma/prisma-timesheets-data-repository';
import { ConnectTimeSheetToIntertventionUseCase } from '../../../timesheets/timesheet-data/connect-timesheet-to-intervention';
import { PrismaInterventionsRepository } from '@/repositories/prisma/prisma-interventions-repository';

export function makeConnectTimeSheetToIntertventionUseCase() {
  const prismaTimeSheetDataRepository = new PrismaTimeSheetsDataRepository();
  const prismaInterventionsRepository = new PrismaInterventionsRepository();
  const useCase = new ConnectTimeSheetToIntertventionUseCase(
    prismaTimeSheetDataRepository,
    prismaInterventionsRepository,
  );

  return useCase;
}
