import { TimeSheetsDataRepository } from '@/repositories/timesheets-data-repository';
import { TimeSheetData } from '@prisma/client';

interface GetTimeSheetDataByTechIdListUseCaseRequest {
  technicianId: string;
  page: number;
}

interface GetTimeSheetDataByTechIdListUseCaseResponse {
  numberOfRegisters: string;
  timesheetsdata: TimeSheetData[];
}

export class GetTimeSheetDataByTechIdListUseCase {
  constructor(private timesheetdataRepository: TimeSheetsDataRepository) {}

  async execute({
    technicianId,
    page,
  }: GetTimeSheetDataByTechIdListUseCaseRequest): Promise<GetTimeSheetDataByTechIdListUseCaseResponse> {
    const timesheetsdata =
      await this.timesheetdataRepository.listManyByTechnicianId(
        technicianId,
        page,
      );

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
