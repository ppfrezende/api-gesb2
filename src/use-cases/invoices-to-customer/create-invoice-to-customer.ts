import { InvoiceToCustomer } from '@prisma/client';
import { InvoicesToCustomerRepository } from '@/repositories/invoices-to-customers-repository';

interface CreateInvoiceToCustomerUseCaseRequest {
  isDolarInvoice: boolean;
  invoice_currency_quote: number;
  final_total: number;
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
    final_total,
    interventionId,
    technicianId,
    siteId,
    customerId,
    userName,
  }: CreateInvoiceToCustomerUseCaseRequest): Promise<CreateInvoiceToCustomerUseCaseResponse> {
    const invoiceToCustomer = await this.invoiceToCustomerRepository.create({
      isDolarInvoice,
      invoice_currency_quote,
      final_total,
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
