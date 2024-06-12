import { TimeSheetsDataRepository } from '@/repositories/timesheets-data-repository';
import { TimeSheetData } from '@prisma/client';

interface CreateTimeSheetDataUseCaseResponse {
  timesheetdata: TimeSheetData;
}

interface CreateTimeSheetDataUseCaseRequest {
  first_date?: Date;
  second_date?: Date;
  intervention_number?: string;
  customerId?: string;
  siteId?: string;
  isInternational?: boolean;
  technicianId: string;
  userName: string;
}

export class CreateTimeSheetDataUseCase {
  constructor(private timesheetdataRepository: TimeSheetsDataRepository) {}

  async execute({
    first_date,
    second_date,
    technicianId,
    customerId,
    siteId,
    intervention_number,
    isInternational,
    userName,
  }: CreateTimeSheetDataUseCaseRequest): Promise<CreateTimeSheetDataUseCaseResponse> {
    const timesheetdata = await this.timesheetdataRepository.create({
      first_date,
      second_date,
      technicianId,
      customerId,
      siteId,
      intervention_number,
      isInternational,
      userName,
    });

    return {
      timesheetdata,
    };
  }
}
