import { InvoiceToCustomer } from '@prisma/client';
import { InvoicesToCustomerRepository } from '@/repositories/invoices-to-customers-repository';

interface CreateInvoiceToCustomerUseCaseRequest {
  isDolarInvoice: boolean;
  invoice_currency_quote: number;
  total_value: number;
  total_value_in_dollar?: number;
  interventionId: string;
  technicianId: string;
  siteId: string;
  customerId: string;
  userName: string;
}

interface CreateInvoiceToCustomerUseCaseResponse {
  invoiceToCustomer: InvoiceToCustomer;
}

export class CreateInvoiceToCustomerUseCase {
  constructor(
    private invoiceToCustomerRepository: InvoicesToCustomerRepository,
  ) {}

  async execute({
    isDolarInvoice,
    invoice_currency_quote,
    total_value,
    total_value_in_dollar,
    interventionId,
    technicianId,
    siteId,
    customerId,
    userName,
  }: CreateInvoiceToCustomerUseCaseRequest): Promise<CreateInvoiceToCustomerUseCaseResponse> {
    const invoiceToCustomer = await this.invoiceToCustomerRepository.create({
      isDolarInvoice,
      invoice_currency_quote,
      total_value,
      total_value_in_dollar,
      interventionId,
      technicianId,
      siteId,
      customerId,
      userName,
    });

    return {
      invoiceToCustomer,
    };
  }
}
