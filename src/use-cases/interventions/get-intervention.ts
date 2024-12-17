import { InterventionsRepository } from '@/repositories/interventions-repository';
import {
  BillingOrder,
  Customer,
  CustomerProjectManager,
  Intervention,
  InterventionExpense,
  Site,
  Technician,
  TimeSheetDay,
} from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface GetInterventionUseCaseRequest {
  interventionId: string;
}

interface GetInterventionUseCaseResponse {
  intervention: Intervention & {
    Site?: Site;
    BillingOrder?: BillingOrder;
    Customer?: Customer;
    CustomerProjectManager?: CustomerProjectManager;
    Technician?: Technician;
    interventionExpenses?: InterventionExpense[];
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
  };
}

export class GetInterventionUseCase {
  constructor(private interventionsRepository: InterventionsRepository) {}

  async execute({
    interventionId,
  }: GetInterventionUseCaseRequest): Promise<GetInterventionUseCaseResponse> {
    const intervention = await this.interventionsRepository.findById(
      interventionId,
    );

    if (!intervention) {
      throw new ResourceNotFoundError();
    }

    return {
      intervention,
    };
  }
}
