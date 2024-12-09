import { TimeSheetsDataRepository } from '@/repositories/timesheets-data-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';

interface DeleteTimeSheetDataUseCaseRequest {
  timesheetdataId: string;
  deletedBy: string;
}

export class DeleteTimeSheetDataUseCaseResponse {
  constructor(private timesheetdataRepository: TimeSheetsDataRepository) {}

  async execute({
    timesheetdataId,
    deletedBy,
  }: DeleteTimeSheetDataUseCaseRequest): Promise<void> {
    const timesheedata = await this.timesheetdataRepository.findById(
      timesheetdataId,
    );

    if (!timesheedata) {
      throw new ResourceNotFoundError();
    } else {
      await this.timesheetdataRepository.delete(timesheetdataId, deletedBy);

      return;
    }
  }
}
