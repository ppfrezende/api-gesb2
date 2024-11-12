import {
  BillingOrder,
  InterventionExpense,
  TimeSheetData,
} from '@prisma/client';

export interface InterventionResponseData {
  id: string;
  progressive: string;
  intervention_number: string;
  customer_po_number: string;
  job_number: string;
  isMonthly: boolean;
  initial_at: string;
  finished_at: string;
  created_at: string;
  technicianId: string;
  siteId: string;
  userName: string;
  customerId: string;
  customerProjectManagerId: string;
  billinOrderId: string;
  Site: Site;
  Technician: Technician;
  Customer: Customer;
  CustomerProjectManager: ProjectManager;
  BillingOrder: BillingOrder;
  timesheets: TimeSheetData[];
  interventionExpenses: InterventionExpense[];
}
