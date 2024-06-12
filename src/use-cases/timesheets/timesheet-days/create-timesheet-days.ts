import { TimeSheetDaysRepository } from '@/repositories/timesheets-day-repository';

type TimeSheetDayData = {
  day: Date;
  departure?: number | null;
  arrival?: number | null;
  rangeAfrom?: number | null;
  rangeAto?: number | null;
  rangeBfrom?: number | null;
  rangeBto?: number | null;
  rangeCfrom?: number | null;
  rangeCto?: number | null;
  rangeDfrom?: number | null;
  rangeDto?: number | null;
  isOffshore?: boolean;
  technicianId: string;
  timeSheetDataId: string;
};

export class CreateTimeSheetDaysUseCase {
  constructor(private timesheetdaysRepository: TimeSheetDaysRepository) {}

  async execute(data: TimeSheetDayData[]): Promise<void> {
    await this.timesheetdaysRepository.createMany(data);

    return;
  }
}
