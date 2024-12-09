import { TimeSheetsDataRepository } from '@/repositories/timesheets-data-repository';
import { TimeSheetData } from '@prisma/client';

interface GetTimeSheetDataTrashListUseCaseResponse {
  numberOfRegisters: string;
  timesheetsdata: TimeSheetData[];
}

export class GetTimeSheetDataTrashListUseCase {
  constructor(private timesheetdataRepository: TimeSheetsDataRepository) {}

  async execute(): Promise<GetTimeSheetDataTrashListUseCaseResponse> {
    const timesheetsdata =
      await this.timesheetdataRepository.listAllTimesheetsTrash();

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
