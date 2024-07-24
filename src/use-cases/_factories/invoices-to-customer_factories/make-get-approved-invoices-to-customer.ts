import { PrismaInvoicesToCustomerRepository } from '@/repositories/prisma/prisma-invoices-to-customer-repository';
import { GetApprovedInvoicesToCustomerUseCase } from '../../invoices-to-customer/get-approved-invoices-to-customer';

export function makeGetApprovedInvoicesToCustomerUseCase() {
  const prismaInvoicesToCustomerRepository =
    new PrismaInvoicesToCustomerRepository();
  const useCase = new GetApprovedInvoicesToCustomerUseCase(
    prismaInvoicesToCustomerRepository,
  );

  return useCase;
}
