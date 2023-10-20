import { TimeSheetsDataRepository } from '@/repositories/timesheets-data-repository';
import { TimeSheetData } from '@prisma/client';

interface CreateTimeSheetDataUseCaseResponse {
  timesheetdata: TimeSheetData;
}

export class CreateTimeSheetDataUseCase {
  constructor(private timesheetdataRepository: TimeSheetsDataRepository) {}

  async execute({
    departure_date,
    arrival_date,
    traveled_hours,
    normal_hours_range_A,
    normal_hours_range_B,
    extra_hours_range_C,
    extra_hours_range_D,
    technician_id,
    intervention_description,
    site,
    isInternational,
    userName,
  }: TimeSheetData): Promise<CreateTimeSheetDataUseCaseResponse> {
    const timesheetdata = await this.timesheetdataRepository.create({
      departure_date,
      arrival_date,
      traveled_hours,
      normal_hours_range_A,
      normal_hours_range_B,
      extra_hours_range_C,
      extra_hours_range_D,
      technician_id,
      intervention_description,
      site,
      isInternational,
      userName,
    });

    return {
      timesheetdata,
    };
  }
}
