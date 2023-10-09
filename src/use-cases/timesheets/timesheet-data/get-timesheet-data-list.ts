import { TimeSheetsDataRepository } from '@/repositories/timesheets-data-repository';
import { TimeSheetData } from '@prisma/client';

interface GetTimeSheetDataListUseCaseRequest {
  page: number;
}

interface GetTimeSheetDataListUseCaseResponse {
  numberOfRegisters: string;
  timesheetsdata: TimeSheetData[];
}

export class GetTimeSheetDataListUseCase {
  constructor(private timesheetdataRepository: TimeSheetsDataRepository) {}

  async execute({
    page,
  }: GetTimeSheetDataListUseCaseRequest): Promise<GetTimeSheetDataListUseCaseResponse> {
    const timesheetsdata = await this.timesheetdataRepository.listMany(page);

    timesheetsdata.map((timesheedata) => {
      return timesheedata;
    });

    const numberOfRegisters = timesheetsdata.length.toString();

    return {
      timesheetsdata,
      numberOfRegisters,
    };
  }
}
