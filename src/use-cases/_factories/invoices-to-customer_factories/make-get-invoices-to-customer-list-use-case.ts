import { PrismaInvoicesToCustomerRepository } from '@/repositories/prisma/prisma-invoices-to-customer-repository';
import { GetInvoicesToCustomerUseCase } from '../../invoices-to-customer/get-invoices-to-customer-list';

export function makeGetInvoicesToCustomerUseCase() {
  const prismaInvoicesToCustomerRepository =
    new PrismaInvoicesToCustomerRepository();
  const useCase = new GetInvoicesToCustomerUseCase(
    prismaInvoicesToCustomerRepository,
  );

  return useCase;
}
