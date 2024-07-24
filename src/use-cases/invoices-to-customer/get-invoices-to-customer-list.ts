import { InvoicesToCustomerRepository } from '@/repositories/invoices-to-customers-repository';
import { InvoiceToCustomer } from '@prisma/client';

interface GetInvoicesToCustomerListUseCaseRequest {
  page: number;
}

interface GetInvoicesToCustomerListUseCaseResponse {
  numberOfRegisters: string;
  invoicesToCustomer: InvoiceToCustomer[] | [];
}

export class GetInvoicesToCustomerUseCase {
  constructor(
    private invoicesToCustomerRepository: InvoicesToCustomerRepository,
  ) {}

  async execute({
    page,
  }: GetInvoicesToCustomerListUseCaseRequest): Promise<GetInvoicesToCustomerListUseCaseResponse> {
    const invoicesToCustomer = await this.invoicesToCustomerRepository.listMany(
      page,
    );

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
