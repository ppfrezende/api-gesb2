import { PrismaInvoicesToCustomerRepository } from '@/repositories/prisma/prisma-invoices-to-customer-repository';
import { UpdateIsApprovedInvoiceToCustomerUseCase } from '../../invoices-to-customer/update-is-approved-invoice-to-customer';

export function makeUpdateIsApprovedInvoiceToCustomerUseCase() {
  const prismaInvoicesToCustomerRepository =
    new PrismaInvoicesToCustomerRepository();
  const useCase = new UpdateIsApprovedInvoiceToCustomerUseCase(
    prismaInvoicesToCustomerRepository,
  );

  return useCase;
}
