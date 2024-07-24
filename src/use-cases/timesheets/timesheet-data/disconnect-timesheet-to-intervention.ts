import { TimeSheetsDataRepository } from '@/repositories/timesheets-data-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';

interface DisconnectTimeSheetToInterventionUseCaseRequest {
  timesheetdataId: string;
}

export class DisconnectTimeSheetToInterventionUseCase {
  constructor(private timesheetdataRepository: TimeSheetsDataRepository) {}

  async execute({
    timesheetdataId,
  }: DisconnectTimeSheetToInterventionUseCaseRequest): Promise<void> {
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
