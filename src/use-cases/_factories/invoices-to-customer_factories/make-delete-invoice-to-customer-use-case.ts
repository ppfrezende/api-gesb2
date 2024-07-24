import { PrismaInvoicesToCustomerRepository } from '@/repositories/prisma/prisma-invoices-to-customer-repository';
import { DeleteInvoiceToCustomerUseCase } from '../../invoices-to-customer/delete-invoice-to-customer';

export function makeDeleteInvoiceToCustomerUseCase() {
  const prismaInvoicesToCustomerRepository =
    new PrismaInvoicesToCustomerRepository();
  const useCase = new DeleteInvoiceToCustomerUseCase(
    prismaInvoicesToCustomerRepository,
  );

  return useCase;
}
