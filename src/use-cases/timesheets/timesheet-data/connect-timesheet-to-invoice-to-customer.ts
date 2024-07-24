import { InvoicesToCustomerRepository } from '@/repositories/invoices-to-customers-repository';
import { TimeSheetsDataRepository } from '@/repositories/timesheets-data-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';

interface ConnectTimeSheetToInvoiceToCustomerUseCaseRequest {
  timesheetdataId: string;
  invoiceToCustomerId: string;
}

export class ConnectTimeSheetToInvoiceToCustomerUseCase {
  constructor(
    private timesheetdataRepository: TimeSheetsDataRepository,
    private invoiceToCustomerRepository: InvoicesToCustomerRepository,
  ) {}

  async execute({
    timesheetdataId,
    invoiceToCustomerId,
  }: ConnectTimeSheetToInvoiceToCustomerUseCaseRequest): Promise<void> {
    const timesheetdata = await this.timesheetdataRepository.findById(
      timesheetdataId,
    );

    const invoiceToCustomer = await this.invoiceToCustomerRepository.findById(
      invoiceToCustomerId,
    );

    if (!invoiceToCustomer || !timesheetdata) {
      throw new ResourceNotFoundError();
    }

    await this.timesheetdataRepository.connectToInvoiceToCustomer(
      timesheetdataId,
      invoiceToCustomerId,
    );

    return;
  }
}
