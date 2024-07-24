import { InvoicesToCustomerRepository } from '@/repositories/invoices-to-customers-repository';
import { InvoiceToCustomer } from '@prisma/client';

interface GetApprovedInvoicesToCustomerListUseCaseRequest {
  page: number;
}

interface GetApprovedInvoicesToCustomerListUseCaseResponse {
  numberOfRegisters: string;
  invoicesToCustomer: InvoiceToCustomer[] | [];
}

export class GetApprovedInvoicesToCustomerUseCase {
  constructor(
    private invoicesToCustomerRepository: InvoicesToCustomerRepository,
  ) {}

  async execute({
    page,
  }: GetApprovedInvoicesToCustomerListUseCaseRequest): Promise<GetApprovedInvoicesToCustomerListUseCaseResponse> {
    const invoicesToCustomer =
      await this.invoicesToCustomerRepository.listManyApproved(page);

    invoicesToCustomer.map((invoice) => {
      return invoice;
    });

    const numberOfRegisters = invoicesToCustomer.length.toString();

    return {
      numberOfRegisters,
      invoicesToCustomer,
    };
  }
}
