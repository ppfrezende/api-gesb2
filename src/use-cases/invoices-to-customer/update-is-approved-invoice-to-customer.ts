import { InvoiceToCustomer, Prisma } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { InvoicesToCustomerRepository } from '@/repositories/invoices-to-customers-repository';

interface UpdateIsApprovedInvoiceToCustomerUseCaseRequest {
  invoiceToCustomerId: string;
  data: Prisma.InvoiceToCustomerUpdateInput;
}

interface UpdateIsApprovedInvoiceToCustomerUseCaseResponse {
  updatedInvoiceToCustomer: InvoiceToCustomer | null;
}

export class UpdateIsApprovedInvoiceToCustomerUseCase {
  constructor(
    private invoicesToCustomerRepository: InvoicesToCustomerRepository,
  ) {}

  async execute({
    invoiceToCustomerId,
    data,
  }: UpdateIsApprovedInvoiceToCustomerUseCaseRequest): Promise<UpdateIsApprovedInvoiceToCustomerUseCaseResponse> {
    const invoiceToCustomer = await this.invoicesToCustomerRepository.findById(
      invoiceToCustomerId,
    );

    if (!invoiceToCustomer) {
      throw new ResourceNotFoundError();
    }

    const updatedInvoiceToCustomer =
      await this.invoicesToCustomerRepository.update(invoiceToCustomerId, data);

    return {
      updatedInvoiceToCustomer,
    };
  }
}
