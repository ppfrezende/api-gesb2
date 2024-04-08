import { TimeSheetDaysRepository } from '@/repositories/timesheets-day-repository';

type TimeSheetDayData = {
  day: Date;
  departure?: number;
  arrival?: number;
  rangeAfrom?: number;
  rangeAto?: number;
  rangeBfrom?: number;
  rangeBto?: number;
  rangeCfrom?: number;
  rangeCto?: number;
  rangeDfrom?: number;
  rangeDto?: number;
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
