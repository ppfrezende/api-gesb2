import { PrismaInvoicesToCustomerRepository } from '@/repositories/prisma/prisma-invoices-to-customer-repository';
import { GetInvoiceToCustomerUseCase } from '../../invoices-to-customer/get-invoice-to-customer';

export function makeGetInvoiceToCustomerUseCase() {
  const prismaInvoicesToCustomerRepository =
    new PrismaInvoicesToCustomerRepository();
  const useCase = new GetInvoiceToCustomerUseCase(
    prismaInvoicesToCustomerRepository,
  );

  return useCase;
}
