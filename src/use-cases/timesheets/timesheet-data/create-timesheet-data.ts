import { TimeSheetsDataRepository } from '@/repositories/timesheets-data-repository';
import { TimeSheetData } from '@prisma/client';

interface CreateTimeSheetDataUseCaseResponse {
  timesheetdata: TimeSheetData;
}

interface CreateTimeSheetDataUseCaseRequest {
  departure_date?: Date;
  arrival_date?: Date;
  traveled_hours?: number;
  normal_hours_range_A?: number;
  normal_hours_range_B?: number;
  extra_hours_range_C?: number;
  extra_hours_range_D?: number;
  technician_id?: string;
  intervention_description?: string;
  site?: string;
  isInternational?: boolean;
  userName: string;
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
  }: CreateTimeSheetDataUseCaseRequest): Promise<CreateTimeSheetDataUseCaseResponse> {
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
