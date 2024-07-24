import { PrismaInvoicesToCustomerRepository } from '@/repositories/prisma/prisma-invoices-to-customer-repository';
import { GetNotApprovedInvoicesToCustomerUseCase } from '../../invoices-to-customer/get-not-approved-invoices-to-customer';

export function makeGetNotApprovedInvoicesToCustomerUseCase() {
  const prismaInvoicesToCustomerRepository =
    new PrismaInvoicesToCustomerRepository();
  const useCase = new GetNotApprovedInvoicesToCustomerUseCase(
    prismaInvoicesToCustomerRepository,
  );

  return useCase;
}
