import { InvoicesToCustomerRepository } from '@/repositories/invoices-to-customers-repository';
import { InvoiceToCustomer } from '@prisma/client';

interface GetInvoiceToCustomerUseCaseRequest {
  invoiceToCustomerId: string;
}

interface GetInvoiceToCustomerUseCaseResponse {
  invoiceToCustomer: InvoiceToCustomer | null;
}

export class GetInvoiceToCustomerUseCase {
  constructor(
    private invoicesToCustomerRepository: InvoicesToCustomerRepository,
  ) {}

  async execute({
    invoiceToCustomerId,
  }: GetInvoiceToCustomerUseCaseRequest): Promise<GetInvoiceToCustomerUseCaseResponse> {
    const invoiceToCustomer = await this.invoicesToCustomerRepository.findById(
      invoiceToCustomerId,
    );

    return {
      invoiceToCustomer,
    };
  }
}
