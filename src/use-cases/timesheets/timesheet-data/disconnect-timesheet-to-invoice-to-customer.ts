import { TimeSheetsDataRepository } from '@/repositories/timesheets-data-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';

interface DisconnectTimeSheetToInvoiceToCustomerUseCaseRequest {
  timesheetdataId: string;
}

export class DisconnectTimeSheetToInvoiceToCustomerUseCase {
  constructor(private timesheetdataRepository: TimeSheetsDataRepository) {}

  async execute({
    timesheetdataId,
  }: DisconnectTimeSheetToInvoiceToCustomerUseCaseRequest): Promise<void> {
    const timesheetdata = await this.timesheetdataRepository.findById(
      timesheetdataId,
    );

    if (!timesheetdata) {
      throw new ResourceNotFoundError();
    }

    await this.timesheetdataRepository.disconnectToIntervention(
      timesheetdataId,
    );

    return;
  }
}
