import { BillingOrder, InterventionExpense } from '@prisma/client';

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
  timesheets?: {
    id: string;
    first_date: Date | null;
    second_date: Date | null;
    intervention_number: string | null;
    isInternational: boolean | null;
    created_at: Date;
    userId: string | null;
    technicianId: string | null;
    interventionId: string | null;
    customerId: string | null;
    siteId: string | null;
    updated_at: Date;
    isDeleted: boolean;
    deleted_at: Date | null;
    deletedBy: string | null;
    timesheetdays: TimeSheetDay[];
  }[];
  interventionExpenses: InterventionExpense[];
}
