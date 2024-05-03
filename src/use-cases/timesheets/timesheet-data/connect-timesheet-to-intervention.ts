import { InterventionsRepository } from '@/repositories/interventions-repository';
import { TimeSheetsDataRepository } from '@/repositories/timesheets-data-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';

interface ConnectTimeSheetToIntertventionUseCaseRequest {
  timesheetdataId: string;
  interventionId: string;
}

export class ConnectTimeSheetToIntertventionUseCase {
  constructor(
    private timesheetdataRepository: TimeSheetsDataRepository,
    private interventionsRepository: InterventionsRepository,
  ) {}

  async execute({
    timesheetdataId,
    interventionId,
  }: ConnectTimeSheetToIntertventionUseCaseRequest): Promise<void> {
    const timesheetdata = await this.timesheetdataRepository.findById(
      timesheetdataId,
    );

    const intervention = await this.interventionsRepository.findById(
      interventionId,
    );

    if (!intervention || !timesheetdata) {
      throw new ResourceNotFoundError();
    }

    await this.timesheetdataRepository.connectToIntervention(
      timesheetdataId,
      interventionId,
    );

    return;
  }
}
