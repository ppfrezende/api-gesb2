import { PrismaTimeSheetsDataRepository } from '@/repositories/prisma/prisma-timesheets-data-repository';
import { DisconnectTimeSheetToInvoiceToCustomerUseCase } from '../../../timesheets/timesheet-data/disconnect-timesheet-to-invoice-to-customer';

export function makeDisconnectTimeSheetToInvoiceToCustomerUseCase() {
  const prismaTimeSheetDataRepository = new PrismaTimeSheetsDataRepository();
  const useCase = new DisconnectTimeSheetToInvoiceToCustomerUseCase(
    prismaTimeSheetDataRepository,
  );

  return useCase;
}
