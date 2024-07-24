import { PrismaTimeSheetsDataRepository } from '@/repositories/prisma/prisma-timesheets-data-repository';
import { ConnectTimeSheetToInvoiceToCustomerUseCase } from '../../../timesheets/timesheet-data/connect-timesheet-to-invoice-to-customer';
import { PrismaInvoicesToCustomerRepository } from '@/repositories/prisma/prisma-invoices-to-customer-repository';

export function makeConnectTimeSheetToInvoiceToCustomerUseCase() {
  const prismaTimeSheetDataRepository = new PrismaTimeSheetsDataRepository();
  const prismaInterventionsRepository =
    new PrismaInvoicesToCustomerRepository();
  const useCase = new ConnectTimeSheetToInvoiceToCustomerUseCase(
    prismaTimeSheetDataRepository,
    prismaInterventionsRepository,
  );

  return useCase;
}
