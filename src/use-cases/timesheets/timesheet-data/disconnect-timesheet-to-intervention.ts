import { TimeSheetsDataRepository } from '@/repositories/timesheets-data-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';

interface DisconnectTimeSheetToIntertventionUseCaseRequest {
  timesheetdataId: string;
}

export class DisconnectTimeSheetToIntertventionUseCase {
  constructor(private timesheetdataRepository: TimeSheetsDataRepository) {}

  async execute({
    timesheetdataId,
  }: DisconnectTimeSheetToIntertventionUseCaseRequest): Promise<void> {
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
