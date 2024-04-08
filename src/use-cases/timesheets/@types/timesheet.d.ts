export type TimeSheetDay = {
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
  technicianId?: string;
  TimeSheetData?: TimeSheetData;
  timeSheetDataId?: string;
  userName: string;
};

export type TimeSheetData = {
  departure_date?: Date;
  arrival_date?: Date;
  traveled_hours?: number;
  normal_hours_range_A?: number;
  normal_hours_range_B?: number;
  extra_hours_range_C?: number;
  extra_hours_range_D?: number;
  technicianId?: string;
  intervention_description?: string;
  site?: string;
  isInternational?: boolean;
  timesheetdays?: TimeSheetDay[];
  userName: string;
  created_at: Date;
};
