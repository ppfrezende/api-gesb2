import { TimeSheetsDataRepository } from '@/repositories/timesheets-data-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { TimeSheetData, Prisma } from '@prisma/client';

interface UpdateTimeSheetDataUseCaseRequest {
  timesheetdataId: string;
  data: Prisma.TimeSheetDataUpdateInput;
}

interface UpdateTimeSheetDataUseCaseResponse {
  updatedTimeSheetData: TimeSheetData | null;
}

export class UpdateTimeSheetDataUseCase {
  constructor(private timesheetdataRepository: TimeSheetsDataRepository) {}

  async execute({
    timesheetdataId,
    data,
  }: UpdateTimeSheetDataUseCaseRequest): Promise<UpdateTimeSheetDataUseCaseResponse> {
    const timeshetdata = await this.timesheetdataRepository.findById(
      timesheetdataId,
    );

    if (!timeshetdata) {
      throw new ResourceNotFoundError();
    }

    const updatedTimeSheetData = await this.timesheetdataRepository.update(
      timesheetdataId,
      data,
    );

    return {
      updatedTimeSheetData,
    };
  }
}
