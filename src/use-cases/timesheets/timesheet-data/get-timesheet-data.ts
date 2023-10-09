import { TimeSheetsDataRepository } from '@/repositories/timesheets-data-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { TimeSheetData } from '@prisma/client';

interface GetTimeSheetDataUseCaseRequest {
  timesheetdataId: string;
}

interface GetTimeSheetDataUseCaseResponse {
  timesheetdata: TimeSheetData;
}

export class GetTimeSheetDataUseCase {
  constructor(private timesheetdataRepository: TimeSheetsDataRepository) {}

  async execute({
    timesheetdataId,
  }: GetTimeSheetDataUseCaseRequest): Promise<GetTimeSheetDataUseCaseResponse> {
    const timesheetdata = await this.timesheetdataRepository.findById(
      timesheetdataId,
    );

    if (!timesheetdata) {
      throw new ResourceNotFoundError();
    }

    return {
      timesheetdata,
    };
  }
}
