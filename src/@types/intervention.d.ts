interface Site {
  id: string;
  description: string;
  isOffshore: boolean;
  created_at: string;
  userName: string;
}

interface Technician {
  id: string;
  name: string;
  email: string;
  job_title: string;
  registration_number: string;
  created_at: string;
  userName: string;
}

interface Customer {
  id: string;
  name: string;
  created_at: string;
  userName: string;
  project_managers: ProjectManager[];
}

interface ProjectManager {
  id: string;
  name: string;
  created_at: string;
  customerId: string;
}

interface PurchaseOrder {
  id: string;
  name: string;
  description: string;
  factor_HE_onshore: number;
  factor_HE_offshore: number;
  factor_HN_onshore: number;
  factor_HN_offshore: number;
  factor_holiday_onshore: number;
  factor_holiday_offshore: number;
  factor_night_onshore: number;
  factor_night_offshore: number;
  factor_over_xd: number;
  time_onshore: string;
  time_offshore: string;
  time_travel: string;
  isMonthly: boolean;
  whatsCalendar: string;
  currency: string;
  adictional: number;
  created_at: string;
  userName: string;
  skills: Skill[];
}

interface Skill {
  id: string;
  skill_description: string;
  travel_hour: number;
  normal_hour: number;
  created_at: string;
  id_PO: string;
}

interface TimesheetDay {
  id: string;
  day: string;
  departure: number;
  arrival: number;
  rangeAfrom: number;
  rangeAto: number;
  rangeBfrom: number;
  rangeBto: number;
  rangeCfrom: number;
  rangeCto: number;
  rangeDfrom: number;
  rangeDto: number;
  isOffshore: boolean;
}

interface Timesheet {
  id: string;
  first_date: string;
  second_date: string;
  departure_date: string | null;
  arrival_date: string | null;
  traveled_hours: number;
  normal_hours_range_A: number;
  normal_hours_range_B: number;
  extra_hours_range_C: number;
  extra_hours_range_D: number;
  intervention_description: string;
  site: string;
  isInternational: boolean;
  created_at: string;
  userName: string;
  technicianId: string;
  interventionId: string;
  timesheetdays: TimesheetDay[];
}

interface Expense {
  id: string;
  expense_date: string;
  expense_type: string;
  description: string;
  currency: string;
  currency_quote: number;
  expense_value: number;
  total_converted: number;
  created_at: string;
  interventionId: string;
  technicianId: string;
  userName: string;
}

export interface InterventionResponseData {
  id: string;
  progressive: string;
  intervention_number: string;
  po_number: string;
  job_number: string;
  isOffshore: boolean;
  initial_at: string;
  finished_at: string;
  created_at: string;
  technicianId: string;
  siteId: string;
  userName: string;
  customerId: string;
  customerProjectManagerId: string;
  purchaseOrderId: string;
  skillId: string;
  Site: Site;
  Technician: Technician;
  Customer: Customer;
  CustomerProjectManager: ProjectManager;
  PurchaseOrder: PurchaseOrder;
  Skill: Skill;
  timesheets: Timesheet[];
  expenses: Expense[];
}
