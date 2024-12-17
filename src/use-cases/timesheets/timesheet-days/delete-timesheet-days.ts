import { TimeSheetDaysRepository } from '@/repositories/timesheets-day-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';

interface DeleteTimeSheetDaysUseCaseRequest {
  timesheetdataId: string;
  deletedBy: string;
}

export class DeleteTimeSheetDaysUseCaseResponse {
  constructor(private timesheetdaysRepository: TimeSheetDaysRepository) {}

  async execute({
    timesheetdataId,
    deletedBy,
  }: DeleteTimeSheetDaysUseCaseRequest): Promise<void> {
    const timesheetdays =
      await this.timesheetdaysRepository.findByTimeSheetDataId(timesheetdataId);

    if (!timesheetdays) {
      throw new ResourceNotFoundError();
    } else {
      await this.timesheetdaysRepository.deleteMany(timesheetdataId, deletedBy);

      return;
    }
  }
}
