import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { InvoicesToCustomerRepository } from '@/repositories/invoices-to-customers-repository';

interface DeleteInvoiceToCustomerUseCaseRequest {
  invoiceToCustomerId: string;
}

export class DeleteInvoiceToCustomerUseCase {
  constructor(
    private invoicesToCustomerRepository: InvoicesToCustomerRepository,
  ) {}

  async execute({
    invoiceToCustomerId,
  }: DeleteInvoiceToCustomerUseCaseRequest): Promise<void> {
    const invoiceToCustomer = await this.invoicesToCustomerRepository.findById(
      invoiceToCustomerId,
    );

    if (!invoiceToCustomer) {
      throw new ResourceNotFoundError();
    } else {
      await this.invoicesToCustomerRepository.delete(invoiceToCustomerId);

      return;
    }
  }
}
