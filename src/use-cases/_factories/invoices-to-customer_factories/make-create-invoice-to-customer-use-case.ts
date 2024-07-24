import { PrismaInvoicesToCustomerRepository } from '@/repositories/prisma/prisma-invoices-to-customer-repository';
import { CreateInvoiceToCustomerUseCase } from '../../invoices-to-customer/create-invoice-to-customer';

export function makeCreateInvoiceToCustomerUseCase() {
  const prismaInvoicesToCustomerRepository =
    new PrismaInvoicesToCustomerRepository();
  const useCase = new CreateInvoiceToCustomerUseCase(
    prismaInvoicesToCustomerRepository,
  );

  return useCase;
}
