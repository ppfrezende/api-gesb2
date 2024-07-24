import { InvoicesToCustomerRepository } from '@/repositories/invoices-to-customers-repository';
import { InvoiceToCustomer } from '@prisma/client';

interface GetNotApprovedInvoicesToCustomerListUseCaseRequest {
  page: number;
}

interface GetNotApprovedInvoicesToCustomerListUseCaseResponse {
  numberOfRegisters: string;
  invoicesToCustomer: InvoiceToCustomer[] | [];
}

export class GetNotApprovedInvoicesToCustomerUseCase {
  constructor(
    private invoicesToCustomerRepository: InvoicesToCustomerRepository,
  ) {}

  async execute({
    page,
  }: GetNotApprovedInvoicesToCustomerListUseCaseRequest): Promise<GetNotApprovedInvoicesToCustomerListUseCaseResponse> {
    const invoicesToCustomer =
      await this.invoicesToCustomerRepository.listManyNotApproved(page);

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
